import { Container, Sprite, Text, TextStyle, Ticker} from "pixi.js"
import { Abjust } from "./abjust";

const edge = Abjust.edge;
export class Square extends Container{
    constructor(x, y, index){
        super();
        this.square = Sprite.from("assets/images/square.png");
        this.square.anchor.set(0.5, 0.5);
        this.square.tint =  0xFF0000;
        this.square.width = 2*edge;
        this.square.height = 2*edge;
        this.square.x = x;
        this.square.y = y;
        this.addChild(this.square);
        this.index = index;
        this.textStyle = new TextStyle({
            fontSize: Abjust.fontSize,
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
        this.removeChild(this.text);
        this.text = new Text(this.index, this.textStyle);
        this.text.anchor.set(0.5, 0.5);
        this.text.x = this.square.x;
        this.text.y = this.square.y;
        this.addChild(this.text);        
    }
}