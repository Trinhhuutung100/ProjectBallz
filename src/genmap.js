import { Container, Ticker } from "pixi.js";
import { GameConstants } from "./gameconstants";
import { Square } from "./square";
import TWEEN, { Tween } from "@tweenjs/tween.js";
import { Coin } from "./coin";
import { PreBall } from "./preball";
import { Row } from "./row";

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
        this.isCreatingMap = false;;  
    }
    update(dt){
        this.pushDown(dt);
        //console.log(this.isCreatingMap);
    }
    createNewLine(){
        var line = new Row(this.line);
        var arr = line.data;
        for(var i = 0; i < arr.length ; i++){
            var positionX = (i+1)*GameConstants.padding + (2*i+1)*GameConstants.squareEdge;
            var positionY = GameConstants.defaultTop + GameConstants.squareEdge;
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
        // for(var i = 0; i<GameConstants.column; i++){
           
            // var square = new Square(positionX, positionY, 40);
            // this.squares.push(square);
            // this.addChildAt(square);
            // if(randomObj >= 50 && randomObj <= 100){
                // var preBall = new PreBall(positionX, positionY);
                // this.preBalls.push(preBall);
                // this.addChildAt(preBall);
                // continue;
            // }
            // if(randomObj >= 0 && randomObj <= 50){
                // var square = new Square(positionX, positionY, this.line);
                // this.squares.push(square);
                // this.addChildAt(square);
                // continue;
            // }
            // if(randomObj >= 61 && randomObj <= 80){
            //     var square = new Square(positionX, positionY, 2*this.line);
            //     this.squares.push(square);
            //     this.addChildAt(square);
            //     continue;
            // }
            // if(randomObj >= 81 && randomObj <= 90){
            //     var coin = new Coin(positionX, positionY);
            //     this.coins.push(coin);
            //     this.addChildAt(coin);
            //     continue;
            // }
            // if( randomObj >= 0 && randomObj <= 20) {
            //     continue;
            // }            
        // }
        this.line++;
        this.count = this.distance;
        //this.pushDown();
    }
    pushDown(dt){
        this.isCreatingMap = false;
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
        // var sy = 0;
        // var dy = GameConstants.padding + 2*GameConstants.squareEdge;
        // var speed =  2;
        // console.log(dy);
        // var tween = new TWEEN.Tween({y: sy})
        // .to({y: dy}, Ticker.shared.deltaMS*dy/(speed/2))
        // .onUpdate((obj) => {
        //     for(var i = 0; i < this.squares.length; i++){
        //         this.squares[i].square.y += obj.y*speed/dy;
        //         this.squares[i].text.y += obj.y*speed/dy;
        //     }
        //     for(var i = 0; i < this.coins.length; i++){
        //         this.coins[i].coin.y += obj.y*speed/dy;
        //     }
        //     for(var i = 0; i < this.preBalls.length; i++){
        //         this.preBalls[i].ball.y += obj.y*speed/dy;
        //         this.preBalls[i].ring.y += obj.y*speed/dy;
        //     }
        //     sy += obj.y*speed/dy;
        //     console.log(sy + " " + obj.y);
        // })
        // .onComplete(() => {
        //     console.log(sy - dy);
        // })
        // .start();
        // var sy = this.y;
        // var dy = sy + GameConstants.padding + 2*GameConstants.squareEdge;
        // console.log(dy);
        // var tween = new TWEEN.Tween({y: sy})
        // .to({y: dy}, 500)
        // .onUpdate((obj) => {
        //     this.y = obj.y
        // })
        // .start();
        // for(var i = 0; i < this.squares.length; i++){
        //     var sy = this.squares[i].y;
        //     var dy = sy + GameConstants.padding + 2*GameConstants.squareEdge;
        //     var square  = this.squares[i];
        //     var tween = new Tween({y: sy})
        //     .to({y: dy}, 500)
        //     .onUpdate((obj) => {
        //         square.square.y = obj.y;
        //         square.text.y = obj.y;
        //     })
        //     .start();
        // }
        
        // for(var i = 0; i < this.squares.length; i++){
        //     this.squares[i].square.y +=GameConstants.padding + 2*GameConstants.squareEdge;
        //     this.squares[i].text.y +=GameConstants.padding + 2*GameConstants.squareEdge;
        // }
        // for(var i = 0; i < this.coins.length; i++){
        //     this.coins[i].coin.y +=GameConstants.padding + 2*GameConstants.squareEdge;
        // }
        // for(var i = 0; i < this.preBalls.length; i++){
        //     this.preBalls[i].ball.y +=GameConstants.padding + 2*GameConstants.squareEdge;
        //     this.preBalls[i].ring.y +=GameConstants.padding + 2*GameConstants.squareEdge;
        // }
    }
}