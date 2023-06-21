import { Container, Sprite, Text, TextStyle, Ticker} from "pixi.js"

const edge = innerWidth/20;
export class Square extends Container{
    constructor(x, y, index){
        super();
        this.square = Sprite.from("assets/images/square.png");
        this.square.anchor.set(0.5, 0.5);
        this.square.width = 2*edge;
        this.square.height = 2*edge;
        this.square.x = x;
        this.square.y = y;
        this.addChild(this.square);
        this.index = index;
        this.textStyle = new TextStyle({
            fontSize:30,
            fill: "black",
            fontFamily: "Arial", 
        })
        Ticker.shared.add(this.update.bind(this));       
    }
    update(){
        this.setText();
    }
    decreaseIndex(){
        if(this.index > 0) this.index--;
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