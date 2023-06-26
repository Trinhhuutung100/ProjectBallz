import { Application } from "pixi.js"
import { ActiveBall } from "./activeball";
import { PreBall } from "./preball";
import { BallController } from "./ballcontroller";
import { Square } from "./square";
import { CollisionHandler } from "./collisionhandler";
import { GameConstants } from "./gameconstants";
import { Coin } from "./coin";
import { GenMap } from "./genmap";

export class Game{
    static init(){
        const app =  new Application({
            width: GameConstants.screenWidth,
            height: GameConstants.screenHeight,
            background: 0x123456
        })
        document.body.appendChild(app.view);
        //Add balls
        this.balls = [];
        for(var i = 0; i<10; i++){
            var ball = new ActiveBall();
            this.balls.push(ball);
        }
        this.balls.forEach(ball => {
            app.stage.addChild(ball);
        })
        this.map = new GenMap();
        app.stage.addChild(this.map);
        this.ballController = new BallController(this.balls);
        app.stage.addChild(this.ballController);
        this.collision = new CollisionHandler(this.balls, this.map.squares, this.map.coins, this.map.preBalls);
        app.ticker.add(Game.update.bind(this));
    }
    static update(dt){
        this.collision.update(dt, this.balls, this.map.squares, this.map.coins, this.map.preBalls);
        this.ballController.update(dt, this.balls);
    }
} 

window.onload = function() {
    Game.init();
}