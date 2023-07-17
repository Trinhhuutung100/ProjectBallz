import { Container, Sprite, Texture} from "pixi.js"
import { GameConstants } from "../gameconstants/gameconstants";
export class Ball extends Container{
    constructor(x, y){
        super();
        // var tt = Texture.from("assets/images/ball.png");
        this.ball = new Sprite(Texture.from("ball"));
        this.ball.width = GameConstants.ballRadius*2;
        this.ball.height = GameConstants.ballRadius*2;
        this.ball.anchor.set(0.5, 0.5);
        this.ball.x = x;
        this.ball.y = y;
        this.dx = 0;
        this.dy = 0;
        this.readyGo = false;
        this.isBall = true;
        this.addChild(this.ball);
    }
    changeColor(color){
        this.ball.tint = color;
    }

}