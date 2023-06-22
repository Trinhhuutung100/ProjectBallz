import { Abjust } from "./abjust";
import { Ball } from "./ball";
export class ActiveBall extends Ball{
    constructor(x=Abjust.defaultX, y=Abjust.defaultY){
        super(x,y);
    }

}