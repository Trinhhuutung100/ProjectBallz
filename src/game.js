import { Application } from "pixi.js"
import { ActiveBall } from "./activeball";
import { PreBall } from "./preball";
import { BallController } from "./ballcontroller";
import { Square } from "./square";
import { CollisionHandler } from "./collisionhandler";
const edge = innerWidth/20;

export class Game{
    static init(){
        const app =  new Application({
            width: innerWidth,
            height: innerHeight,
            background: 0x123456
        })
        document.body.appendChild(app.view);
        this.balls = [];
        for(var i = 0; i<10; i++){
            var ball = new ActiveBall();
            this.balls.push(ball);
        }
        this.balls.forEach(ball => {
            app.stage.addChild(ball);
        })
        this.ballController = new BallController(this.balls);
        app.stage.addChild(this.ballController);
        this.squares = [];
        for(var i = 0; i<1; i++){
            var square = new Square(5*edge, 10*edge, 5);
            this.squares.push(square);
        }
        this.squares.forEach(square => {
            app.stage.addChild(square);
        })
        this.collision = new CollisionHandler(this.balls, this.squares);
    }
} 

window.onload = function() {
    Game.init();
}