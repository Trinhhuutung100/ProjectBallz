import { Container, Sprite, Text, TextStyle } from "pixi.js";
import { GameConstants } from "../gameconstants";
import {EventEmitter} from "events"

export class InGameUI extends EventEmitter{
    constructor(){
        super();
        this.container = new Container();   
        this.createPauseButton();    
    }
    createPauseButton(){
        this.pauseButton = Sprite.from("assets/images/pause.png");
        this.pauseButton.width = GameConstants.squareEdge;
        this.pauseButton.height = GameConstants.squareEdge;
        this.pauseButton.anchor.set(0.5, 0.5);
        this.pauseButton.x = GameConstants.squareEdge;
        this.pauseButton.y = GameConstants.squareEdge;
        //Event        
        this.pauseButton.eventMode = true;
        this.pauseButton.buttonMode = true;
        this.pauseButton.on("pointerdown", () =>{
            this.emit("pause");
        });
        this.container.addChild(this.pauseButton);
    }
    setText(score){       
        this.textStyle = new TextStyle({
            fontSize: GameConstants.fontSize,
            fill: "white",
            fontFamily: "Arial", 
        }); 
        this.container.removeChild(this.text);
        this.text = new Text(score, this.textStyle);
        this.text.anchor.set(0.5, 0.5);
        this.text.x = GameConstants.screenWidth/2;
        this.text.y = GameConstants.squareEdge;
        this.container.addChild(this.text);        
    }
}