import {Container, Sprite, Ticker } from "pixi.js"

const ballRadius = 10;

export class BallController extends Container{
    constructor(balls){
        super();
        this.balls = balls;
        this.init();
        this.speed = 20;
        this.mousePress = false;
        this.ready = false;
        this.readyAttack = false;
        this.dx = 0;
        this.dy = 0;
        this.distance = [];
        for(var i = 0; i< this.balls.length; i++){
            this.distance[i] = 0;
        }
        this.allGround = true;
        this.oldPosition = {x:0, y: 0};
        this.needle = Sprite.from("assets/images/needle.png");
        this.needle.anchor.set(0.5, 1.5);
        this.needle.scale.set(0.5, 0.5);
        this.needle.x = innerWidth/2;
        this.needle.y = innerHeight-ballRadius;
        this.echo = Sprite.from("assets/images/echo.png");
        this.echo.anchor.set(0.5, 1.2);
        this.echo.scale.set(0.5, 0.6);
        this.echo.x = innerWidth/2;
        this.echo.y = innerHeight-ballRadius;
        Ticker.shared.add(this.update.bind(this));
        
    }
    // Add listener
    init(){
        window.addEventListener("mousedown", this.mouseHandler.bind(this));
        window.addEventListener("mousemove", this.mouseHandler.bind(this));
        window.addEventListener("mouseup", this.mouseHandler.bind(this));
    }
    update(){
        this.checkAllGround();
        this.moveBall();
        this.border();
    }
    // move balls and keep in screen
    moveBall(){
        if(this.readyAttack){
            this.ready = false;
            for(var i = 0; i< this.balls.length; i++){
                //console.log(i+" "+this.distance[i]);
                if(this.distance[i]==i*5) this.balls[i].readyGo=true;
                else this.distance[i]++;
                //console.log(i + " readyGo "+this.balls[i].readyGo);
                if(this.balls[i].readyGo){
                    this.balls[i].ball.x +=this.balls[i].dx;
                    this.balls[i].ball.y +=this.balls[i].dy;
                } 
            }
            if(this.allGround){
                console.log("All ground "+this.allGround);
                for(var i = 0; i< this.balls.length; i++){
                    this.distance[i] = 0;
                    this.balls[i].readyGo = false;
                }        
                this.needle.x = this.balls[0].ball.x;
                this.needle.y = this.balls[0].ball.y;       
                this.echo.x = this.balls[0].ball.x;
                this.echo.y = this.balls[0].ball.y;            
                this.readyAttack = false;
            }
        }
    }
    checkAllGround(){
        for(var i = 0; i< this.balls.length; i++){
            this.allGround = true;
            if(this.balls[i].dx == 0 || this.balls[i].dy == 0){
                continue;
            }
            this.allGround = false;
        }
        
    }
    border(){
        for(var i = 0; i< this.balls.length; i++){            
            //make border
            if(this.balls[i].ball.x > innerWidth - ballRadius ) {
                this.balls[i].ball.x = innerWidth - ballRadius;
                this.balls[i].dx = -this.balls[i].dx;
            };
            if(this.balls[i].ball.x < ballRadius ) {
                this.balls[i].ball.x = ballRadius;
                this.balls[i].dx = -this.balls[i].dx;
            };
            if(this.balls[i].ball.y > innerHeight - ballRadius) {
                this.balls[i].ball.y = innerHeight - ballRadius;
                this.balls[i].dx = 0;
                this.balls[i].dy = 0;              
            }
            if(this.balls[i].ball.y < ballRadius) {
                this.balls[i].ball.y = ballRadius;
                this.balls[i].dy = -this.balls[i].dy;
            }            
        }
    }
    // handle mouse 
    mouseHandler(e){
        // khi nhan chuot
        if(e.type == "mousedown"){
            this.mousePress = true;
            // vi tri tu luc bat dau di chuot
            this.oldPosition.x = e.clientX;
            this.oldPosition.y = e.clientY;
        }
        //khi tha chuot
        if(e.type == "mouseup"){
            if(this.ready){                
                this.balls.forEach(ball => {
                    ball.dx = this.dx; //van toc phuong x cua bong
                    ball.dy = this.dy; // van toc phuong y cua bong
                })
                this.removeChild(this.needle, this.echo);      
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
                    this.needle.rotation = -Math.atan(x/y);
                    this.echo.rotation = -Math.atan(x/y);
                    if(Math.abs(y) < 120 && Math.abs(y) > 20)
                    this.echo.scale.set(Math.abs(y)/150, Math.abs(y)/150);

                    // (dx, dy) la vector song song voi (x, y) nhung co do dai = speed
                    if(x!=0&&y!=0){                        
                        this.dx = this.speed*x/Math.sqrt((x*x+y*y));
                        this.dy = this.speed*y/Math.sqrt((x*x+y*y));
                        //console.log(this.dx + " " + this.dy + " " + (Math.sqrt((this.dx)^2+(this.dy^2))));
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
                    if( y < -20 ) {
                        this.addChild(this.needle, this.echo);
                        this.ready = true;
                        //console.log("ready");
                    }
                    else {
                        this.removeChild(this.needle, this.echo);
                        this.ready = false;
                        //console.log("not ready");
                    }
                } 
            }                 
        }
    }
}