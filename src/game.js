import { Application, Sprite, Ticker } from "pixi.js"
import { ActiveBall } from "./activeball";
import { PreBall } from "./preball";
import { BallController } from "./ballcontroller";
import { Square } from "./square";
import { CollisionHandler } from "./collisionhandler";
import { GameConstants } from "./gameconstants";
import { Coin } from "./coin";
import { GenMap } from "./genmap";
import TWEEN from "@tweenjs/tween.js";
import { UIManager } from "./UI/UIManager";


export class Game{
    static init(){
        this.app =  new Application({
            width: GameConstants.screenWidth,
            height: GameConstants.screenHeight,
            background: 0x222222
        })
        var padding = (innerWidth - GameConstants.screenWidth)/2;
        document.body.appendChild(this.app.view);
        const viewStyle = this.app.view.style;
        viewStyle.position = "absolute";
        viewStyle.display = "block";
        viewStyle.padding = "0px " + padding + "px";
        this.backYard = Sprite.from("assets/images/square.png");
        this.backYard.tint = 0x000000;
        this.backYard.width = GameConstants.screenWidth;
        this.backYard.height = GameConstants.defaultBottom - GameConstants.defaultTop;
        this.backYard.x = 0.5;
        this.backYard.y = GameConstants.defaultTop;
        this.app.stage.addChild(this.backYard);
        //Add balls
        this.balls = [];
        //day len git
        for(var i = 0; i<10; i++){
            var ball = new ActiveBall();
            this.balls.push(ball);
            //console.log(ball);
        }
        this.balls.forEach(ball => {
            this.app.stage.addChild(ball);
        });
        this.uiManager = new UIManager();
        this.map = new GenMap();
        this.app.stage.addChild(this.map);
        this.ballController = new BallController(this.balls, this.map);
        this.app.stage.addChild(this.ballController);
        this.collision = new CollisionHandler(this.balls, this.map.squares, this.map.coins, this.map.preBalls);
        this.app.ticker.add(Game.update.bind(this));
        
        this._dt = 0;
        this._current = 0;
    }
    static update(dt){    
        if(this.map.bottom>GameConstants.defaultBottom) {
            //console.log("game over");
            return;
        }  
        this._dt = Ticker.shared.deltaMS;
        this._current += this._dt;
        TWEEN.update(this._current);
        this.map.update(dt);
        this.ballController.update(dt);
        this.collision.update(dt);  
    }
} 

window.onload = function() {
    Game.init();
}