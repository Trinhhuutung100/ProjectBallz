import TWEEN from "@tweenjs/tween.js";
import {Container, Sprite, Text, Texture, Ticker } from "pixi.js"
import { GameConstants } from "../gameconstants/gameconstants";
import { Game } from "../game";

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
        this.ballText = false;
        this.distance = [];
        for(var i = 0; i< this.balls.length; i++){
            this.distance[i] = 0;
        }
        this.needle = Sprite.from(Texture.from("needle"));
        this.needle.anchor.set(GameConstants.needleAnchor.x, GameConstants.needleAnchor.y);
        this.needle.width = GameConstants.needleWidth;
        this.needle.height = GameConstants.needleHeight;
        this.needle.x = GameConstants.defaultBallX;
        this.needle.y = GameConstants.defaultBottomBall;
        this.predict = [];
        this.beams = [];
        this.cutLines = [];
        this.verLines =[];
        this.horLines = [];
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
        this.showBallNum();
        this.moveBall(dt);
        this.border(dt);
    }
    // move balls and stare
    moveBall(dt){
        if(this.readyAttack){
            this.removeChild(this.ballNum)
            this.ballText = false;
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
                    })
                    .onComplete(() => {
                        ball.ball.tint = "white";
                        this.isCreating = false;
                        var textTween = new TWEEN.Tween({ time: 100})
                        .to({x: 200 }, GameConstants.ballTweenTime*dt*3)
                        .onUpdate(() => {
                            // console.log("gain");
                            if(Game.collision.ballGainNum > 0){
                                this.showBallGain();
                                this.ballText = true;
                            }
                        })
                        .onComplete(() => {
                            // console.log("finish gain");  
                            this.removeChild(this.ballGain);    
                            this.ballText = false;
                            Game.collision.ballGainNum = 0;                      
                        })
                        .start(Game._current);                        
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
    showBallNum(){
        // console.log(this.allGround + " " + this.isCreating);
        if(this.allGround && !this.isCreating){
            // console.log("show");
            if(this.ballText) return;
            this.removeChild(this.ballNum)
            this.ballNum = new Text("x" + this.balls.length, {
                fontSize: GameConstants.fontSize,
                fill: "white",
                fontFamily: GameConstants.defaultFont, 
            });
            this.ballNum.anchor.set(1, 1);
            this.ballNum.x = this.groundPositionX - ballRadius;
            this.ballNum.y = this.groundPositionY - ballRadius;
            this.addChild(this.ballNum);
        }
    }
    showBallGain(){
            this.removeChild(this.ballGain)
            this.ballGain = new Text("+" + Game.collision.ballGainNum, {
                fontSize: GameConstants.fontSize,
                fill: "green",
                fontFamily: GameConstants.defaultFont, 
            });
            this.ballGain.anchor.set(0, 1);
            this.ballGain.x = this.groundPositionX;
            this.ballGain.y = this.groundPositionY - ballRadius;
            this.addChild(this.ballGain);
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
                delete this.verLines;
                delete this.horLines;
                delete this.cutLines;
                this.removeChild(this.needle);

                // console.log(this.readyAttack + " " + this.needle.rotation);

                if(this.ready){                
                    this.balls.forEach(ball => {
                        ball.dx = this.dx; //van toc phuong x cua bong
                        ball.dy = this.dy; // van toc phuong y cua bong
                        // console.log(ball.dy);
                    })
                    // console.log(this.dy);
                    this.removeChild(this.needle);      
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
                        this.addChild(this.needle);
                        this.ready = true;                      
    
                        // (dx, dy) la vector song song voi (x, y) nhung co do dai = speed
                        {
                            if(x!=0&&y!=0){                        
                                this.dx = this.speed*x/Math.sqrt((x*x+y*y));
                                this.dy = this.speed*y/Math.sqrt((x*x+y*y));
                                // console.log(this.dx + " " + this.dy + " " + (Math.sqrt((this.dx)^2+(this.dy^2))));
                            }
                            if(x==0){
                                this.dx = 0;
                                this.dy = -this.speed;
                            }
                            // if(y==0){
                            //     this.dx = this.speed;
                            //     this.dy = 0;
                            // }
                            // console.log(alpha + " " + this.dx + " " + this.dy);
                        }
                        
                        // di chuot xuong duoi mot doan nhat dinh moi duoc ban
                        if( y < 0 ) {
                            if(y <= 0){
                                Game.uiManager.igUI.removeChild(Game.uiManager.igUI.guideText);
                            }

                            // // reset property
                            {
                                this.removeChild(this.container);
                                delete this.container;
                                delete this.predict;
                                delete this.beams;
                                delete this.verLines;
                                delete this.horLines;
                                delete this.cutLines;
        
                                this.container = new Container();
                                this.addChild(this.container);
                                this.predict = [];
                                this.beams = [];
                                this.verLines =[];
                                this.horLines = [];
                                this.cutLines = [];
        
                                var pre = {x0 : 0, y0 : 0, x: this.groundPositionX, y : this.groundPositionY, alpha : alpha,hypo : 0, };
                                this.predict.push(pre);
                                // this.deflect(this.groundPositionX, this.groundPositionY, alpha);  
                                this.deflectC(this.groundPositionX, this.groundPositionY, alpha, Game.map.squares);  
                            }
                            
                            // // Gen predict
                            for( var i = 0; i < this.predict.length -1; i++){
                                this.beams[i] = Sprite.from(Texture.from("square"));
                                this.beams[i].anchor.set(0.5, 1);
                                this.beams[i].x = this.predict[i].x;
                                this.beams[i].y = this.predict[i].y;
                                this.beams[i].rotation = this.predict[i].alpha;
                                this.beams[i].width = GameConstants.squareEdge*0.05;
                                this.beams[i].height = this.predict[i+1].hypo;
                                this.container.addChild( this.beams[i]);
                            }
                            // console.log(this.predict);
                        }
                        if( y > 0 ) {
                            this.removeChild(this.container);
                            delete this.container;
                            delete this.predict;
                            delete this.beams;
                            delete this.verLines;
                            delete this.horLines;
                            delete this.cutLines;
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
        
        //Bounds
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
        if(this.predict.length == 6) return;   
        if(y1 == bb) {
            //console.log("cham day " + this.predict.length);
            return
        }
        this.deflect(x1, y1, alpha1);
    }
    deflectB(x0, y0, alpha0, squares){ 
         //Bounds
        var lb = ballRadius;
        var rb = GameConstants.screenWidth - ballRadius;
        var tb = GameConstants.defaultTopBall;
        var bb = GameConstants.defaultBottomBall;

        // Wall bound
        {
            var leftLine = {x1: lb, y1: tb, 
                            x2: lb, y2: bb, 
                            x: lb, y: 0, 
                            len : 0, i: -1, direct : 1};
            if(!(x0 == leftLine.x && leftLine.y1 < y0 && y0 < leftLine.y2 ))  this.verLines.push(leftLine);
    
            var rightLine = {x1: rb, y1: tb, 
                            x2: rb, y2: bb, 
                            x: rb, y: 0, 
                            len : 0, i: -1, direct : 1};
            if(!(x0 == rightLine.x && rightLine.y1 < y0 && y0 < rightLine.y2 ))  this.verLines.push(rightLine);
    
            var topLine   = {x1: lb, y1: tb, 
                            x2: rb, y2: tb, 
                            x: 0, y: tb, 
                            len : 0, i: -1, direct : 0};
            if(!(y0 == topLine.y && topLine.x1 < x0 && x0 < topLine.x2 )) this.horLines.push(topLine);
    
            var bottomLine ={x1: lb, y1: bb, 
                            x2: rb, y2: bb, 
                            x: 0, y: bb, 
                            len : 0, i: -1, direct : 0};
            if(!(y0 == bottomLine.y && bottomLine.x1 < x0 && x0 < bottomLine.x2 )) this.horLines.push(bottomLine);
        }

        //Square bound
        {
            for(var i = 0; i < squares.length; i++){
                var bound = squares[i].square.getBounds();
                var bdl = bound.left;
                var bdr = bound.right;
                var bdt = bound.top;
                var bdb = bound.bottom
                
                //left vertical bound
                var lVerLine = {x1: bdl, y1: bdt, 
                                x2: bdl, y2: bdb, 
                                x: bdl, y: 0, 
                                len : 0, i: i, direct : 1};
                this.verLines.push(lVerLine);

                //right vertical bound
                var rVerLine = {x1: bdr, y1: bdt, 
                                x2: bdr, y2: bdb, 
                                x: bdr, y: 0, 
                                len : 0, i: i, direct : 1};
                this.verLines.push(rVerLine);

                //top horizontal bound
                var tHorLine = {x1: bdl, y1: bdt, 
                                x2: bdr, y2: bdt, 
                                x: 0, y: bdt, 
                                len : 0, i: i, direct : 0};              
                this.horLines.push(tHorLine);
                
                //bottom horizoltal bound
                var bHorLine = {x1: bdl, y1: bdb, 
                                x2: bdr, y2: bdb, 
                                x: 0, y: bdb, 
                                len : 0, i: i, direct : 0};
                this.horLines.push(bHorLine);
            }
        }
        
        // vertical line array to cut array
        this.verLines.forEach( verLine => {
            verLine.y = (verLine.x - x0)/Math.tan(-alpha0) + y0;
            if(verLine.y1 < verLine.y && verLine.y < verLine.y2){
                verLine.len = this.vectorDistance({x: verLine.x, y: verLine.y}, {x: x0, y: y0});
                if( verLine.len != 0) this.cutLines.push(verLine);
                // console.log("ver" + verLine.i);
            }
        })

        //horizontal line array to cut array
        this.horLines.forEach( horLine => {
            horLine.x = (horLine.y - y0)*Math.tan(-alpha0) + x0;
            if(horLine.x1 < horLine.x && horLine.x < horLine.x2){
                horLine.len = this.vectorDistance({x: horLine.x, y: horLine.y}, {x: x0, y: y0});
                if( horLine.len != 0) this.cutLines.push(horLine);
                // console.log("hor" + horLine.i);
            }

        })
        
        // find cut point that has min distance to {x0, y0}
        var cutPoint = {x: 0, y: 0, len : GameConstants.screenHeight*10, i: 0, direct : 0}
        for(var i = 0; i < this.cutLines.length; i++){
            var cutLine = this.cutLines[i];
            if(cutLine.x == x0 && cutLine.y == y0) continue;
            if(cutPoint.len > cutLine.len) {
                cutPoint.x = cutLine.x;
                cutPoint.y = cutLine.y;
                cutPoint.len = cutLine.len;
                cutPoint.i = cutLine.i;
                cutPoint.direct = cutLine.direct;
            }
        }

        // console.log(cutPoint);

        // push into predict array 
        {
            var hypo = cutPoint.len;
            var x1 = cutPoint.x;
            var y1 = cutPoint.y; 
            var alpha1 = 0;     
            
            if(cutPoint.direct == 1){
                alpha1 = -alpha0;
            }
            if(cutPoint.direct == 0){
                if(alpha0 > 0) {
                    alpha1 = pi - alpha0;
                }
                else {
                    alpha1 = -pi - alpha0;
                }
            }
            var pre = {x0 : x0, y0 : y0, x: x1, y : y1, alpha : alpha1,hypo : hypo, }
            this.predict.push(pre);
        }  

        //recursive
        {
            if(cutPoint.i != -1) return;
            if(this.predict.length == 11) return;   
            if(y1 == GameConstants.defaultBottomBall) return
            this.deflectB(x1, y1, alpha1, squares); 
        }
    }
    deflectC(x0, y0, alpha0, squares){ 
         //Bounds
        var lb = ballRadius;
        var rb = GameConstants.screenWidth - ballRadius;
        var tb = GameConstants.defaultTopBall;
        var bb = GameConstants.defaultBottomBall;

        // Wall bound
        {
            var leftLine = {x1: lb, y1: tb, 
                            x2: lb, y2: bb, 
                            x: lb, y: 0, 
                            len : 0, i: -1, direct : 1};
            this.verLines.push(leftLine);
    
            var rightLine = {x1: rb, y1: tb, 
                            x2: rb, y2: bb, 
                            x: rb, y: 0, 
                            len : 0, i: -1, direct : 1};
            this.verLines.push(rightLine);
    
            var topLine   = {x1: lb, y1: tb, 
                            x2: rb, y2: tb, 
                            x: 0, y: tb, 
                            len : 0, i: -1, direct : 0};
            this.horLines.push(topLine);
    
            var bottomLine ={x1: lb, y1: bb, 
                            x2: rb, y2: bb, 
                            x: 0, y: bb, 
                            len : 0, i: -1, direct : 0};
            this.horLines.push(bottomLine);
        }

        //Square bound
        {
            for(var i = 0; i < squares.length; i++){
                var bound = squares[i].square.getBounds();
                var bdl = bound.left;
                var bdr = bound.right;
                var bdt = bound.top;
                var bdb = bound.bottom
                
                //left vertical bound
                var lVerLine = {x1: bdl, y1: bdt, 
                                x2: bdl, y2: bdb, 
                                x: bdl, y: 0, 
                                len : 0, i: i, direct : 1};
                this.verLines.push(lVerLine);

                //right vertical bound
                var rVerLine = {x1: bdr, y1: bdt, 
                                x2: bdr, y2: bdb, 
                                x: bdr, y: 0, 
                                len : 0, i: i, direct : 1};
                this.verLines.push(rVerLine);

                //top horizontal bound
                var tHorLine = {x1: bdl, y1: bdt, 
                                x2: bdr, y2: bdt, 
                                x: 0, y: bdt, 
                                len : 0, i: i, direct : 0};              
                this.horLines.push(tHorLine);
                
                //bottom horizoltal bound
                var bHorLine = {x1: bdl, y1: bdb, 
                                x2: bdr, y2: bdb, 
                                x: 0, y: bdb, 
                                len : 0, i: i, direct : 0};
                this.horLines.push(bHorLine);
            }
        }
        
        // vertical line array to cut array
        this.verLines.forEach( verLine => {
            verLine.y = (verLine.x - x0)/Math.tan(-alpha0) + y0;
            if(verLine.y1 <= verLine.y && verLine.y <= verLine.y2){
                verLine.len = this.vectorDistance({x: verLine.x, y: verLine.y}, {x: x0, y: y0});
                if( verLine.len != 0) this.cutLines.push(verLine);
            }
        })

        //horizontal line array to cut array
        this.horLines.forEach( horLine => {
            horLine.x = (horLine.y - y0)*Math.tan(-alpha0) + x0;
            if(horLine.x1 <= horLine.x && horLine.x <= horLine.x2){
                horLine.len = this.vectorDistance({x: horLine.x, y: horLine.y}, {x: x0, y: y0});
                if( horLine.len != 0) this.cutLines.push(horLine);
            }

        })
        
        // find cut point that has min distance to {x0, y0}
        var index = -1;
        var len = GameConstants.screenHeight*10;
        for(var i = 0; i < this.cutLines.length; i++){
            var cutLine = this.cutLines[i];
            if(cutLine.x == x0 && cutLine.y == y0) continue;
            if( cutLine.x < lb || cutLine.x > rb || cutLine.y <tb || cutLine.y > bb) continue;
            if(len >= cutLine.len) {
                len = cutLine.len;
                index = i;
            }
        }

        // console.log(cutPoint);

        // push into predict array 
        {
            var cutPoint = this.cutLines[index];
            var hypo = cutPoint.len;
            var x1 = cutPoint.x;
            var y1 = cutPoint.y; 
            var alpha1 = 0;     
            
            if(cutPoint.direct == 1){
                alpha1 = -alpha0;
            }
            if(cutPoint.direct == 0){
                if(alpha0 > 0) {
                    alpha1 = pi - alpha0;
                }
                else {
                    alpha1 = -pi - alpha0;
                }
            }
            var pre = {x0 : x0, y0 : y0, x: x1, y : y1, alpha : alpha1,hypo : hypo, }
            this.predict.push(pre);
        }  

        //recursive
        {
            if(cutPoint.i != -1) return;
            if(this.predict.length == 11) return;   
            if(y1 == GameConstants.defaultBottomBall) return
            this.deflectC(x1, y1, alpha1, squares); 
        }
    }
    vectorDistance(objA, objB){
        return Math.sqrt((objA.x- objB.x)*(objA.x- objB.x)+(objA.y- objB.y)*(objA.y- objB.y));
    }
}