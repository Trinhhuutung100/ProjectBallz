import { Application, Sprite } from "pixi.js"
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
            background: 0x222222
        })
        var padding = (innerWidth - GameConstants.screenWidth)/2;
        document.body.appendChild(app.view);
        const viewStyle = app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px " + padding + "px";
        var backYard = Sprite.from("assets/images/square.png");
        backYard.tint = 0x000000;
        backYard.width = GameConstants.screenWidth;
        backYard.height = GameConstants.defaultY - GameConstants.defaultTop;
        backYard.x = 0.5;
        backYard.y = GameConstants.defaultTop;
        app.stage.addChild(backYard);
        //Add balls
        this.balls = [];
        //day len git
        for(var i = 0; i<10; i++){
            var ball = new ActiveBall();
            this.balls.push(ball);
        }
        this.balls.forEach(ball => {
            app.stage.addChild(ball);
        });
        this.map = new GenMap();
        app.stage.addChild(this.map);
        this.ballController = new BallController(this.balls, this.map);
        app.stage.addChild(this.ballController);
        this.collision = new CollisionHandler(this.balls, this.map.squares, this.map.coins, this.map.preBalls);
        app.ticker.add(Game.update.bind(this));
    }
    static update(dt){
        this.map.update(dt);
        this.collision.update(dt, this.balls, this.map.squares, this.map.coins, this.map.preBalls);
        this.ballController.update(dt, this.balls, this.map);
    }
} 

window.onload = function() {
    Game.init();
}