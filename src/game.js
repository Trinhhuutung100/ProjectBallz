import { Application } from "pixi.js"
import { ActiveBall } from "./activeball";
import { PreBall } from "./preball";
import { BallController } from "./ballcontroller";
import { Square } from "./square";
import { CollisionHandler } from "./collisionhandler";
import { Abjust } from "./abjust";
import { Coin } from "./coin";

export class Game{
    static init(){
        const app =  new Application({
            width: Abjust.screenWidth,
            height: Abjust.screenHeight,
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
        for(var i = 0; i<1; i++){
            var square = new Square(400, 400, 1000);
            this.squares.push(square);
        }
        this.squares.forEach(square => {
            app.stage.addChildAt(square);
        })
        // //Add coins
        // this.coins = [];
        // for(var i = 0; i<10; i++){
        //     var coin = new Coin(Abjust.edge + 2*i*Abjust.edge, 3*Abjust.edge);
        //     this.coins.push(coin);
        // }
        // this.coins.forEach(coin => {
        //     app.stage.addChild(coin);
        // })
        // //Add preball
        // this.preBalls = [];
        // for(var i = 0; i<10; i++){
        //     var preBall = new PreBall(Abjust.edge + 2*i*Abjust.edge, 5*Abjust.edge);
        //     this.preBalls.push(preBall);
        // }
        // this.preBalls.forEach(preBall => {
        //     app.stage.addChild(preBall);
        // })
        this.ballController = new BallController(this.balls);
        app.stage.addChild(this.ballController);
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