import { Container, Ticker, copySearchParams } from "pixi.js";
import { GameConstants } from "./gameconstants";
import { Square } from "./square";
import TWEEN, { Tween } from "@tweenjs/tween.js";
import { Coin } from "./coin";
import { PreBall } from "./preball";
import { Row } from "./row";
import { Game } from "./game";
import { ActiveBall } from "./activeball";

export class GenMap extends Container{
    constructor(){
        super();
        this.line = 1;
        this.squares = [];
        this.coins = [];
        this.preBalls = [];    
        this.createNewLine();  
        this.distance = GameConstants.padding + 2*GameConstants.squareEdge;
        this.count = this.distance
        this.isCreatingMap = false;
        this.bottom = 0;
    }
    update(dt){
        this.pushDown(dt);
        //console.log(this.isCreatingMap)
    }
    createNewLine(){
        Game.uiManager.igUI.setText(this.line);
        var line = new Row(this.line);
        var arr = line.data;
        for(var i = 0; i < arr.length ; i++){
            var positionX = (i+1)*GameConstants.padding + (2*i+1)*GameConstants.squareEdge;
            var positionY = GameConstants.defaultTopMap;
            var value = arr[i];
            //console.log(value);
            switch (value) {
                case 0:
                    continue;
                case -1:
                    var preBall = new PreBall(positionX, positionY);
                    this.preBalls.push(preBall);
                    this.addChildAt(preBall);
                    continue;
                case -2:
                    var coin = new Coin(positionX, positionY);
                    this.coins.push(coin);
                    this.addChildAt(coin);
                    continue;
                default:
                    var square = new Square(positionX, positionY, value);
                    this.squares.push(square);
                    this.addChildAt(square);
                    continue;
            }
        }
        this.line++;
        this.count = this.distance;
    }
    pushDown(delta){
        var dt = delta;
        this.bottom = 0;
        this.isCreatingMap = false;
        if(this.squares.length>0){
            if(this.bottom < this.squares[0].getBounds().bottom)
            this.bottom = this.squares[0].getBounds().bottom;
        }
        if(this.coins.length>0){
            if(this.bottom < this.coins[0].getBounds().bottom)
            this.bottom = this.coins[0].getBounds().bottom;
        }
        if(this.preBalls.length>0){
            if(this.bottom < this.preBalls[0].getBounds().bottom)
            this.bottom = this.preBalls[0].getBounds().bottom;
        }
        if(this.count > 0){
            for(var i = 0; i < this.squares.length; i++){
                //console.log(" over here");
                this.squares[i].square.y +=dt;
                this.squares[i].text.y +=dt;
            }
            for(var i = 0; i < this.coins.length; i++){
                this.coins[i].coin.y +=dt;
            }
            for(var i = 0; i < this.preBalls.length; i++){
                this.preBalls[i].ball.y +=dt;
                this.preBalls[i].ring.y +=dt;
            } 
            this.count -=dt;  
            this.isCreatingMap = true;         
        }       
    }
    resetMap(){
        for(var i = 0; i < this.squares.length; i++){
            this.squares[i].destroy();
        }
        if(this.squares.length>0){
            this.squares.splice(0, this.squares.length);
        }

        for(var i = 0; i < this.coins.length; i++){
            this.coins[i].destroy();
        }
        if(this.coins.length>0){
            this.coins.splice(0, this.coins.length);
        }

        for(var i = 0; i < this.preBalls.length; i++){
            this.preBalls[i].destroy();
        } 
        if(this.preBalls.length>0){
            this.preBalls.splice(0, this.preBalls.length);
        }
        for(var i = 0; i < Game.balls.length; i++){
            Game.balls[i].destroy();
        } 
        if(Game.balls.length>0){
            Game.balls.splice(0, Game.balls.length);
        }
        // if(Game.balls.length>1){
        //     for(var i = 1; i < Game.balls.length; i++){
        //         Game.balls[i].destroy();
        //     } 
        //     Game.balls.splice(1, Game.balls.length-1);
        // }
        this.bottom = 0;
        this.line = 1;
        // this.createNewLine();          
        Game.app.stage.removeChild(Game.uiManager.igUI);
        Game.uiManager.igUI.destroy();   
        // Game.app.stage.removeChild(Game.balls[0]);
        Game.isWaiting = true;

    }
}