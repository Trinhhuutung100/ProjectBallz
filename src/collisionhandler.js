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
            for (var b = 0; b < this.balls.length; b++){
                let ball = this.balls[b];
                let square = this.squares[s].square;
                if(this.squares[s].index == 0) {
                    this.squares[s].destroy();
                    continue;
                }
                if (this.isCollisionBetweenCircleAndSquare(ball.ball, square)) {
                    if (ball.ball.x + ballRadius / 2> square.x + square.width / 2) {
                        ball.dx = -ball.dx;
                    }
                    if (ball.ball.x + ballRadius / 2< square.x - square.width / 2) { 
                        ball.dx = -ball.dx;
                    }

                    if (ball.ball.y + ballRadius / 2 > square.y + square.height / 2) { 
                        ball.dy = -ball.dy;
                    }
                    if (ball.ball.y + ballRadius / 2 < square.y - square.height / 2) { 
                        ball.dy = -ball.dy;
                    }
                }
            }
        }
    }

    isCollisionBetweenCircleAndSquare(circle, square) {
        let distX = Math.abs(circle.x - square.x);
        let distY = Math.abs(circle.y - square.y);
        if (distX > square.width / 2 + ballRadius) {
            return false;
        }
        if (distY > square.height / 2 + ballRadius) {
            return false;
        }

        if (distX <= square.width / 2) {
            return true;
        }
        if (distY <= square.height / 2) {
            return true;
        }

        let dx = distX - square.width / 2;
        let dy = distY - square.height / 2;

        if (dx * dx + dy * dy <= ballRadius * ballRadius) return true;
        return false;
    }
}