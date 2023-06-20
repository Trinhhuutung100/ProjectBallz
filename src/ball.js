import { Container, Sprite} from "pixi.js"
export class Ball extends Container{
    constructor(x, y){
        super();
        this.ball = Sprite.from("assets/images/ball.png");
        this.ball.scale.set(0.2, 0.2);
        this.ball.anchor.set(0.5, 0.5);
        this.ball.x = x;
        this.ball.y = y;
        this.ball.dx = 0;
        this.ball.dy = 0;
        this.readyGo = false;
        this.addChild(this.ball);
    }

}