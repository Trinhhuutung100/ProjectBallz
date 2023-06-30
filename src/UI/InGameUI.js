import { Container, Text, TextStyle, Texture } from "pixi.js";
import { Sprite } from "pixi.js";
import { gsap } from "gsap";
import { GameConstants } from "../gameconstants";
import { Game } from "../game";
export class InGameUI extends Container{
    constructor(){
        super();
        this.guide();
        this.drawSpeedupButton();
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
            fontFamily: "Arial", 
        }); 
        this.guideText = new Text("Kéo xuống và\ndi sang 2 bên\nđể điều hướng", this.textStyle);
        this.guideText.anchor.set(0.5, 0.5);
        this.guideText.x = GameConstants.screenWidth*0.5;
        this.guideText.y = GameConstants.screenHeight*0.5;
        this.addChild(this.guideText);

    }
    setText(score){       
        this.textStyle = new TextStyle({
            fontSize: GameConstants.fontSize,
            fill: "white",
            fontFamily: "Arial", 
        }); 
        this.removeChild(this.text);
        this.text = new Text(score, this.textStyle);
        this.text.anchor.set(0.5, 0.5);
        this.text.x = GameConstants.screenWidth/2;
        this.text.y = GameConstants.squareEdge;
        this.addChild(this.text);        
    }
}