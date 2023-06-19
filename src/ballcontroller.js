import {Ticker } from "pixi.js"

const ballRadius = 10;

export class BallController{
    constructor(balls){
        this.balls = balls;
        this.init();
        this.speed = 10;
        this.mousePress = false;
        this.ready = false;
        this.readyAttack = false;
        this.dx = 0;
        this.dy = 0;
        this.oldPosition = {x:0, y: 0};
        Ticker.shared.add(this.update.bind(this));
        
    }
    // Add listener
    init(){
        window.addEventListener("mousedown", this.mouseHandler.bind(this));
        window.addEventListener("mousemove", this.mouseHandler.bind(this));
        window.addEventListener("mouseup", this.mouseHandler.bind(this));
    }
    update(){
        this.moveBall();
    }
    // move balls and keep in screen
    moveBall(){
        if(this.readyAttack){
            this.ready = false;
            this.balls.forEach(ball => {
                //move
                ball.ball.x +=ball.dx;
                ball.ball.y +=ball.dy;
                //console.log(ball.dx + " " + ball.dy + " " + (Math.sqrt(ball.dx^2+ball.dy^2)));
                //make border
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
    // handle mouse 
    mouseHandler(e){
        // khi nhan chuot
        if(e.type == "mousedown"){
            console.log("mousedown");
            this.mousePress = true;
            this.oldPosition.x = e.clientX;
            this.oldPosition.y = e.clientY;
        }
        //khi tha chuot
        if(e.type == "mouseup"){
            console.log("mouseup");
            if(this.ready){                
                this.balls.forEach(ball => {
                    ball.dx = this.dx; //van toc phuong x cua bong
                    ball.dy = this.dy; // van toc phuong y cua bong
                })
                this.readyAttack = true;
            }
            this.mousePress = false;
        }
        // khi nhan chuot va di chuot
        if(e.type == "mousemove"){
            if(!this.readyAttack){
                if(this.mousePress){
                    // (x,y) la vector keo chuot, dinh huong cho bong
                    var x = this.oldPosition.x - e.clientX;
                    var y = this.oldPosition.y - e.clientY;

                    // (dx, dy) la vector song song voi (x, y) nhung co do dai = speed
                    if(x!=0&&y!=0){                        
                        this.dx = this.speed*x/Math.sqrt((x*x+y*y));
                        this.dy = this.speed*y/Math.sqrt((x*x+y*y));
                        console.log(this.dx + " " + this.dy + " " + (Math.sqrt((this.dx)^2+(this.dy^2))));
                    }
                    if(x==0){
                        this.dx = 0;
                        this.dy = this.speed;
                    }
                    if(y==0){
                        this.dx = this.speed;
                        this.dy = 0;
                    }
                    // di chuot xuong duoi mot doan nhat dinh moi duoc ban
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