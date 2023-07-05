import { Game } from "../game";
import { InGameUI } from "./ingameui";
import { GameOverUI } from "./gameoverui";
import { StartUI } from "./startui";

export class UIManager{
    constructor(){
        this.igUI = new InGameUI();
        this.goUI = new GameOverUI();
        this.stUI = new StartUI();
        Game.app.stage.addChild(this.stUI);
    }
    update(){
    }
}