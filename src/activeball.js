import { Abjust } from "./abjust";
import { Ball } from "./ball";
const ballRadius = Abjust.ballRadius;
export class ActiveBall extends Ball{
    constructor(x=innerWidth/2, y=innerHeight-ballRadius){
        super(x,y);
    }

}