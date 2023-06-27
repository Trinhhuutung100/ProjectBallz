import { Application } from "pixi.js"
import { ActiveBall } from "./activeball";
import { PreBall } from "./preball";
import { BallController } from "./ballcontroller";
import { Ball } from "./ball";

export class Game{
    static init(){
        const app =  new Application({
            width: innerWidth,
            height: innerHeight,
            background: 0x123456
        })
        document.body.appendChild(app.view);
        this.balls = [];
        //day len git
        for(var i = 0; i<10; i++){
            var ball = new ActiveBall();
            this.balls.push(ball);
        }
        this.balls.forEach(ball => {
            app.stage.addChild(ball);
        })
        this.ballController = new BallController(this.balls);
    }
} 

window.onload = function() {
    Game.init();
}