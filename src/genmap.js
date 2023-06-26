import { Container, Ticker } from "pixi.js";
import { GameConstants } from "./gameconstants";
import { Square } from "./square";
import TWEEN, { Tween } from "@tweenjs/tween.js";
import { Coin } from "./coin";
import { PreBall } from "./preball";

export class GenMap extends Container{
    constructor(){
        super();
        this.line = 1;
        this.squares = [];
        this.coins = [];
        this.preBalls = [];    
        this.createNewLine();    
    }
    createNewLine(){
        for(var i = 0; i<GameConstants.column; i++){
            var positionX = (i+1)*GameConstants.padding + (2*i+1)*GameConstants.squareEdge;
            var positionY = GameConstants.padding + GameConstants.squareEdge;
            var randomObj = Math.floor(Math.random()*100);
            // var square = new Square(positionX, positionY, 40);
            // this.squares.push(square);
            // this.addChildAt(square);
            if( randomObj >= 0 && randomObj <= 20) {
                continue;
            }
            if(randomObj >= 21 && randomObj <= 60){
                var square = new Square(positionX, positionY, this.line);
                this.squares.push(square);
                this.addChildAt(square);
                continue;
            }
            if(randomObj >= 61 && randomObj <= 80){
                var square = new Square(positionX, positionY, 2*this.line);
                this.squares.push(square);
                this.addChildAt(square);
                continue;
            }
            if(randomObj >= 81 && randomObj <= 90){
                var coin = new Coin(positionX, positionY);
                this.coins.push(coin);
                this.addChildAt(coin);
                continue;
            }
            if(randomObj >= 91 && randomObj <= 100){
                var preBall = new PreBall(positionX, positionY);
                this.preBalls.push(preBall);
                this.addChildAt(preBall);
                continue;
            }
        }
        this.line++;
        this.pushDown();
    }
    pushDown(){
        var sy = 0;
        var dy = GameConstants.padding + 2*GameConstants.squareEdge;
        console.log(dy);
        var tween = new TWEEN.Tween({y: sy})
        .to({y: dy}, Ticker.shared.deltaMS*(GameConstants.padding + 2*GameConstants.squareEdge-1))
        .onUpdate((obj) => {
            for(var i = 0; i < this.squares.length; i++){
                this.squares[i].square.y += obj.y*2/dy;
                this.squares[i].text.y += obj.y*2/dy;
            }
            for(var i = 0; i < this.coins.length; i++){
                this.coins[i].coin.y += obj.y*2/dy;
            }
            for(var i = 0; i < this.preBalls.length; i++){
                this.preBalls[i].ball.y += obj.y*2/dy;
                this.preBalls[i].ring.y += obj.y*2/dy;
            }
            sy += obj.y*2/dy;
            console.log(sy + " " + obj.y);
        })
        .onComplete(() => {
            console.log(sy - dy);
        })
        .start();
        // var sy = 0;
        // var dy = GameConstants.padding + 2*GameConstants.squareEdge;
        // console.log(dy);
        // var tween = new TWEEN.Tween({y: sy})
        // .to({y: dy}, Ticker.shared.deltaMS*(GameConstants.padding + 2*GameConstants.squareEdge-1))
        // .onUpdate((obj) => {
        //     for(var i = 0; i < this.squares.length; i++){
        //         this.squares[i].square.y += obj.y*2/dy;
        //         this.squares[i].text.y += obj.y*2/dy;
        //     }
        //     for(var i = 0; i < this.coins.length; i++){
        //         this.coins[i].coin.y += obj.y*2/dy;
        //     }
        //     for(var i = 0; i < this.preBalls.length; i++){
        //         this.preBalls[i].ball.y += obj.y*2/dy;
        //         this.preBalls[i].ring.y += obj.y*2/dy;
        //     }
        //     sy += obj.y*2/dy;
        //     console.log(sy + " " + obj.y);
        // })
        // .onComplete(() => {
        //     console.log(sy - dy);
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