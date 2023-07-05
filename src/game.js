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
import { UIManager } from "./UI/uimanager";
import { GameOverUI } from "./UI/gameoverui";
import { InGameUI } from "./UI/ingameui";
import { StartUI } from "./UI/startui";


export class Game{
    static init(){
        this.app =  new Application({
            width: GameConstants.screenWidth,
            height: GameConstants.screenHeight,
            background: 0x222222
        })
        document.body.appendChild(this.app.view);
        this.isWaiting = true;
        this.isFirst = true;
        this.best = 0;
        this.coinScore = 0;
        this.uiManager = new UIManager();
        
    }
    static play(){
        //Remove start-game ui
        Game.app.stage.removeChild(this.uiManager.stUI);
        this.uiManager.stUI.destroy();
        this.isWaiting = false;
        this.startGame();
        if(this.isFirst) this.ticker();
        this.isFirst = false;
    }
    static rePlay(){
        //Remove start-game ui   
        Game.app.stage.removeChild(this.uiManager.goUI);
        this.uiManager.goUI.destroy(); 
        this.uiManager.igUI = new InGameUI();
        Game.app.stage.addChild(this.uiManager.igUI);
        this.map.createNewLine();
        for(var i = 0; i<1; i++){
            var ball = new ActiveBall();
            this.balls.push(ball);
        }
        this.ballController.echo.x = this.balls[0].ball.x;
        this.ballController.needle.x = this.balls[0].ball.x;
        this.balls.forEach(ball => {
            this.app.stage.addChild(ball);
        });
        this.isWaiting = false;
    }
    static menu(){
        this.app.stage.removeChild(this.backYard);
        this.backYard.destroy();
        Game.app.stage.removeChild(this.ballController);
        this.ballController.destroy();
        Game.app.stage.removeChild(this.uiManager.goUI);
        this.uiManager.goUI.destroy(); 
        this.uiManager.stUI = new StartUI();
        Game.app.stage.addChild(this.uiManager.stUI);

    }
    static startGame(){

        //Back yard
        this.backYard = Sprite.from("assets/images/square.png");
        this.backYard.tint = 0x000000;
        this.backYard.width = GameConstants.screenWidth;
        this.backYard.height = GameConstants.defaultBottom - GameConstants.defaultTop;
        this.backYard.x = 0.5;
        this.backYard.y = GameConstants.defaultTop;
        this.app.stage.addChild(this.backYard);

        //Add balls
        this.balls = [];
        //day len
        for(var i = 0; i<10; i++){
            var ball = new ActiveBall();
            this.balls.push(ball);
        }
        this.balls.forEach(ball => {
            this.app.stage.addChild(ball);
        });

        //Add in-game ui    
        this.uiManager.igUI = new InGameUI();    
        Game.app.stage.addChild(this.uiManager.igUI);

        //Gen map
        this.map = new GenMap();
        this.app.stage.addChild(this.map);

        //Ball controller
        this.ballController = new BallController(this.balls, this.map);
        this.app.stage.addChild(this.ballController);

        //Collision handler
        this.collision = new CollisionHandler(this.balls, this.map.squares, this.map.coins, this.map.preBalls);

    }
    static ticker(){
        this.app.ticker.add(Game.update.bind(this));
        this.app.ticker.add(Game.update.bind(this));
        //Delta time
        this._dt = 0;
        this._current = 0;
    }
    static update(dt){    
        if(this.map.bottom>GameConstants.defaultBottom - GameConstants.ballRadius*3) {
            this.map.resetMap();
            this.uiManager.goUI = new GameOverUI();
            this.app.stage.addChild(this.uiManager.goUI);
            return;
        }  
        if(this.isWaiting) return;
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