import { Container, Text, TextStyle } from "pixi.js";

export class UI_PauseGame extends Container {
    constructor(game) {
        super();
        this.game=game;
        this.style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 24,
            fill: "white",
            align: "center"
        });
        this.drawReplayButton();
        this.drawMainMenuButton();
        this.drawChartButton();
        this.drawLikeButton();
        this.drawAdsButton();
    }
    drawReplayButton(){
        var tmp = Sprite.from("assets/images/replay.png");
        tmp.anchor.set(0.5);
        tmp.position.set();
        this.addChild(tmp);
    }
    drawMainMenuButton(){
        var tmp = Sprite.from("assets/images/mainmenu.png");
        tmp.anchor.set(0.5);
        tmp.position.set();
        this.addChild(tmp);
    }
    drawChartButton(){
        var tmp = Sprite.from("assets/images/chart.png");
        tmp.anchor.set(0.5);
        tmp.position.set();
        this.addChild(tmp);
    }
    drawLikeButton(){
        var tmp = Sprite.from("assets/images/like.png");
        tmp.anchor.set(0.5);
        tmp.position.set();
        this.addChild(tmp);
    }
    drawAdsButton(){
        var tmp = Sprite.from("assets/images/ads.png");
        tmp.anchor.set(0.5);
        tmp.position.set();
        this.addChild(tmp);
    }
}
