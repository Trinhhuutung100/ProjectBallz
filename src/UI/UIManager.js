import { Game } from "../game";
import { InGameUI } from "./InGameUI";
import { GameOverUI } from "./UI_EndGame";
import { StartUI } from "./UI_startGame";

export class UIManager{
    constructor(){
        this.igUI = new InGameUI();
        Game.app.stage.addChild(this.igUI);
        this.goUI = new StartUI();
        Game.app.stage.addChild(this.goUI);
    }
    update(){
    }
}