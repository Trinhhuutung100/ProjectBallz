import { Ball } from "./ball";
const ballRadius = 10;
export class ActiveBall extends Ball{
    constructor(x=innerWidth/2, y=innerHeight-ballRadius){
        super(x,y);
    }

}