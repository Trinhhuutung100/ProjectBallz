import { Container } from "pixi.js";
import { GameConstants } from "./gameconstants";
import { Square } from "./square";
import TWEEN from "@tweenjs/tween.js";
import { Coin } from "./coin";
import { PreBall } from "./preball";

export class GenMap extends Container{
    constructor(){
        super();
        this.line = 1;
        this.squares = [];
        this.coins = [];
        this.preBalls = [];     
        this.creatNewLine();    
    }
    creatNewLine(){
        for(var i = 0; i<GameConstants.column; i++){
            var positionX = (i+1)*GameConstants.padding + (2*i+1)*GameConstants.squareEdge;
            var positionY = GameConstants.padding + GameConstants.squareEdge;
            var randomObj = Math.floor(Math.random()*100);
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
        this.children.forEach(block =>{
            console.log(block.y);
            var y = block.y + GameConstants.padding + 2*GameConstants.squareEdge;
            var tween = new TWEEN.Tween({y: block.y})
            .to({y: y}, 1000)
            .onUpdate((obj) => {
                block.y = obj.y;
            })
            .onComplete(() =>{
                console.log(block.y);
            })
            .start();
        })
    }
}