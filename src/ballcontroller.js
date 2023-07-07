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
        this.predict = [];
        this.beams = [];
        this.container = new Container();
        this.addChild(this.container);
        
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

                this.removeChild(this.container);
                delete this.container;
                delete this.predict;
                delete this.beams;

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
                        this.needle.rotation = alpha;
                        // this.echo.rotation = alpha;
                        
    
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
                            this.removeChild(this.container);
                            delete this.container;
                            delete this.predict;
                            delete this.beams;
    
                            this.container = new Container();
                            this.addChild(this.container);
                            this.predict = [];
                            this.beams = [];
    
                            var pre = {hypo : 0, x: this.groundPositionX, y : this.groundPositionY, alpha : alpha};
                            this.predict.push(pre);
                            this.deflect(this.groundPositionX, this.groundPositionY, alpha);  
                            for( var i = 0; i < this.predict.length -1; i++){
                                this.beams[i] = Sprite.from("assets/images/square.png");
                                this.beams[i].anchor.set(GameConstants.echoAnchor.x, 1);
                                this.beams[i].x = this.predict[i].x;
                                this.beams[i].y = this.predict[i].y;
                                this.beams[i].rotation = this.predict[i].alpha
                                this.beams[i].width = GameConstants.squareEdge*0.05;
                                this.beams[i].height = this.predict[i+1].hypo;
                                this.container.addChild( this.beams[i]);
                            }
                            this.addChild(this.needle);
                            this.ready = true;
                            //console.log("ready");
                        }
                        if( y > -GameConstants.echoMinNumerator ) {
                            this.removeChild(this.container);
                            delete this.container;
                            delete this.predict;
                            delete this.beams;
                            this.removeChild(this.needle);
                            this.ready = false;
                            //console.log("not ready");
                        }
                    } 
                }                 
            }
        }
    }
    deflect(x0, y0, alpha0){  

        var hypo = 0;
        var x1 = 0;
        var y1 = 0; 
        var alpha1 = 0; 

        var lb = ballRadius;
        var rb = GameConstants.screenWidth - ballRadius;
        var tb = GameConstants.defaultTopBall;
        var bb = GameConstants.defaultBottomBall;

        var l = x0 - lb;
        var r = rb - x0;
        var t = y0 - tb;
        var b = bb - y0;

        var b1 = - Math.atan(l/t);
        var b2 = -pi + Math.atan(l/b);
        var g1 = Math.atan(r/t);
        var g2 = pi - Math.atan(r/b);

        if(b1 < alpha0 && alpha0 < g1){
            hypo = t/Math.cos(alpha0);
            x1 = x0 + hypo*Math.sin(alpha0);
            y1 = tb;
            alpha1 = alpha0 < 0 ? -pi - alpha0 : pi - alpha0;
        }
        if(b1 > alpha0 && alpha0 > b2){
            hypo = l/Math.abs(Math.sin(alpha0));
            x1 = lb;
            y1 = y0 - hypo*Math.cos(alpha0);
            alpha1 = Math.abs(alpha0);
        }
        if(g1 < alpha0 && alpha0 < g2){
            hypo = r/Math.abs(Math.sin(alpha0));
            x1 = rb;
            y1 = y0 - hypo*Math.cos(alpha0);
            alpha1 = -Math.abs(alpha0);
        }
        if(alpha0 < b2 || alpha0 > g2){
            hypo = b/Math.cos(pi - Math.abs(alpha0));
            x1 = x0 + hypo*Math.sin(alpha0);
            y1 = bb;
            alpha1 = alpha0 < 0 ? Math.abs(alpha0) - pi : pi - alpha0;
        }
        var pre = {hypo : hypo, x: x1, y : y1, alpha : alpha1}
        this.predict.push(pre);     
        if(y1 == bb) {
            //console.log("cham day " + this.predict.length);
            return
        }
        this.deflect(x1, y1, alpha1);
    }
}