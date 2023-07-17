import { Container, Sprite, Text, TextStyle } from "pixi.js";
import { GameConstants } from "../gameconstants";
import { Game } from "../game";

export class GameOverUI extends Container {
    constructor(score) {
        super();
        this.style = new TextStyle({
            fontFamily: GameConstants.defaultFont,
            fontSize: GameConstants.fontSize*3,
            fill: "white",
            align: "center"
        });
        this.score = score; 
        this.drawReplayButton();
        this.drawMainMenuButton();
        this.drawChartButton();
        this.drawLikeButton();
        this.drawAdsButton();
        this.showScore();
        this.showBest();
    }
    showScore(){
        var tmp = new Text(this.score, this.style);
        tmp.anchor.set(0.5, 0.5);
        tmp.position.set(GameConstants.screenWidth/2, GameConstants.screenHeight*0.2);
        this.addChild(tmp);
    }
    showBest(){
        var tmp = new Text("BEST " + Game.best, {
            fontFamily: GameConstants.defaultFont,
            fontSize: GameConstants.fontSize*2,
            fill: "white",
            align: "center"
        });
        tmp.anchor.set(0.5, 0.5);
        tmp.position.set(GameConstants.screenWidth/2, GameConstants.screenHeight*0.3);
        this.addChild(tmp);
    }
    drawReplayButton(){
        var tmp = Sprite.from("assets/images/replay.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*8
        tmp.height = GameConstants.squareEdge*2
        tmp.position.set(GameConstants.screenWidth*0.5, GameConstants.screenHeight*0.4);
        tmp.eventMode = "static";
        tmp.on("pointerup",() => {
            console.log("Replay");
            Game.rePlay();
        });
        this.addChild(tmp);
    }
    drawMainMenuButton(){
        var tmp = Sprite.from("assets/images/mainmenu.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*8
        tmp.height = GameConstants.squareEdge*2
        tmp.position.set(GameConstants.screenWidth/2, GameConstants.screenHeight*0.52);
        tmp.eventMode = "static";
        tmp.on("pointerup",() => {
            console.log("Mainmenu");
            Game.menu();
        });
        this.addChild(tmp);
    }
    drawChartButton(){
        var tmp = Sprite.from("assets/images/chart.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*2
        tmp.height = GameConstants.squareEdge*2
        tmp.position.set(GameConstants.screenWidth*0.3, GameConstants.screenHeight*0.7);
        this.addChild(tmp);
    }
    drawLikeButton(){
        var tmp = Sprite.from("assets/images/like.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*2.25
        tmp.height = GameConstants.squareEdge*2
        tmp.position.set(GameConstants.screenWidth*0.5, GameConstants.screenHeight*0.7);
        this.addChild(tmp);
    }
    drawAdsButton(){
        var tmp = Sprite.from("assets/images/ads.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*2
        tmp.height = GameConstants.squareEdge*2
        tmp.position.set(GameConstants.screenWidth*0.7, GameConstants.screenHeight*0.7);
        this.addChild(tmp);
    }
}
