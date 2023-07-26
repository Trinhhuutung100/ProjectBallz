import { Sprite, Texture } from "pixi.js";
import { Game } from "../game";
import { GameConstants } from "../gameconstants/gameconstants";
import { sound } from "@pixi/sound";
import { ShopUI } from "./shopui";

export class MusicButton extends Sprite{
    constructor(x, y){
        super();
        this.tmp = Sprite.from(Texture.from("music"));
        this.tmp.anchor.set(0.5, 0.5);
        this.tmp.width = GameConstants.squareEdge*2
        this.tmp.height = GameConstants.squareEdge*2
        this.tmp.position.set(x, y);
        this.tmp.eventMode = "static";
        this.tmp.on("pointerup",() => {
            sound.play("coinSound");
            Game.music = !Game.music;
            console.log("Music " + Game.music);
            if(Game.music) {
                sound.find("theme" + ShopUI.used).volume = 1;
                this.tmp.tint = 0xffffff;
            } else {
                sound.find("theme" + ShopUI.used).volume = 0;
                this.tmp.tint = 0x444444;
            }
        });
        this.addChild(this.tmp);
    }
    listen(){
        if(Game.music) {
            this.tmp.tint = 0xffffff;
        } else {
            this.tmp.tint = 0x444444;
        }
    }
}