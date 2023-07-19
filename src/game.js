import { Application, Assets, Sprite, Ticker } from "pixi.js"
import { ActiveBall } from "./objects/activeball";
import { PreBall } from "./objects/preball";
import { BallController } from "./controller/ballcontroller";
import { Square } from "./objects/square";
import { CollisionHandler } from "./collision/collisionhandler";
import { GameConstants } from "./gameconstants/gameconstants";
import { Coin } from "./objects/coin";
import { GenMap } from "./genmap/genmap";
import TWEEN from "@tweenjs/tween.js";
import { UIManager } from "./scene/uimanager";
import { GameOverUI } from "./UI/gameoverui";
import { InGameUI } from "./UI/ingameui";
import { StartUI } from "./UI/startui";
import { manifest } from "./manifest/manifest";
import { ContainerSpawner } from "./containerSpawners/containerSpawner";


export class Game{
    static init(){
        this.app =  new Application({
            width: GameConstants.screenWidth,
            height: GameConstants.screenHeight,
            background: 0x111111
        })
        document.body.appendChild(this.app.view);
        this.isWaiting = true;
        this.isFirst = true;
        this.best = 0;
        this.coinScore = 0;
        this.music = true;
        this.loadGame().then(() => {
            this.createPool().then(() => {
                this.uiManager = new UIManager();
                this.app.stage.addChild(this.uiManager.stUI);
            })
        })
        console.log("Start");        
    } 
    static async createPool(){
        await this.pool();
    }
    static pool(){
        this.ballPool = [];
            for(var i = 0; i < 200; i++){
                var ball = new ActiveBall();
                this.ballPool.push(ball);
            }this.preBallPool = [];        
            for(var i = 0; i < 56; i++){
                var preBall = new PreBall();
                this.preBallPool.push(preBall);
            }
            this.coinPool = [];        
            for(var i = 0; i < 56; i++){
                var coin = new Coin();
                this.coinPool.push(coin);
            }
            this.squarePool = [];        
            for(var i = 0; i < 56; i++){
                var square = new Square(0, 0, 1);
                this.squarePool.push(square);
            } 
    }
    static async loadGame(){
        await Assets.init({manifest: manifest});
        const bundleIDs = manifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundleIDs);
        console.log(Assets.cache);
    }
    static play(){
        this.app.stage.removeChild(this.uiManager.stUI);
        this.isWaiting = false;
        this.startGame();
        if(this.isFirst) this.ticker();
        this.isFirst = false;
    }
    static rePlay(){ 
        this.app.stage.removeChild(this.uiManager.goUI);
        this.app.stage.removeChild(this.ballController);
        this.isWaiting = false;        
        this.startGame();
    }
    static reStart(){
        this.app.stage.removeChild(this.uiManager.psUI);
        this.app.stage.removeChild(this.ballController);
        this.map.resetMap();
        this.isWaiting = false;
        this.startGame();
        
    }
    static menu(){
        this.app.stage.removeChild(this.ballController);
        this.app.stage.removeChild(this.uiManager.goUI);
        this.app.stage.addChild(this.uiManager.stUI);

    }
    static startGame(){  
        this.app.stage.addChild(this.uiManager.igUI);        
        //Add balls
        this.balls = [];
        for(var i = 0; i<1; i++){
            var ball = this.ballPool.pop();
            this.balls.push(ball);
        }
        this.balls.forEach(ball => {
            this.app.stage.addChild(ball);
        });
        if (this.isFirst) {
            this.map = new GenMap();
            this.app.stage.addChild(this.map);
        }else{
            this.map.createNewLine();
            this.app.stage.addChild(this.map);
        }
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
        this.uiManager.update();
        if(this.isWaiting) return;
        if(this.map.bottom>GameConstants.defaultBottom - GameConstants.ballRadius*3) {
            console.log("Lose");
            var score = this.map.line - 1;
            this.app.stage.addChild(this.uiManager.goUI);
            this.uiManager.goUI.showScore(score);
            this.uiManager.goUI.showBest();
            this.map.resetMap();
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