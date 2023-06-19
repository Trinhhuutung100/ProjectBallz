import { AnimatedSprite, Application, Container, Graphics, Sprite, Ticker, autoDetectRenderer } from "pixi.js"
const ballRadius = 10;

export class Ball extends Container{
    constructor(x, y){
        super();
        this.ball = Sprite.from("assets/images/ball.png");
        this.ball.anchor.set(0.5, 0.5);
        this.ball.x = x;
        this.ball.y = y;
        this.ball.dx = 0;
        this.ball.dy = 0;
        this.addChild(this.ball);
    }

}
export class ActiveBall extends Ball{
    constructor(x=innerWidth/2, y=innerHeight-ballRadius){
        super(x,y);
    }

}
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
export class BallController{
    constructor(balls){
        this.balls = balls;
        this.init();
        this.speed = 1;
        this.mousePress = false;
        this.ready = false;
        this.readyAttack = false;
        this.dx = 0;
        this.dy = 0;
        this.oldPosition = {x:0, y: 0};
        Ticker.shared.add(this.update.bind(this));
        
    }
    init(){
        window.addEventListener("mousedown", this.mouseHandler.bind(this));
        window.addEventListener("mousemove", this.mouseHandler.bind(this));
        window.addEventListener("mouseup", this.mouseHandler.bind(this));
    }
    update(){
        this.moveBall();
    }
    moveBall(){
        if(this.readyAttack){
            this.ready = false;
            this.balls.forEach(ball => {
                ball.ball.x +=ball.dx;
                ball.ball.y +=ball.dy;
                //console.log(ball.dx + " " + ball.dy + " " + (Math.sqrt(ball.dx^2+ball.dy^2)));
                if(ball.ball.x + ball.dx> innerWidth - ballRadius ) {
                    ball.ball.x = innerWidth - ballRadius;
                    ball.dx = -ball.dx;
                };
                if(ball.ball.x + ball.dx < ballRadius ) {
                    ball.ball.x = ballRadius;
                    ball.dx = -ball.dx;
                };
                if(ball.ball.y + ball.dy > innerHeight - ballRadius) {
                    ball.ball.y = innerHeight - ballRadius;
                    ball.dx = 0;
                    ball.dy = 0;
                    this.readyAttack = false;
                }
                if(ball.ball.y + ball.dy < ballRadius) {
                    ball.ball.y = ballRadius;
                    ball.dy = -ball.dy;
                }
            });
        }
    }
    mouseHandler(e){
        if(e.type == "mousedown"){
            console.log("mousedown");
            this.mousePress = true;
            this.oldPosition.x = e.clientX;
            this.oldPosition.y = e.clientY;
        }
        if(e.type == "mouseup"){
            console.log("mouseup");
            if(this.ready){                
                this.balls.forEach(ball => {
                    ball.dx = this.dx;
                    ball.dy = this.dy;
                })
                this.readyAttack = true;
            }
            this.mousePress = false;
        }
        if(e.type == "mousemove"){
            if(!this.readyAttack){
                if(this.mousePress){
                    var x = this.oldPosition.x - e.clientX;
                    var y = this.oldPosition.y - e.clientY;
                    if(x!=0&&y!=0){                        
                        this.dx = this.speed*x/Math.sqrt((x*x+y*y));
                        this.dy = this.speed*y/Math.sqrt((x*x+y*y));
                        console.log(this.dx + " " + this.dy + " " + (Math.sqrt(this.dx^2+this.dy^2)));
                    }
                    if(x==0){
                        this.dx = 0;
                        this.dy = this.speed;
                    }
                    if(y==0){
                        this.dx = this.speed;
                        this.dy = 0;
                    }
                    if( y < -50 ) {
                        this.ready = true;
                        console.log("ready");
                    }
                    else {
                        this.ready = false;
                        console.log("not ready");
                    }
                } 
            }                 
        }
    }
}
export class Game{
    static init(){
        const app =  new Application({
            width: innerWidth,
            height: innerHeight,
            background: 0x123456
        })
        document.body.appendChild(app.view);
        this.balls = new Array(1).fill(new ActiveBall());
        this.balls.forEach(ball => {
            app.stage.addChild(ball);
        })
        this.ballController = new BallController(this.balls);
    }
} 

window.onload = function() {
    Game.init();
}