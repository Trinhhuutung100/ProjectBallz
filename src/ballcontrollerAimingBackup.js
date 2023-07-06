import TWEEN from "@tweenjs/tween.js";
import {Container, Sprite, Ticker } from "pixi.js"
import { GameConstants } from "./gameconstants";
import { Game } from "./game";

const ballRadius = GameConstants.ballRadius;
const pi = Math.PI;

const gd = GameConstants.screenWidth;
const ht = GameConstants.defaultBottom - GameConstants.defaultTop;

export class BallController extends Container{
    constructor(balls, map){
        super();
        this.balls = balls;
        this.map = map;
        this.init();
        this.speed = GameConstants.ballSpeed;
        // console.log(this.speed);
        this.mousePress = false;
        this.ready = false;
        this.readyAttack = false;
        this.dx = 0;
        this.dy = 0;
        this.allGround = true;
        this.oldPosition = {x:0, y: 0};
        this.groundPositionX = GameConstants.defaultBallX;
        this.groundPositionY = GameConstants.defaultBottomBall;
        this.firstGroundedBall = false;
        this.isCreating = false;
        this.distance = [];
        for(var i = 0; i< this.balls.length; i++){
            this.distance[i] = 0;
        }
        this.needle = Sprite.from("assets/images/needle.png");
        this.needle.anchor.set(GameConstants.needleAnchor.x, GameConstants.needleAnchor.y);
        this.needle.width = GameConstants.needleWidth;
        this.needle.height = GameConstants.needleHeight;
        this.needle.x = GameConstants.defaultBallX;
        this.needle.y = GameConstants.defaultBottomBall;
        this.echo = Sprite.from("assets/images/square.png");
        this.echo.anchor.set(GameConstants.echoAnchor.x, 1);
        this.echo.x = GameConstants.defaultBallX;
        this.echo.y = GameConstants.defaultBottomBall;
        console.log(GameConstants.defaultBottom + " " + GameConstants.defaultTop);
        
    }
    // Add listener
    init(){
        window.addEventListener("pointerdown", this.mouseHandler.bind(this));
        window.addEventListener("pointermove", this.mouseHandler.bind(this));
        window.addEventListener("pointerup", this.mouseHandler.bind(this));
    }
    update(dt){
        //console.log(this.balls);\
        this.checkAllGround();
        this.moveBall(dt);
        this.border(dt);
    }
    // move balls and stare
    moveBall(dt){
        if(this.readyAttack){
            this.ready = false;
            for(var i = 0; i< this.balls.length; i++){
                //console.log(i+" "+this.distance[i]);
                if(this.distance[i]>i*GameConstants.distanceBetweenBalls*dt) this.balls[i].readyGo=true;
                else this.distance[i] +=dt;
                //console.log(i + " readyGo "+this.balls[i].readyGo);
                if(this.balls[i].readyGo){
                    this.balls[i].ball.x +=this.balls[i].dx*dt;
                    this.balls[i].ball.y +=this.balls[i].dy*dt;
                } 
            }
            if(this.allGround){
                // this.speed = GameConstants.ballSpeed;
                //console.log("All ground "+this.allGround);
                for(var i = 0; i < this.balls.length; i++){
                    let ball = this.balls[i];
                    this.distance[i] = 0;
                    ball.readyGo = false;
                    ball.isBall = true;
                    var tween = new TWEEN.Tween({ x: ball.ball.x})
                    .to({x: this.groundPositionX }, GameConstants.ballTweenTime*dt)
                    .onUpdate((obj) => {
                        ball.ball.x = obj.x;
                        this.isCreating = true;
                        //this.mousePress = false;
                        // this.dx = 0;
                        // this.dy = 0;
                        //this.removeChild(this.needle, this.echo);
                    })
                    .onComplete(() => {
                        ball.ball.tint = "white";
                        this.isCreating = false;
                        
                    })
                    tween.start(Game._current);
                }   
                if(this.readyAttack){
                    this.map.createNewLine();
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
    border(dt){
        for(var i = 0; i< this.balls.length; i++){            
            //make border
            if(this.balls[i].ball.x + this.balls[i].dx*dt> GameConstants.screenWidth - ballRadius ) {
                this.balls[i].ball.x = GameConstants.screenWidth - ballRadius;
                this.balls[i].dx = -this.balls[i].dx;
            };
            if(this.balls[i].ball.x + this.balls[i].dx*dt < ballRadius ) {
                this.balls[i].ball.x = ballRadius;
                this.balls[i].dx = -this.balls[i].dx;
            };
            if(this.balls[i].ball.y + this.balls[i].dy*dt > GameConstants.defaultBottomBall) {
                this.balls[i].ball.y = GameConstants.defaultBottomBall;
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
            if(this.balls[i].ball.y + this.balls[i].dy*dt < GameConstants.defaultTopBall) {
                this.balls[i].ball.y = GameConstants.defaultTopBall;
                this.balls[i].dy = -this.balls[i].dy;
            }            
        }
    }
    // handle mouse 
    mouseHandler(e){
        if(!Game.isWaiting && !this.map.isCreating)
        // if( !this.map.isCreating)
        {
            // khi nhan chuot
            if(e.type == "pointerdown"){
                this.mousePress = true;
                // vi tri tu luc bat dau di chuot
                this.oldPosition.x = e.clientX;
                this.oldPosition.y = e.clientY;
            }
            //khi tha chuot
            if(e.type == "pointerup"){
                if(this.container != null) {
                    this.container.destroy();
                }
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
            if(e.type == "pointermove"){
                if(!this.readyAttack){
                    if(this.mousePress){
                        // (x,y) la vector keo chuot, dinh huong cho bong
                        var x = this.oldPosition.x - e.clientX;
                        var y = this.oldPosition.y - e.clientY;

                        var alpha = -Math.atan(x/y);
                        var newPoint = this.deflect(this.groundPositionX, this.groundPositionY, alpha);
                        this.needle.rotation = alpha;
                        this.echo.rotation = alpha;
                        this.echo.width = GameConstants.squareEdge*0.05;
                        this.echo.height = newPoint.hypotenuse;
                        
                        if(this.container != null) {
                            this.container.destroy();
                        }
                        this.container = new Container();
                        this.addChild(this.container);

                        this.echo2 = Sprite.from("assets/images/square.png");
                        this.echo2.anchor.set(GameConstants.echoAnchor.x, 1);
                        this.echo2.x = newPoint.x1;
                        this.echo2.y = newPoint.y1;
                        this.echo2.rotation = newPoint.beta;
                        this.echo2.width = GameConstants.squareEdge*0.05;
                        var newPoint2 = this.deflect(newPoint.x1, newPoint.y1, newPoint.beta);
                        this.echo2.height = newPoint2.hypotenuse;
                        // console.log(this.echo2);
                        this.container.addChild(this.echo2);

                        this.echo3 = Sprite.from("assets/images/square.png");
                        this.echo3.anchor.set(GameConstants.echoAnchor.x, 1);
                        this.echo3.x = newPoint2.x1;
                        this.echo3.y = newPoint2.y1;
                        this.echo3.rotation = newPoint2.beta;
                        this.echo3.width = GameConstants.squareEdge*0.05;
                        var newPoint3 = this.deflect(newPoint2.x1, newPoint2.y1, newPoint2.beta);
                        this.echo3.height = newPoint3.hypotenuse;
                        // console.log(this.echo2);
                        this.container.addChild(this.echo3);
    
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
                            if(y < -GameConstants.echoMaxNumerator){
                                Game.uiManager.igUI.removeChild(Game.uiManager.igUI.guideText);
                            }
                            this.addChild(this.needle, this.echo);
                            this.ready = true;
                            //console.log("ready");
                        }
                        if( y > -GameConstants.echoMinNumerator ) {
                            this.removeChild(this.needle, this.echo);
                            this.ready = false;
                            //console.log("not ready");
                        }
                    } 
                }                 
            }
        }
    }
    deflect(x, y, alpha){      
        var beta = -alpha;
        var absAlpha = Math.abs(alpha);
        var h = y - GameConstants.defaultTop - ballRadius;
        var hypotenuse = 0;
        var lg = x - ballRadius;
        var rg = gd - x - ballRadius;
        var lAlpha = Math.atan(lg/h);
        var rAlpha = Math.atan(rg/h);
        var x1 = 0;
        var y1 = 0; 
        if(alpha < 0) {
            if(absAlpha > lAlpha) {
                hypotenuse = lg/Math.sin(absAlpha);
                x1 = GameConstants.ballRadius;
                y1 = GameConstants.defaultBottomBall - hypotenuse*Math.cos(absAlpha);

            }
            else {
                hypotenuse = h/Math.cos(absAlpha); 
                if(alpha < -0.5*pi) {            
                    hypotenuse = h/Math.cos(pi - absAlpha); 
                }
                x1 = lg - hypotenuse*Math.sin(absAlpha) + ballRadius;
                y1 = GameConstants.defaultTopBall;
                beta = - pi + absAlpha;
            }                           
        }
        if(alpha > 0) {
            hypotenuse = rg/Math.sin(absAlpha);
            if(absAlpha > rAlpha) {
                hypotenuse = rg/Math.sin(absAlpha);
                x1 = gd - GameConstants.ballRadius;
                y1 = GameConstants.defaultBottomBall - hypotenuse*Math.cos(absAlpha);
            }
            else {
                hypotenuse = h/Math.cos(absAlpha);  
                //console.log(hypotenuse);
                x1 = lg + hypotenuse*Math.sin(absAlpha) + ballRadius;
                y1 = GameConstants.defaultTopBall;
                beta = pi - absAlpha;
            }
        }  
        if(alpha == 0) {
            hypotenuse = h;
            //console.log(hypotenuse);
            x1 = lg;
            y1 = GameConstants.defaultTopBall;
        }  
        if(alpha/pi > 0.5) {   
            console.log(alpha/pi);           
            hypotenuse = (ht - 2*ballRadius)/Math.cos(pi - absAlpha); 
        } 
        if(alpha/pi < -0.5) {   
            console.log(alpha/pi);           
            hypotenuse = (ht - 2*ballRadius)/Math.cos(pi - absAlpha); 
        } 
        //console.log(x1 + " " + y1 + " " + beta/pi);
        if(this.test){
            this.test = false;

        }
        return {hypotenuse, x1, y1, beta};
        
                        
    }
}