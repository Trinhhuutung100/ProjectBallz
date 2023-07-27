import { Container, Sprite, Text, TextStyle, Texture, Ticker} from "pixi.js"
import { GameConstants } from "../gameconstants/gameconstants";
import { Game } from "../game";
import { ShopUI } from "../UI/shopui";
import { sound } from "@pixi/sound";

const edge = GameConstants.squareEdge;
export class Square extends Container{
    constructor(x, y, index){
        super();
        this.squareTexts = []
        var squareText0 = {size: GameConstants.fontSize, fill: "black", stroke: "black", thickness: 0};
        var squareText1 = {size: Math.round(GameConstants.fontSize*0.7), fill: "white", stroke: "black", thickness: Math.round(GameConstants.fontSize*0.2)};
        var squareText2 = {size: Math.round(GameConstants.fontSize*1), fill: "white", stroke: "green", thickness: Math.round(GameConstants.fontSize*0.2)};
        var squareText3 = {size: Math.round(GameConstants.fontSize*0.8), fill: "white", stroke: "black", thickness: Math.round(GameConstants.fontSize*0.2)};
        var squareText4 = {size: Math.round(GameConstants.fontSize*1), fill: "white", stroke: "orange", thickness: Math.round(GameConstants.fontSize*0.3)};
        var squareText5 = {size: Math.round(GameConstants.fontSize*0.7), fill: "red", stroke: "white", thickness: Math.round(GameConstants.fontSize*0.2)};
        var squareText6 = {size: Math.round(GameConstants.fontSize*0.8), fill: "yellow", stroke: "green", thickness: Math.round(GameConstants.fontSize*0.2)};
        var squareText7 = {size: Math.round(GameConstants.fontSize*0.7), fill: "red", stroke: "yellow", thickness: Math.round(GameConstants.fontSize*0.2)};
        var squareText8 = {size: Math.round(GameConstants.fontSize*1), fill: "white", stroke: "blue", thickness: Math.round(GameConstants.fontSize*0.3)};
        var squareText9 = {size: Math.round(GameConstants.fontSize*0.7), fill: "blue", stroke: "yellow", thickness: Math.round(GameConstants.fontSize*0.3)};
        this.squareTexts.push(squareText0, squareText1, squareText2, squareText3, squareText4, squareText5, squareText6, squareText7, squareText8, squareText9);

        this.squareSkin = [];
        var square0 = Sprite.from(Texture.from("square"));
        this.squareSkin.push(square0);
        for (var i = 1; i< 10; i++){
            var square = new Sprite(Texture.from("square"+i));
            this.squareSkin.push(square);
        }
        this.square = this.squareSkin[0];
        this.color = this.changeColor(index);
        this.square.tint = this.color;
        this.square.anchor.set(0.5, 0.5);
        this.square.width = 2*edge;
        this.square.height = 2*edge;
        this.square.x = x;
        this.square.y = y;
        this.addChild(this.square);
        this.index = index;
        this.isFirst = true;
        this.textStyle = new TextStyle({
            fontSize: GameConstants.fontSize,
            fill: "black",
            fontFamily: GameConstants.defaultFont, 
        })        
        this.setText();     
    }    
    init(squareText){
        this.square.anchor.set(0.5, 0.5);
        this.square.width = 2*edge;
        this.square.height = 2*edge;
        this.addChild(this.square);
        this.text.style.fill = squareText.fill;
        this.text.style.stroke = squareText.stroke;
        this.text.style.strokeThickness = squareText.thickness;
        this.text.style.fontSize = squareText.size;
        this.addChild(this.text);
    }
    decreaseIndex(s){
        // console.log(s);
        if(this.index > 0)this.index--;
        // if(ShopUI.used == 7)this.index--;
        if(this.index <= 0 ) {
            Game.collision.emitSquareParticale(this);
            Game.map.squarePool.push(this);
            this.parent.removeChild(this);
            Game.collision.squares.splice(s, 1);
            if( ShopUI.used == 7) {
                sound.play("Siu", {
                    volume: 4
                });
                return;
            }
        }
        this.color = this.changeColor(this.index);
        this.setText();
    }
    setText(){
        this.square.tint = this.color;
        if(this.isFirst){
            this.text = new Text(this.index, this.textStyle);
            this.text.anchor.set(0.5, 0.5);
            this.text.x = this.square.x;
            this.text.y = this.square.y;
            this.addChild(this.text);   
            this.isFirst = false;
        }    
        else {
            this.text.text = this.index;
            this.text.x = this.square.x;
            this.text.y = this.square.y;
        }   
    }
    changeColor(score){// hàm đổi màu theo điểm
        var baseColor = 0xfff;
        var newColor = baseColor - score * 0xf;
        var hex = "#" + newColor.toString(16);
        return hex;
    }
}