import { Container, Sprite } from "pixi.js"
import { Abjust } from "./abjust";

export class Coin extends Container{
    constructor(x, y){
        super();
        this.coin = Sprite.from("assets/images/ring.png");
        this.coin.tint = "yellow";
        this.coin.anchor.set(0.5, 0.5);
        this.coin.scale.set(Abjust.coinScale);
        this.coin.x = x;
        this.coin.y = y;
        this.addChild(this.coin);
    }
}