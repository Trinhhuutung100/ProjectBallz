import { GameConstants } from "./gameconstants";
import { Ball } from "./ball";
export class ActiveBall extends Ball{
    constructor(x=GameConstants.defaultX, y=GameConstants.defaultY + GameConstants.ballRadius){
        super(x,y);
    }

}