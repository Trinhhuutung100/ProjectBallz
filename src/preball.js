import { Sprite, Ticker} from "pixi.js"
import { Ball } from "./ball";
import { Abjust } from "./abjust";
const ballRadius = Abjust.ballRadius;
export class PreBall extends Ball{
    constructor(x=innerWidth/2, y=innerHeight-ballRadius){
        super(x, y);       
        this.ring = Sprite.from("assets/images/ring.png");
        this.ring.anchor.set(0.5, 0.5);
        this.ring.scale.set(0.2, 0.2);
        this.ring.x = x;
        this.ring.y = y;
        this.counter = 0.2;
        this.delta = 0.003;
        this.addChild(this.ring);  
        Ticker.shared.add(this.update.bind(this));
    }
    update(){
        this.followBall();
        this.ringAnimation();
    }
    ringAnimation(){
        this.counter +=this.delta;
        if(this.counter > 0.25 || this.counter < 0.2) this.delta = - this.delta;
        this.ring.scale.set(this.counter, this.counter);
    }
    followBall(){
        this.ring.x = this.ball.x;
        this.ring.y = this.ball.y;
    }
}