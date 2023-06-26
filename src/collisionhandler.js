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
    }
    update(dt, balls, squares, coins, preBalls){
        this.balls = balls;
        this.squares = squares;
        this.coins = coins;
        this.preBalls = preBalls;
        this.squareCollision();
        this.coinCollision();
        this.preBallCollision(dt);
    }
    squareCollision(){
        for(var b = 0; b< this.balls.length; b++){
            if(this.balls[b].isBall){
                for(var s = 0; s< this.squares.length; s++){
                    var ball = this.balls[b];
                    var square = this.squares[s].square;
                    var ballX = ball.ball.x;
                    var ballY = ball.ball.y;
                    var squareX = square.getBounds().x + edge;
                    var squareY = square.getBounds().y + edge;
                    var distX = ballX + ball.dx - squareX;
                    var distY = ballY + ball.dy - squareY;
                    var leftBottom = {x: square.x - edge, y: square.y + edge};
                    var leftTop = {x: square.x - edge, y: square.y - edge};
                    var rightBottom = {x: square.x + edge, y: square.y + edge};
                    var rightTop = {x: square.x - edge, y: square.y - edge};
    
                    var leftBottomDistance = this.vectorDistance(ball.ball, leftBottom);
                    var leftTopDistance = this.vectorDistance(ball.ball, leftTop);
                    var rightBottomDistance = this.vectorDistance(ball.ball, rightBottom);
                    var rightTopDistance = this.vectorDistance(ball.ball, rightTop);
                    if(this.squares[s].index == 0) {
                        this.squares[s].destroy();
                        continue;
                    }
                    if(leftBottomDistance<ballRadius){
                        console.log(squareY);
                        this.ballSound.play(); 
                        if(ball.dx>0) ball.dx = -ball.dx;
                        if(ball.dy<0) ball.dy = -ball.dy;
                        this.squares[s].decreaseIndex();
                        continue;
                    }
                    if(rightBottomDistance<ballRadius){
                        console.log(squareY);
                        if(ball.dx<0) ball.dx = -ball.dx;
                        if(ball.dy<0) ball.dy = -ball.dy;
                        this.squares[s].decreaseIndex(); 
                        continue;
                    }
                    if(leftTopDistance<ballRadius){
                        console.log(squareY);
                        this.ballSound.play();
                        if(ball.dx>0) ball.dx = -ball.dx;
                        if(ball.dy>0) ball.dy = -ball.dy;
                        this.squares[s].decreaseIndex(); 
                        continue;
                    }
                    if(rightTopDistance<ballRadius){
                        console.log(squareY);
                        this.ballSound.play();
                        if(ball.dx<0) ball.dx = -ball.dx;
                        if(ball.dy>0) ball.dy = -ball.dy;
                        this.squares[s].decreaseIndex(); 
                        continue;
                    }
                    if( Math.abs(distX) < ballRadius + edge 
                    && Math.abs(ballY - squareY) < edge) {  
                        console.log(squareY);
                        this.ballSound.play();
                        ball.dx = -ball.dx;   
                        this.squares[s].decreaseIndex();
                        continue;                       
                    }
                    if( Math.abs(distY) < ballRadius + edge 
                    && Math.abs(ballX - squareX) < edge) {   
                        console.log(squareY);    
                        this.ballSound.play();      
                        ball.dy = -ball.dy;  
                        this.squares[s].decreaseIndex();          
                    }
                }
            }
        }
    }
    coinCollision(){
        for(var b = 0; b< this.balls.length; b++){
            if(this.balls[b].isBall){
                for(var c = 0; c< this.coins.length; c++){
                    var ball = this.balls[b].ball;
                    var coin = this.coins[c].coin;
                    if(this.vectorDistance(ball, coin)<ballRadius+coinRadius){
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
                    var preBall = this.preBalls[p].ball;
                    if(this.vectorDistance(ball, preBall)<ballRadius+coinRadius){
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