import { Container, Text, TextStyle, Texture } from "pixi.js";
import { Sprite } from "pixi.js";
import { gsap } from "gsap";
import { GameConstants } from "../gameconstants";
import { Game } from "../game";
import { PauseUI } from "./pauseui";
export class InGameUI extends Container{
    constructor(){
        super();
        this.guide();
        this.drawPauseButton();
        this.drawBestScore();
        this.drawCoinSymbol();
        this.drawCoinScore();
        this.drawSpeedupButton();
    }
    drawPauseButton(){
        var texture = Texture.from("assets/images/pause.png");
        var tmp = Sprite.from(texture);
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*0.75;
        tmp.height = GameConstants.squareEdge*1.25;
        tmp.x = GameConstants.squareEdge;
        tmp.y = GameConstants.squareEdge*1.2;
        tmp.tint = "white";
        tmp.eventMode = "static";
        tmp.on("pointerup",() => {
            console.log("Pause");
            if(!Game.isWaiting){
                Game.uiManager.psUI = new PauseUI();
                Game.app.stage.addChild(Game.uiManager.psUI);
            }
            Game.isWaiting = true;
        });
        this.addChild(tmp);
    }
    drawBestScore(){
        this.textStyle = new TextStyle({
            fontSize: GameConstants.fontSize/2,
            fill: "white",
            fontFamily: GameConstants.defaultFont, 
        }); 
        this.removeChild(this.bestText);
        this.bestText = new Text("B E S T", this.textStyle);
        this.bestText.anchor.set(0, 0.5);
        this.bestText.x = GameConstants.squareEdge*2;
        this.bestText.y = GameConstants.squareEdge/2;
        this.addChild(this.bestText);

        this.textStyle = new TextStyle({
            fontSize: GameConstants.fontSize,
            fill: "white",
            fontFamily: GameConstants.defaultFont, 
        }); 
        this.removeChild(this.bestScore);
        this.bestScore = new Text(Game.best, this.textStyle);
        this.bestScore.anchor.set(0, 0.5);
        this.bestScore.x = GameConstants.squareEdge*2;
        this.bestScore.y = GameConstants.squareEdge*1.5;
        this.addChild(this.bestScore);
    }
    drawCoinSymbol(){
        var tmp = Sprite.from("assets/images/ring.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.coinRadius*2;
        tmp.height = GameConstants.coinRadius*2;
        tmp.x = GameConstants.screenWidth - GameConstants.squareEdge;
        tmp.y = GameConstants.squareEdge*1.5;
        tmp.tint = "yellow";
        this.addChild(tmp);
    }
    drawCoinScore(){
        this.textStyle = new TextStyle({
            fontSize: GameConstants.fontSize,
            fill: "white",
            fontFamily: GameConstants.defaultFont, 
        }); 
        this.removeChild(this.coinText);
        this.coinText = new Text(Game.coinScore, this.textStyle);
        this.coinText.anchor.set(1, 0.5);
        this.coinText.x = GameConstants.screenWidth - GameConstants.squareEdge*2;
        this.coinText.y = GameConstants.squareEdge*1.5;
        this.addChild(this.coinText);
    }
    drawSpeedupButton(){
        var texture = Texture.from("assets/images/lightning.png");
        var tmp = Sprite.from(texture);
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*1.5;
        tmp.height = GameConstants.squareEdge*1.5;
        tmp.x = GameConstants.screenWidth*0.95;
        tmp.y = GameConstants.defaultTop + GameConstants.squareEdge;
        tmp.tint = "red";
        tmp.eventMode = "static";
        tmp.on("pointerup",() => {
            console.log("Speedup");
            Game.balls.forEach(ball => {
                ball.dx = ball.dx*2; //van toc phuong x cua bong
                ball.dy = ball.dy*2; // van toc phuong y cua bong
            })
        });
        this.textStyle = new TextStyle({
            fontSize: GameConstants.fontSize,
            fill: "white",
            fontFamily: GameConstants.defaultFont, 
        }); 
        //console.log(this.textStyle.fontFamily);
        this.speedText = new Text("Speedup", this.textStyle);
        this.speedText.anchor.set(0.5, 0.5);
        this.speedText.x = GameConstants.screenWidth*0.8;
        this.speedText.y = GameConstants.defaultTop + GameConstants.squareEdge;
        this.addChild(this.speedText);
        this.addChild(tmp);
    }
    guide(){
        this.textStyle = new TextStyle({
            fontSize: GameConstants.fontSize,
            fill: "white",
            fontFamily: GameConstants.defaultFont, 
        }); 
        this.guideText = new Text("Kéo xuống và\ndi sang 2 bên\nđể điều hướng", this.textStyle);
        this.guideText.anchor.set(0.5, 0.5);
        this.guideText.x = GameConstants.screenWidth*0.5;
        this.guideText.y = GameConstants.screenHeight*0.5;
        this.addChild(this.guideText);

    }
    setText(score){   
        this.textStyle = new TextStyle({
            fontSize: GameConstants.fontSize*2,
            fill: "white",
            fontFamily: GameConstants.defaultFont, 
        });     
        this.removeChild(this.text);
        this.text = new Text(score, this.textStyle);
        this.text.anchor.set(0.5, 0.5);
        this.text.x = GameConstants.screenWidth/2;
        this.text.y = GameConstants.squareEdge*1.5;
        this.addChild(this.text);        
    }
}