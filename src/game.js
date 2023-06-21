import { Application } from "pixi.js"
import { ActiveBall } from "./activeball";
import { PreBall } from "./preball";
import { BallController } from "./ballcontroller";
import { Square } from "./square";
import { CollisionHandler } from "./collisionhandler";
import { update } from "@tweenjs/tween.js";
import { Abjust } from "./abjust";

export class Game{
    static init(){
        const app =  new Application({
            width: Abjust.screenWidth,
            height: Abjust.screenHeight,
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
            var square = new Square(5*Abjust.edge, 10*Abjust.edge, 5);
            this.squares.push(square);
        }
        this.squares.forEach(square => {
            app.stage.addChildAt(square);
        })
        this.collision = new CollisionHandler(this.balls, this.squares);
        app.ticker.add(Game.update.bind(this));
    }
    static update(){
        this.collision.update();
        this.ballController.update();
    }
} 

window.onload = function() {
    Game.init();
}