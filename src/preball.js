import { Sprite, Texture, Ticker} from "pixi.js"
import TWEEN from "@tweenjs/tween.js"
import { Ball } from "./ball";
import { GameConstants } from "./gameconstants";
import { gsap} from "gsap"
import { Game } from "./game";
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";
import *as setting from "../assets/particle/emitter2.json";
export class PreBall extends Ball{
    constructor(x=GameConstants.defaultBallX, y=GameConstants.defaultBottomBall){
        super(x, y);       
        this.ring = Sprite.from("assets/images/ring.png");
        this.ring.anchor.set(0.5, 0.5);
        this.ring.width = GameConstants.minRing;
        this.ring.height = GameConstants.minRing;
        this.ring.x = x;
        this.ring.y = y;
        this.isBall = false;
        this.addChild(this.ring);  
        this.ringDestroy = false;
        this.ringAnimation();
    }
    ringAnimation(){        
        var tween = new TWEEN.Tween({ size: GameConstants.minRing});
            tween.to({size: GameConstants.maxRing }, GameConstants.ringTweenTime*Ticker.shared.deltaMS)
            .repeat(Infinity)
            .yoyo(true)
            .onUpdate((obj) => {
                //console.log("DIO");
                this.ring.width = obj.size;
                this.ring.height = obj.size;
                this.followBall();
                if(this.ringDestroy) {
                    TWEEN.remove(tween);
                    this.ring.destroy();
                }
            })
            .start(Game._current);            
    }
    preBallDestroy(){
      // tạo particle trước khi biến mất
        var tmp = new Container();
        tmp.position.set(edge/2,edge/2); // vị trí của particle ở giữa hình vuông
        this.addChild(tmp);
        let texture = Texture.from("assets/images/ball.png"); // các hạt là hình tròn quả bóng
        var emitter = new Emitter(tmp, upgradeConfig(setting,[texture]));
        emitter.autoUpdate = true;
        emitter.emit = true;// chạy particle
        // đây là phần particle khi preBall được ăn
    }
    followBall(){
        this.ring.x = this.ball.x;
        this.ring.y = this.ball.y;
    }
}