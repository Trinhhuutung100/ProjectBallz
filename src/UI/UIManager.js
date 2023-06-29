import { Game } from "../game";
import { InGameUI } from "./InGameUI";

export class UIManager{
    constructor(){
        this.igUI = new InGameUI();
        Game.app.stage.addChild(this.igUI);
    }
    update(){
    }
}