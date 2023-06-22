import { Sprite, Ticker} from "pixi.js"
import TWEEN from "@tweenjs/tween.js"
import { Ball } from "./ball";
import { Abjust } from "./abjust";
export class PreBall extends Ball{
    constructor(x=Abjust.defaultX, y=Abjust.defaultY){
        super(x, y);       
        this.ring = Sprite.from("assets/images/ring.png");
        this.ring.anchor.set(0.5, 0.5);
        this.ring.scale.set(Abjust.minRingScale);
        this.ring.x = x;
        this.ring.y = y;
        this.addChild(this.ring);  
        this.ringAnimation();
    }
    ringAnimation(){
        let scaleX = this.ring.scale.x;
        var tween = new TWEEN.Tween({ scale: scaleX})
        .to({scale: Abjust.maxRingScale }, Abjust.ringTweenTime)
        .repeat(Infinity)
        .yoyo(true)
        .onUpdate((obj) => {
            this.ring.scale.set(obj.scale);
            this.followBall();
        })
        .start(this._current);
    }
    followBall(){
        this.ring.x = this.ball.x;
        this.ring.y = this.ball.y;
    }
}