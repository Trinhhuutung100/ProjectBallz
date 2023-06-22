import { Container, Sprite} from "pixi.js"
import { GameConstants } from "./gameconstants";
export class Ball extends Container{
    constructor(x, y){
        super();
        this.ball = Sprite.from("assets/images/ball.png");
        this.ball.width = GameConstants.ballRadius*2;
        this.ball.height = GameConstants.ballRadius*2;
        this.ball.anchor.set(0.5, 0.5);
        this.ball.x = x;
        this.ball.y = y;
        this.ball.dx = 0;
        this.ball.dy = 0;
        this.readyGo = false;
        this.addChild(this.ball);
    }

}