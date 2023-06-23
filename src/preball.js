import { Sprite, Ticker} from "pixi.js"
import TWEEN from "@tweenjs/tween.js"
import { Ball } from "./ball";
import { GameConstants } from "./gameconstants";
export class PreBall extends Ball{
    constructor(x=GameConstants.defaultX, y=GameConstants.defaultY){
        super(x, y);       
        this.ring = Sprite.from("assets/images/ring.png");
        this.ring.anchor.set(0.5, 0.5);
        this.ring.scale.set(GameConstants.minRingScale);
        this.ring.x = x;
        this.ring.y = y;
        this.isBall = false;
        this.addChild(this.ring);  
        this.ringDestroy = false;
        this.ringAnimation();
    }
    ringAnimation(){        
        var tween = new TWEEN.Tween({ scale: this.ring.scale.x});
            tween.to({scale: GameConstants.maxRingScale }, GameConstants.ringTweenTime)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate((obj) => {
                //console.log("DIO");
                this.ring.scale.set(obj.scale);
                this.followBall();
                if(this.ringDestroy) {
                    TWEEN.remove(tween);
                    this.ring.destroy();
                }
            })
            .start();
        
    }
    followBall(){
        this.ring.x = this.ball.x;
        this.ring.y = this.ball.y;
    }
}