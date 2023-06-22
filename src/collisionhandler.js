import { GameConstants } from "./gameconstants";
const ballRadius = GameConstants.ballRadius;
const edge = GameConstants.squareEdge;
const coinRadius = GameConstants.coinRadius;


export class CollisionHandler{
    constructor(balls, squares, coins, preBalls){
        this.balls = balls;
        this.squares = squares;
        this.coins = coins;
        this.preBalls = preBalls;
    }
    update(){
        this.squareCollision();
        this.coinCollision();
        this.preBallCollision();
    }
    squareCollision(){
        for(var s = 0; s< this.squares.length; s++){
            for(var b = 0; b< this.balls.length; b++){
                var ball = this.balls[b];
                var square = this.squares[s].square;
                var ballX = ball.ball.x;
                var ballY = ball.ball.y;
                var squareX = square.x;
                var squareY = square.y;
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
                    if(ball.dx>0) ball.dx = -ball.dx;
                    if(ball.dy<0) ball.dy = -ball.dy;
                    this.squares[s].decreaseIndex(); 
                    continue;
                }
                if(rightBottomDistance<ballRadius){
                    if(ball.dx<0) ball.dx = -ball.dx;
                    if(ball.dy<0) ball.dy = -ball.dy;
                    this.squares[s].decreaseIndex(); 
                    continue;
                }
                if(leftTopDistance<ballRadius){
                    if(ball.dx>0) ball.dx = -ball.dx;
                    if(ball.dy>0) ball.dy = -ball.dy;
                    this.squares[s].decreaseIndex(); 
                    continue;
                }
                if(rightTopDistance<ballRadius){
                    if(ball.dx<0) ball.dx = -ball.dx;
                    if(ball.dy>0) ball.dy = -ball.dy;
                    this.squares[s].decreaseIndex(); 
                    continue;
                }
                if( Math.abs(distX) < ballRadius + edge 
                && Math.abs(ballY - squareY) < edge) {  
                    ball.dx = -ball.dx;   
                    this.squares[s].decreaseIndex(); 
                    // if(ballX > squareX) ball.ball.x = squareX + ballRadius + edge ;
                    // else ball.ball.x = square.x - ballRadius - edge ;
                    continue;                       
                }
                if( Math.abs(distY) < ballRadius + edge 
                && Math.abs(ballX - squareX) < edge) {   
                    ball.dy = -ball.dy;  
                    this.squares[s].decreaseIndex();      
                    // if(ballY > squareY)  ball.ball.y = square.y + ballRadius + edge ;
                    // else ball.ball.y = square.y - ballRadius - edge ;                
                }
            }
        }
    }
    coinCollision(){
        for(var b = 0; b< this.balls.length; b++){
            for(var c = 0; c< this.coins.length; c++){
                var ball = this.balls[b].ball;
                var coin = this.coins[c].coin;
                if(this.vectorDistance(ball, coin)<ballRadius+coinRadius){
                    this.coins[c].destroy();
                }
            }
        }
    }
    preBallCollision(){
        for(var b = 0; b< this.balls.length; b++){
            for(var p = 0; p< this.preBalls.length; p++){
                var ball = this.balls[b].ball;
                var preBall = this.preBalls[p].ball;
                if(this.vectorDistance(ball, preBall)<ballRadius+coinRadius){
                    this.preBalls[p].destroy();
                }
            }
        }
    }
    vectorDistance(objA, objB){
        return Math.sqrt((objA.x- objB.x)*(objA.x- objB.x)+(objA.y- objB.y)*(objA.y- objB.y));
    }
}