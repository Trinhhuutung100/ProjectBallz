import { Container, Sprite, Texture, Ticker} from "pixi.js"
import { GameConstants } from "../gameconstants/gameconstants";
import { Game } from "../game";
import TWEEN from "@tweenjs/tween.js";
import { sound } from "@pixi/sound";

const ballRadius = GameConstants.ballRadius;
const edge = GameConstants.squareEdge;
export class Ball extends Container{
    constructor(x = GameConstants.defaultBallX, y = GameConstants.defaultBottomBall){
        super();
        var ball0 = new Sprite(Texture.from("ball"));
        this.ballSkin = [];
        this.ballSkin.push(ball0);
        for (var i = 1; i< 10; i++){
            var ball = new Sprite(Texture.from("ball"+i));
            this.ballSkin.push(ball);
        }
        this.ball = this.ballSkin[0];
        this.init(x, y);
        this.addChild(this.ball);
    }
    init(x = GameConstants.defaultBallX, y = GameConstants.defaultBottomBall){
        this.ball.width = GameConstants.ballRadius*2;
        this.ball.height = GameConstants.ballRadius*2;
        this.ball.anchor.set(0.5, 0.5);
        this.ball.x = x;
        this.ball.y = y;
        this.dx = 0;
        this.dy = 0;
        this.isMove = false;
        this.distance = 0;
        this.readyGo = false;
        this.isBall = true;
    }
    changeColor(color){
        this.ball.tint = color;
    }
    squareCollision(dt, squares){
        if(this.ball.getBounds().top > Game.map.bottom) return;
        if(this.isBall){
            for(var s = 0; s< squares.length; s++){
                //Ball container
                var bc = this;
                //Get bounds
                var ball = bc.ball.getBounds();
                var square = squares[s].square.getBounds();
                //Position
                var bx = ball.x + ballRadius + bc.dx*dt;
                var by = ball.y + ballRadius + bc.dy*dt;
                if(squares[s].index == 1){
                    bx = ball.x + ballRadius ;
                    by = ball.y + ballRadius ;
                }
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
                //ChangeBallCorlor
                var color = squares[s].color;
                //Corner collision
                if(this.vectorDistance(bp, leftBottom)<ballRadius){
                    Game.collision.playSquareMusic();
                    this.changeColor(color);
                    if(bc.dx>0) bc.dx = -bc.dx;
                    if(bc.dy<0) bc.dy = -bc.dy;
                    squares[s].decreaseIndex(s);
                    continue;
                } 
                //Corner collision
                if(this.vectorDistance(bp, leftTop)<ballRadius){
                    Game.collision.playSquareMusic();
                    this.changeColor(color);
                    if(bc.dx>0) bc.dx = -bc.dx;
                    if(bc.dy>0) bc.dy = -bc.dy;
                    squares[s].decreaseIndex(s);
                    continue;
                } 
                //Corner collision
                if(this.vectorDistance(bp, rightBottom)<ballRadius){
                    Game.collision.playSquareMusic();
                    this.changeColor(color);
                    if(bc.dx<0) bc.dx = -bc.dx;
                    if(bc.dy<0) bc.dy = -bc.dy;
                    squares[s].decreaseIndex(s);
                    continue;
                } 
                //Corner collision
                if(this.vectorDistance(bp, rightTop)<ballRadius){
                    Game.collision.playSquareMusic();
                    this.changeColor(color);
                    if(bc.dx<0) bc.dx = -bc.dx;
                    if(bc.dy>0) bc.dy = -bc.dy;
                    squares[s].decreaseIndex(s);
                    continue;
                }     
                if(dx > dy) {      
                    //Horizontal collision     
                    if( dx < ballRadius + edge && dy < edge ) { 
                        Game.collision.playSquareMusic();
                        this.changeColor(color);
                        bc.dx = -bc.dx;   
                        squares[s].decreaseIndex(s);          
                    }
                } else { 
                    //Vertical collision
                    if( dy < ballRadius + edge && dx < edge) {   
                        Game.collision.playSquareMusic();
                        this.changeColor(color);
                        bc.dy = -bc.dy;  
                        squares[s].decreaseIndex(s); 
                    }
                } 
            } 
        }  
    }
    move(dt, i){
        if(!this.isMove){
            this.isMove = true;
            if(Game.music){
                sound.play("load",() => {
                if(i == Game.balls.length - 1) {
                    sound.play("gunSound", {
                        volume: 10
                    });
                }
                sound.find("load").volume = 20;
            });
        }
        }
        this.squareCollision(dt, Game.map.squares);
        this.ball.x +=this.dx*dt;
        this.ball.y +=this.dy*dt;
    }
    move2(dt){
        if(this.isMove) return;
        this.squareCollision(dt, Game.map.squares);
        var ball = this.ball.getBounds();
        var tweenX = new TWEEN.Tween({x: ball.x})
        .to({x: ball.x - this.dx}, dt)
        .onUpdate((obj) => {
            this.ball.x = obj.x;
        })
        .start(Game._current);
        var tweenY = new TWEEN.Tween({y: ball.y})
        .to({y: ball.y + this.dy}, dt)
        .onUpdate((obj) => {
            this.ball.y = obj.y;
        })
        .onComplete(() => {
            this.isMove = false;
        })
        .start(Game._current);
    }
    setDistance(i, dt){
        this.distance = i*GameConstants.distanceBetweenBalls;
        setTimeout(() => {
            this.readyGo = true;
        }, this.distance);
    }
    vectorDistance(objA, objB){
        return Math.sqrt((objA.x- objB.x)*(objA.x- objB.x)+(objA.y- objB.y)*(objA.y- objB.y));
    }
}