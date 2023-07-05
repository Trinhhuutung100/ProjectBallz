import { Container, Sprite, Texture} from "pixi.js"
import { GameConstants } from "./gameconstants";
export class Ball extends Container{
    constructor(x, y){
        super();
        var tt = Texture.from("assets/images/ball.png");
        this.ball = new Sprite(tt);
        this.ball.width = GameConstants.ballRadius*2;
        this.ball.height = GameConstants.ballRadius*2;
        this.ball.anchor.set(0.5, 0.5);
        this.ball.x = x;
        this.ball.y = y;
        this.ball.dx = 0;
        this.ball.dy = 0;
        this.readyGo = false;
        this.isBall = true;
        this.addChild(this.ball);
    }

}