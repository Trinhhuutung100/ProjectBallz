const screenHeight = innerHeight;
const screenWidth = innerWidth;
const padding = 2.5;
const column = 20;
const edge = screenWidth/2/column;
const ballRadius = 10 ;
export const GameConstants = {
    //Screen
    screenWidth : screenWidth,
    screenHeight : screenHeight,
    //Default position x = screen/2,y = screen - ballradius
    defaultX : screenWidth/2,
    defaultY : screenHeight - ballRadius,
    column : column,    
    //Padding between square
    padding : padding,
    //Hafl edge of a block
    edge : edge,
    //Square edge = edge - padding
    squareEdge : edge - padding,
    //Anchor
    needleAnchor : {x: 0.5, y: 1.5},
    echoAnchor : {x: 0.5, y: 1.2},
    //Scale
    minRingScale : 0.011,
    maxRingScale : 0.0135,
    needleScale : {x: 0.5, y: 0.5},
    echoDenominator : 150,
    echoMaxNumerator : 120,
    echoMinNumerator : 20,
    //Text font
    fontSize : 30,
    ballRadius : ballRadius,
    coinRadius : 15,
    //Ball move
    ballSpeed : 10,
    distanceBetweenBalls : 10,
    fallSpeed : 10,
    //Tween animation
    ballTweenTime : 500,
    ringTweenTime : 10,
}