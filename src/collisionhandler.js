import { Ticker } from "pixi.js";
import { Abjust } from "./abjust";
const ballRadius = Abjust.ballRadius;
const edge = Abjust.squareEdge;

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
                if(this.squares[s].index == 0) {
                    this.squares[s].destroy();
                    continue;
                }
                var ballThanSquareX = this.balls[b].ball.x > this.squares[s].square.x?true:false;
                var ballThanSquareY = this.balls[b].ball.y > this.squares[s].square.y?true:false;

                var ballX = this.balls[b].ball.x;
                var ballY = this.balls[b].ball.y;
                var squareX = this.squares[s].square.x;
                var squareY = this.squares[s].square.y;         

                var distX = Math.abs(ballX + this.balls[b].dx - squareX);
                var distY = Math.abs(ballY + this.balls[b].dy - squareY);

                if(distX<=edge){
                    if(distY<edge+ballRadius){
                        this.balls[b].dy = - this.balls[b].dy;
                        continue;
                    }
                } 
                if(distY<=edge){
                    if(distX<edge+ballRadius){
                        this.balls[b].dx = - this.balls[b].dx;
                        continue;
                    }
                } 
                if(distX*distX + distY*distY<(ballRadius + edge)*(ballRadius + edge)){
                    this.balls[b].dy = - this.balls[b].dy;
                    this.balls[b].dx = - this.balls[b].dx;
                }                                                            
            }
        }
    }
}