import { Ticker } from "pixi.js";
import { Abjust } from "./abjust";
const ballRadius = Abjust.ballRadius;
const edge = Abjust.edge;

export class CollisionHandler{
    constructor(balls, squares){
        this.balls = balls;
        this.squares = squares;
    }
    update(){
        this.squareCollision();
    }
    squareCollision(){
        for(var s = 0; s< this.squares.length; s++){
            for(var b = 0; b< this.balls.length; b++){
                var ballThanSquareX = this.balls[b].ball.x > this.squares[s].square.x?true:false;
                var ballThanSquareY = this.balls[b].ball.y > this.squares[s].square.y?true:false;
                var ballX = this.balls[b].ball.x;
                var ballY = this.balls[b].ball.y;
                var squareX = this.squares[s].square.x;
                var squareY = this.squares[s].square.y;
                if(this.squares[s].index == 0) {
                    this.squares[s].destroy();
                    continue;
                }
                if( Math.abs(ballX + this.balls[b].dx - squareX) < ballRadius + edge 
                && Math.abs(ballY - squareY) < edge) {  
                    if(ballThanSquareX)  this.balls[b].ball.x = this.squares[s].square.x + ballRadius + edge ;
                    else this.balls[b].ball.x = this.squares[s].square.x - ballRadius - edge ;
                    this.balls[b].dx = -this.balls[b].dx;   
                    this.squares[s].decreaseIndex(); 
                    continue;                       
                }
                if( Math.abs(ballY + this.balls[b].dy - squareY) < ballRadius + edge 
                && Math.abs(ballX - squareX) < edge) {   
                    if(ballThanSquareY)  this.balls[b].ball.y = this.squares[s].square.y + ballRadius + edge ;
                    else this.balls[b].ball.y = this.squares[s].square.y - ballRadius - edge ;
                    this.balls[b].dy = -this.balls[b].dy;  
                    this.squares[s].decreaseIndex();                      
                }
            }
        }
    }
}