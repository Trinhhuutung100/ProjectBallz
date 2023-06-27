import { Container, Sprite, Text, TextStyle, Ticker} from "pixi.js"
import { GameConstants } from "./gameconstants";

const edge = GameConstants.squareEdge;
export class Square extends Container{
    constructor(x, y, index){
        super();
        this.square = Sprite.from("assets/images/square.png");
        this.color = 0xffffff;
        this.square.tint = this.color;
        this.square.anchor.set(0.5, 0.5);
        this.square.width = 2*edge;
        this.square.height = 2*edge;
        this.square.x = x;
        this.square.y = y;
        this.addChild(this.square);
        this.index = index;
        this.textStyle = new TextStyle({
            fontSize: GameConstants.fontSize,
            fill: "black",
            fontFamily: "Arial", 
        })        
        this.setText();     
    }
    decreaseIndex(){
        if(this.index > 0) this.index--;
        this.setText();
    }
    setText(){
        this.color -=0x00000f;
        this.square.tint = this.color;
        this.removeChild(this.text);
        this.text = new Text(this.index, this.textStyle);
        this.text.anchor.set(0.5, 0.5);
        this.text.x = this.square.x;
        this.text.y = this.square.y;
        this.addChild(this.text);        
    }
}