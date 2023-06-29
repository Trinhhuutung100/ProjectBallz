import { Container } from "pixi.js";
import { Sprite } from "pixi.js";
import { gsap } from "gsap";
import { GameScreen } from "./gameScreen";
export class UI_StartGame extends Container{
    constructor(game){
        super();
        this.game=game;
        this.drawBallz();
        this.drawPlayButton();
        this.drawRateButton();
        this.drawMusicButton();
        this.drawChartButton();
        this.drawBalltButton();
        this.drawAdsButton();
        this.game.app.stage.addChild(this);
    }
    drawBallz(){
        var tmp= Sprite.from("assets/images/ballz.png");
        tmp.anchor.set(0.5);
        tmp.position.set(GameScreen.width/2,GameScreen.height/3);
        this.addChild(tmp)
        gsap.to(tmp,{
            y: GameScreen.height/4,
            duration:1,
            yoyo:true,
            repeat:-1,
            repeatDelay:0,
        })
    }
    drawPlayButton(){
        var tmp = Sprite.from("assets/images/play.png");
        tmp.anchor.set(0.5);
        tmp.position.set(GameScreen.width/2,GameScreen.height/2);
        this.addChild(tmp);
    }
    drawRateButton(){
        var tmp = Sprite.from("assets/images/rate.png");
        tmp.anchor.set(0.5);
        tmp.position.set(GameScreen.width/2,GameScreen.height*0.62);
        this.addChild(tmp);
    }
    drawMusicButton(){
        var tmp = Sprite.from("assets/images/music.png");
        tmp.position.set(GameScreen.width/9,GameScreen.height*0.75);
        this.addChild(tmp);
    }
    drawChartButton(){
        var tmp = Sprite.from("assets/images/chart.png");
        tmp.position.set(GameScreen.width/9*3,GameScreen.height*0.75);
        this.addChild(tmp);
    }
    drawBalltButton(){
        var tmp = Sprite.from("assets/images/iconBall.png");
        tmp.position.set(GameScreen.width/9*5,GameScreen.height*0.75);
        this.addChild(tmp);
    }
    drawAdsButton(){
        var tmp = Sprite.from("assets/images/ads.png");
        tmp.position.set(GameScreen.width/9*7,GameScreen.height*0.75);
        this.addChild(tmp);
    }
}