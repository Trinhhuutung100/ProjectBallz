import { Container, Sprite, Text, TextStyle, Ticker} from "pixi.js"
import { GameConstants } from "./gameconstants";

const edge = GameConstants.squareEdge;
export class Square extends Container{
    constructor(x, y, index){
        super();
        this.square = Sprite.from("assets/images/square.png");
        this.color = changeColor(index);
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
        this.color = changeColor(this.index);
        this.setText();
    }
    setText(){
        this.square.tint = this.color;
        this.removeChild(this.text);
        this.text = new Text(this.index, this.textStyle);
        this.text.anchor.set(0.5, 0.5);
        this.text.x = this.square.x;
        this.text.y = this.square.y;
        this.addChild(this.text);        
    }
}
function changeColor(score){// hàm đổi màu theo điểm
    var baseColor = "f29305";
    var tmp = parseInt(baseColor,16);
    tmp+=(score-1)*2048;
    var res= tmp.toString(16);
    return res;
}