import { Container, Texture } from "pixi.js";
import { Sprite } from "pixi.js";
import { gsap } from "gsap";
import { GameConstants } from "../gameconstants";
import { Game } from "../game";
export class StartUI extends Container{
    constructor(){
        super();
        this.drawBallz();
        this.drawPlayButton();
        this.drawRateButton();
        this.drawMusicButton();
        this.drawChartButton();
        this.drawBalltButton();
        this.drawAdsButton();
    }
    drawBallz(){
        var tmp= Sprite.from("assets/images/ballz.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*14
        tmp.height = GameConstants.squareEdge*5
        tmp.position.set(GameConstants.screenWidth*0.5, GameConstants.screenHeight*0.1);
        this.addChild(tmp)
        gsap.to(tmp,{
            y: GameConstants.screenHeight*0.2,
            duration:1,
            yoyo:true,
            repeat:-1,
            repeatDelay:0,
        })
    }
    drawPlayButton(){
        var tmp = Sprite.from("assets/images/play.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*10
        tmp.height = GameConstants.squareEdge*3
        tmp.position.set(GameConstants.screenWidth*0.5, GameConstants.screenHeight*0.4);
        tmp.eventMode = "static";
        tmp.on("pointerdown",() => {
            console.log("Play");
            Game.play();
        });
        this.addChild(tmp);
    }
    drawRateButton(){
        var tmp = Sprite.from("assets/images/rate.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*10
        tmp.height = GameConstants.squareEdge*3
        tmp.position.set(GameConstants.screenWidth*0.5, GameConstants.screenHeight*0.52);
        this.addChild(tmp);
    }
    drawMusicButton(){
        var tmp = Sprite.from("assets/images/music.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*2
        tmp.height = GameConstants.squareEdge*2
        tmp.position.set(GameConstants.screenWidth*0.9, GameConstants.screenHeight*0.95);
        this.addChild(tmp);
    }
    drawChartButton(){
        var tmp = Sprite.from("assets/images/chart.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*4
        tmp.height = GameConstants.squareEdge*4
        tmp.position.set(GameConstants.screenWidth*0.2, GameConstants.screenHeight*0.7);
        this.addChild(tmp);
    }
    drawBalltButton(){
        var tmp = Sprite.from("assets/images/iconBall.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*4
        tmp.height = GameConstants.squareEdge*4
        tmp.position.set(GameConstants.screenWidth*0.5, GameConstants.screenHeight*0.7);
        this.addChild(tmp);
    }
    drawAdsButton(){
        var tmp = Sprite.from("assets/images/ads.png");
        tmp.anchor.set(0.5, 0.5);
        tmp.width = GameConstants.squareEdge*4
        tmp.height = GameConstants.squareEdge*4
        tmp.position.set(GameConstants.screenWidth*0.8, GameConstants.screenHeight*0.7);
        this.addChild(tmp);
    }
}