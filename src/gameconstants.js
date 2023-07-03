import { Assets } from "pixi.js";

const column = 7;
const line = 13;
const screenHeight = innerHeight;
const screenWidth = innerWidth < innerHeight ? innerWidth : innerHeight/line*column;
const squareEdge = screenWidth/16;
const padding = squareEdge/4;
//const edge = screenWidth/2/column;
const ballRadius = squareEdge/3;
const defaultBottom = screenHeight/2 + 5*padding + 8*squareEdge;
const defaultTop = screenHeight/2 - 5*padding - 10*squareEdge ;
const defaultBottomBall = defaultBottom - ballRadius;
const defaultTopBall = defaultTop + ballRadius;
const defaultTopMap = defaultTop + squareEdge;
// const defaultFont = "";
Assets.addBundle("Roboto",{
    black : "src/Fonts/Roboto/Roboto-Black.ttf" ,
    blackItalic : "src/Fonts/Roboto/Roboto-BlackItalic.ttf" ,
    bold : " src/Fonts/Roboto/Roboto-Bold.ttf" ,
    boldItalic : " src/Fonts/Roboto/Roboto-BoldItalic.ttf" ,
    italic : " src/Fonts/Roboto/Roboto-Italic.ttf" ,
    light : " src/Fonts/Roboto/Roboto-Light.ttf" ,
    lightItalic : " src/Fonts/Roboto/Roboto-LightItalic.ttf" ,
    medium : " src/Fonts/Roboto/Roboto-Medium.ttf" ,
    mediumItalic : " src/Fonts/Roboto/Roboto-MediumItalic.ttf" ,
    regular : " src/Fonts/Roboto/Roboto-Regular.ttf" ,
    thin : " src/Fonts/Roboto/Roboto-Thin.ttf" ,
    thinItalic : " src/Fonts/Roboto/Roboto-ThinItalic.ttf" 
});
export const GameConstants = {
    //Screen
    screenWidth : screenWidth,
    screenHeight : screenHeight,
    //Default position x = screen/2,y = screen - ballradius
    defaultBallX : screenWidth/2,
    defaultBottom : defaultBottom,
    defaultTop : defaultTop,
    defaultBottomBall : defaultBottomBall,
    defaultTopBall : defaultTopBall,
    defaultTopMap : defaultTopMap,
    column : column, 
    line : line,   
    //Padding between square
    padding : padding,
    squareEdge : squareEdge,
    //Anchor
    needleAnchor : {x: 0.5, y: 1.5},
    echoAnchor : {x: 0.5, y: 1.2},
    //Scale
    needleWidth : squareEdge/2.5,
    needleHeight : squareEdge*1.5,
    echoDenominator : 5*squareEdge,
    echoMaxNumerator : 2.5*squareEdge,
    echoMinNumerator : 0.1*squareEdge,
    //Text font
    defaultFont : "Futura PT",
    fontSize : Math.round(squareEdge),
    ballRadius : ballRadius,
    coinRadius : squareEdge/2,
    minRing : squareEdge,
    maxRing : squareEdge*1.5,
    //Ball move
    ballSpeed : squareEdge*0.5/2,
    distanceBetweenBalls : Math.round(squareEdge/2)*1.1,
    fallSpeed : squareEdge*0.5/2,
    //Tween animation
    ballTweenTime : 500/2,
    ringTweenTime : 10*2,
}