import { Container, Texture } from "pixi.js";
import { ActiveBall } from "./activeball";
import { Game } from "./game";
import { GameConstants } from "./gameconstants";
import { Sound } from "@pixi/sound";
import *as setting from "../assets/particle/emitter.json";
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import *as settingS from "../assets/particle/emitter.json";
import *as settingP from "../assets/particle/emitter2.json";
const ballRadius = GameConstants.ballRadius;
const edge = GameConstants.squareEdge;
const coinRadius = GameConstants.coinRadius;


export class CollisionHandler{
    constructor(balls, squares, coins, preBalls){
        this.balls = balls;
        this.squares = squares;
        this.coins = coins;
        this.preBalls = preBalls;
        this.ballSound = Sound.from("assets/sounds/Ball.wav");
        this.coinSound = Sound.from("assets/sounds/Coin.wav");
    }
    update(dt){
        this.squareCollision(dt);
        this.coinCollision(dt);
        this.preBallCollision(dt);
    }
    squareCollision(dt){
        for(var b = 0; b< this.balls.length; b++){
            if(this.balls[b].isBall){
                for(var s = 0; s< this.squares.length; s++){
                    //Ball container
                    var bc = this.balls[b];
                    //Get bounds
                    var ball = bc.ball.getBounds();
                    var square = this.squares[s].square.getBounds();
                    //Position
                    var bx = ball.x + ballRadius + bc.dx*dt;
                    var by = ball.y + ballRadius + bc.dy*dt;
                    var sx = square.x + edge;
                    var sy = square.y + edge;
                    //Distance
                    var dx = Math.abs(bx - sx);
                    var dy = Math.abs(by - sy);
                    //Corner
                    var leftBottom = {x: square.left, y: square.bottom};
                    var leftTop = {x: square.left, y: square.top};
                    var rightBottom = {x: square.right, y: square.bottom};
                    var rightTop = {x: square.right, y: square.top};
                    var bp = {x: bx, y: by}
                    //Destroy square
                    if(this.squares[s].index == 0) {
                        this.emitSquareParticale(this.squares[s]);
                        this.squares[s].destroy();
                        this.squares.splice(s, 1);
                    }
                    //Corner collision
                    if(this.vectorDistance(bp, leftBottom)<ballRadius){
                        this.ballSound.play(); 
                        if(bc.dx>0) bc.dx = -bc.dx;
                        if(bc.dy<0) bc.dy = -bc.dy;
                        this.squares[s].decreaseIndex();
                        continue;
                    } 
                    //Corner collision
                    if(this.vectorDistance(bp, leftTop)<ballRadius){
                        this.ballSound.play(); 
                        if(bc.dx>0) bc.dx = -bc.dx;
                        if(bc.dy>0) bc.dy = -bc.dy;
                        this.squares[s].decreaseIndex();
                        continue;
                    } 
                    //Corner collision
                    if(this.vectorDistance(bp, rightBottom)<ballRadius){
                        this.ballSound.play(); 
                        if(bc.dx<0) bc.dx = -bc.dx;
                        if(bc.dy<0) bc.dy = -bc.dy;
                        this.squares[s].decreaseIndex();
                        continue;
                    } 
                    //Corner collision
                    if(this.vectorDistance(bp, rightTop)<ballRadius){
                        this.ballSound.play(); 
                        if(bc.dx<0) bc.dx = -bc.dx;
                        if(bc.dy>0) bc.dy = -bc.dy;
                        this.squares[s].decreaseIndex();
                        continue;
                    }     
                    if(dx > dy) {      
                        //Horizontal collision     
                        if( dx < ballRadius + edge && dy < edge ) { 
                            this.ballSound.play();
                            //this.balls[b].ball.x -=bc.dx*dt;
                            bc.dx = -bc.dx;   
                            this.squares[s].decreaseIndex();      
                            //console.log("ngang");        
                        }
                    } else { 
                        //Vertical collision
                        if( dy < ballRadius + edge && dx < edge) {       
                            this.ballSound.play();  
                            //this.balls[b].ball.y -=bc.dy*dt;
                            bc.dy = -bc.dy;  
                            this.squares[s].decreaseIndex(); 
                            //console.log("doc");
                        }
                    } 
                }
            }
        }
    }
    coinCollision(dt){
        for(var b = 0; b< this.balls.length; b++){
            if(this.balls[b].isBall){
                for(var c = 0; c< this.coins.length; c++){
                    var ball = this.balls[b].ball;
                    var ballX = ball.getBounds().x + ballRadius + this.balls[b].dx*dt;
                    var ballY = ball.getBounds().y + ballRadius + this.balls[b].dy*dt;
                    var coin = {x: this.coins[c].coin.getBounds().x + coinRadius, y: this.coins[c].coin.getBounds().y + coinRadius};
                    if(this.vectorDistance({x: ballX, y: ballY}, coin)<ballRadius+coinRadius){
                        this.coins[c].destroy();
                        this.coins.splice(c, 1);
                        this.coinSound.play();
                        Game.coinScore++;
                        Game.uiManager.igUI.drawCoinScore();
                    }
                }
            }
        }
    }
    preBallCollision(dt){
        for(var b = 0; b< this.balls.length; b++){
            if(this.balls[b].isBall){
                for(var p = 0; p< this.preBalls.length; p++){
                    var ball = this.balls[b].ball;
                    var ballX = ball.getBounds().x + ballRadius + this.balls[b].dx*dt;
                    var ballY = ball.getBounds().y + ballRadius + this.balls[b].dy*dt;
                    var preBall = {x: this.preBalls[p].ball.getBounds().x + ballRadius, y: this.preBalls[p].ball.getBounds().y + ballRadius};
                    if(this.vectorDistance({x: ballX, y: ballY}, preBall)<ballRadius+coinRadius){
                        this.emitPreBallParticle(this.preBalls[p]);
                        this.preBalls[p].ringDestroy = true;
                        this.preBalls[p].ball.tint = "green";
                        var preBall = this.preBalls[p];                    
                        this.preBalls.splice(p, 1);
                        this.balls.push(preBall);
                        this.balls[this.balls.length-1].dx = 0; 
                        this.balls[this.balls.length-1].dy = GameConstants.fallSpeed*dt;    
                        this.balls[this.balls.length-1].readyGo = true;                          
                        this.ballSound.play();
                    }
                }
            }
        }
    }
    vectorDistance(objA, objB){
        return Math.sqrt((objA.x- objB.x)*(objA.x- objB.x)+(objA.y- objB.y)*(objA.y- objB.y));
    }
    emitSquareParticale(square){
        // tạo particle trước khi biến mất
        var tmp = new Container();
        tmp.position.set(square.square.x,square.square.y); // vị trí của particle ở giữa hình vuông
        Game.app.stage.addChild(tmp);
        let texture = Texture.from("assets/images/square.png"); // các hạt là hình tròn quả bóng
        var emitter = new Emitter(tmp, upgradeConfig(settingS,[texture]));
        emitter.autoUpdate = true;
        emitter.emit = true;// chạy particle
    }
    emitPreBallParticle(ball){
      // tạo particle trước khi biến mất
        var tmp = new Container();
        tmp.position.set(ball.ball.x,ball.ball.y); // vị trí của particle ở giữa hình vuông
        Game.app.stage.addChild(tmp);
        let texture = Texture.from("assets/images/square.png"); // các hạt là hình tròn quả bóng
        var emitter = new Emitter(tmp, upgradeConfig(settingP,[texture]));
        emitter.autoUpdate = true;
        emitter.emit = true;// chạy particle
    }
}