import { ActiveBall } from "./activeball";
import { Game } from "./game";
import { GameConstants } from "./gameconstants";
import { Sound } from "@pixi/sound";
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
        console.log(edge);
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
                    var ball = this.balls[b];
                    var square = this.squares[s].square.getBounds();
                    var ballX = ball.ball.getBounds().x + ballRadius + ball.dx*dt;
                    var ballY = ball.ball.getBounds().y + ballRadius + ball.dy*dt;
                    var squareX = square.x + edge;
                    var squareY = square.y + edge;
                    var distX = ballX - squareX;
                    var distY = ballY - squareY;
                    var leftBottom = {x: square.left, y: square.bottom};
                    var leftTop = {x: square.left, y: square.top};
                    var rightBottom = {x: square.right, y: square.bottom};
                    var rightTop = {x: square.right, y: square.top};
    
                    var leftBottomDistance = this.vectorDistance({x: ballX, y: ballY}, leftBottom);
                    var leftTopDistance = this.vectorDistance({x: ballX, y: ballY}, leftTop);
                    var rightBottomDistance = this.vectorDistance({x: ballX, y: ballY}, rightBottom);
                    var rightTopDistance = this.vectorDistance({x: ballX, y: ballY}, rightTop);
                    if(this.squares[s].index == 0) {
                        this.squares[s].destroy();
                        continue;
                    }
                    if(leftBottomDistance<ballRadius){
                        this.ballSound.play(); 
                        // this.balls[b].ball.x = leftBottom.x - ballRadius;
                        // this.balls[b].ball.y = leftBottom.y + ballRadius;  
                        if(ball.dx>0) ball.dx = -ball.dx;
                        if(ball.dy<0) ball.dy = -ball.dy;
                        this.squares[s].decreaseIndex();
                        continue;
                    }
                    if(rightBottomDistance<ballRadius){
                        this.ballSound.play(); 
                        // this.balls[b].ball.x = rightBottom.x + ballRadius;
                        // this.balls[b].ball.y = rightBottom.y + ballRadius;  
                        if(ball.dx<0) ball.dx = -ball.dx;
                        if(ball.dy<0) ball.dy = -ball.dy;
                        this.squares[s].decreaseIndex(); 
                        continue;
                    }
                    if(leftTopDistance<ballRadius){
                        this.ballSound.play();
                        // this.balls[b].ball.x = leftTop.x - ballRadius;
                        // this.balls[b].ball.y = leftTop.y - ballRadius;  
                        if(ball.dx>0) ball.dx = -ball.dx;
                        if(ball.dy>0) ball.dy = -ball.dy;
                        this.squares[s].decreaseIndex(); 
                        continue;
                    }
                    if(rightTopDistance<ballRadius){
                        this.ballSound.play();
                        // this.balls[b].ball.x = rightTop.x + ballRadius;
                        // this.balls[b].ball.y = rightTop.y - ballRadius;  
                        if(ball.dx<0) ball.dx = -ball.dx;
                        if(ball.dy>0) ball.dy = -ball.dy;
                        this.squares[s].decreaseIndex(); 
                        continue;
                    }
                    if( Math.abs(distX) < ballRadius + edge 
                    && Math.abs(ballY - squareY) < edge) { 
                        this.ballSound.play();
                        // if(ballX < squareX) {                            
                        //     this.balls[b].ball.x = square.left - ballRadius;
                        // } else this.balls[b].ball.x = square.right + ballRadius;
                        ball.dx = -ball.dx;   
                        this.squares[s].decreaseIndex();
                        continue;                       
                    }
                    if( Math.abs(distY) < ballRadius + edge 
                    && Math.abs(ballX - squareX) < edge) {       
                        this.ballSound.play();      
                        // if(ballY < squareY) {                            
                        //     this.balls[b].ball.y = square.top - ballRadius;
                        // } else this.balls[b].ball.y = square.top + ballRadius;
                        ball.dy = -ball.dy;  
                        this.squares[s].decreaseIndex();          
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
}