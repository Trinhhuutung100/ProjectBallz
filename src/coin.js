import { Container, Sprite, Texture } from "pixi.js"
import { GameConstants } from "./gameconstants";
import { manifest } from "./manifest";

export class Coin extends Container{
    constructor(x, y){
        super();
        var bundle = manifest.bundles.find(bundle => bundle.name === "ring")
        var texture = Texture.from(bundle.assets["ring"]);
        this.coin = Sprite.from(texture);
        this.coin.tint = "yellow";
        this.coin.anchor.set(0.5, 0.5);
        this.coin.width = 2*GameConstants.coinRadius;
        this.coin.height = 2*GameConstants.coinRadius;
        this.coin.x = x;
        this.coin.y = y;
        this.addChild(this.coin);
    }
}