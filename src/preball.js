import { Sprite} from "pixi.js"
import { Ball } from "./ball";
const ballRadius = 10;
export class PreBall extends Ball{
    constructor(x=innerWidth/2, y=innerHeight-ballRadius){
        super(x, y);       
        this.ring = Sprite.from("assets/images/ring.png");
        this.ring.anchor.set(0.5, 0.5);
        this.ring.x = x;
        this.ring.y = y;
        this.addChild(this.ring);        
    }
}