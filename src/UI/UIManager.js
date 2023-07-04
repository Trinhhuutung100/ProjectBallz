import { Game } from "../game";
import { InGameUI } from "./ingameui";
import { GameOverUI } from "./gameoverui";
import { StartUI } from "./startui";
import { PauseUI } from "./pauseui";

export class UIManager{
    constructor(){
        this.stUI = new StartUI();
        this.igUI = new InGameUI();
        this.psUI = new PauseUI();
        this.goUI = new GameOverUI();
        Game.app.stage.addChild(this.stUI);
    }
    update(){
    }
}