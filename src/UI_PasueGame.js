import { Container, Text, TextStyle } from "pixi.js";

export class UI_PauseGame extends Container {
    constructor(game) {
        super();
        this.drawTextPause();
        this.drawContinueButton();
        this.drawRestartButton();
        this.drawMainMenuButton();
        this.drawMusicButton();
        this.drawLikeButton();
        this.drawAdsButton();
    }
    drawTextPause() {
        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 48,
            fill: "white",
            align: "center"
        });
        const text = new Text("PAUSE", style);
        text.anchor.set(0.5);
        text.position.set(Screen.width/2,Screen.height/3);
        this.addChild(text);
    }
    drawContinueButton(){
        var tmp = Sprite.from("assets/images/continue.png");
        tmp.anchor.set(0.5);
        tmp.position.set(GameScreen.width/2,GameScreen.height/2);
        this.addChild(tmp);
    }
    drawRestartButton(){
        var tmp = Sprite.from("assets/images/restart.png");
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
    drawMusicButton(){
        var tmp = Sprite.from("assets/images/music.png");
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
