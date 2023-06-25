import { Application } from "pixi.js"
import { ActiveBall } from "./activeball";
import { PreBall } from "./preball";
import { BallController } from "./ballcontroller";
import { Square } from "./square";
import { CollisionHandler } from "./collisionhandler";
import { GameConstants } from "./gameconstants";
import { Coin } from "./coin";

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
        //Add squares
        this.squares = [];
        for(var i = 0; i<20; i++){
            var square = new Square(GameConstants.edge + 2*i*GameConstants.edge, 5*GameConstants.edge, 10*i+1);
            this.squares.push(square);
        }
        this.squares.forEach(square => {
            app.stage.addChildAt(square);
        })
        //Add coins
        this.coins = [];
        for(var i = 0; i<20; i++){
            var coin = new Coin(GameConstants.edge + 2*i*GameConstants.edge, 3*GameConstants.edge);
            this.coins.push(coin);
        }
        this.coins.forEach(coin => {
            app.stage.addChild(coin);
        })
        //Add preball
        this.preBalls = [];
        for(var i = 0; i<20; i++){
            var preBall = new PreBall(GameConstants.edge + 2*i*GameConstants.edge, GameConstants.edge);
            this.preBalls.push(preBall);
        }
        this.preBalls.forEach(preBall => {
            app.stage.addChild(preBall);
        })
        this.ballController = new BallController(this.balls);
        app.stage.addChild(this.ballController);
        this.collision = new CollisionHandler(this.balls, this.squares, this.coins, this.preBalls);
        app.ticker.add(Game.update.bind(this));
    }
    static update(dt){
        this.collision.update(dt);
        this.ballController.update(dt, this.balls);
    }
} 

window.onload = function() {
    Game.init();
}