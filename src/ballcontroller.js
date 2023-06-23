import TWEEN from "@tweenjs/tween.js";
import {Container, Sprite, Ticker } from "pixi.js"
import { GameConstants } from "./gameconstants";

const ballRadius = GameConstants.ballRadius;

export class BallController extends Container{
    constructor(balls){
        super();
        this.balls = balls;
        this.init();
        this.speed = GameConstants.ballSpeed;
        this.mousePress = false;
        this.ready = false;
        this.readyAttack = false;
        this.dx = 0;
        this.dy = 0;
        this.distance = [];
        this._dt = 0;
        this._current = 0;
        for(var i = 0; i< this.balls.length; i++){
            this.distance[i] = 0;
        }
        this.allGround = true;
        this.oldPosition = {x:0, y: 0};
        this.needle = Sprite.from("assets/images/needle.png");
        this.needle.anchor.set(GameConstants.needleAnchor.x, GameConstants.needleAnchor.y);
        this.needle.scale.set(GameConstants.needleScale.x, GameConstants.needleScale.y);
        this.needle.x = GameConstants.defaultX;
        this.needle.y = GameConstants.defaultY;
        this.echo = Sprite.from("assets/images/echo.png");
        this.echo.anchor.set(GameConstants.echoAnchor.x, GameConstants.echoAnchor.y);
        this.echo.x = GameConstants.defaultX;
        this.echo.y = GameConstants.defaultY;
        this.groundPositionX = GameConstants.defaultX;
        this.groundPositionY = GameConstants.defaultY;
        this.firstGroundedBall = false;
        
    }
    // Add listener
    init(){
        window.addEventListener("mousedown", this.mouseHandler.bind(this));
        window.addEventListener("mousemove", this.mouseHandler.bind(this));
        window.addEventListener("mouseup", this.mouseHandler.bind(this));
    }
    update(balls){
        this.balls = balls;
        //console.log(this.balls);
        this._dt = Ticker.shared.deltaMS;
        this._current += this._dt;
        TWEEN.update(this._current);
        this.checkAllGround();
        this.moveBall();
        this.border();
    }
    // move balls and stare
    moveBall(){
        if(this.readyAttack){
            this.ready = false;
            for(var i = 0; i< this.balls.length; i++){
                //console.log(i+" "+this.distance[i]);
                if(this.distance[i]==i*GameConstants.distanceBetweenBalls) this.balls[i].readyGo=true;
                else this.distance[i]++;
                //console.log(i + " readyGo "+this.balls[i].readyGo);
                if(this.balls[i].readyGo){
                    this.balls[i].ball.x +=this.balls[i].dx;
                    this.balls[i].ball.y +=this.balls[i].dy;
                } 
            }
            if(this.allGround){
                //console.log("All ground "+this.allGround);
                for(var i = 0; i < this.balls.length; i++){
                    let ball = this.balls[i];
                    this.distance[i] = 0;
                    ball.readyGo = false;
                    ball.isBall = true;
                    ball.ball.tint = "white";
                    var tween = new TWEEN.Tween({ x: ball.ball.x})
                    .to({x: this.groundPositionX }, GameConstants.ballTweenTime)
                    .onUpdate((obj) => {
                        ball.ball.x = obj.x;
                        this.mousePress = false;
                        this.dx = 0;
                        this.dy = 0;
                        this.removeChild(this.needle, this.echo);
                    });
                    tween.start(this._current);
                }        
                this.needle.x = this.groundPositionX;
                this.needle.y = this.groundPositionY;       
                this.echo.x = this.groundPositionX;
                this.echo.y = this.groundPositionY;       
                this.readyAttack = false;
            }
        }
    }
    //check if all the balls are on ground
    checkAllGround(){
        this.allGround = true;
        for(var i = 0; i< this.balls.length; i++){
            if(this.balls[i].dx != 0 || this.balls[i].dy != 0){
                this.allGround = false;
                break;
            }
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
                //console.log(" Ground position x " + this.balls[i].ball.x);    
                if(!this.firstGroundedBall)  {
                    if(this.balls[i].isBall){
                        this.firstGroundedBall = true;
                        this.groundPositionX = this.balls[i].ball.x;
                    }
                    //console.log("First ball position x " + this.groundPositionX);
                }       
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
                this.firstGroundedBall = false;
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
                    if(Math.abs(y) < GameConstants.echoMaxNumerator && Math.abs(y) > GameConstants.echoMinNumerator)
                    this.echo.scale.set(Math.abs(y)/GameConstants.echoDenominator, Math.abs(y)/GameConstants.echoDenominator);

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
                    if( y < -GameConstants.echoMinNumerator ) {
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