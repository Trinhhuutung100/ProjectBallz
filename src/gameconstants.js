const padding = 5;
const column = 7;
const line = 13;
const screenHeight = innerHeight;
const screenWidth = (screenHeight - line*padding)/line*column + (column + 1)* padding;
const squareEdge = (screenWidth - (column+1)*padding)/2/column;
//const edge = screenWidth/2/column;
const ballRadius = squareEdge/3;
const defaultY = screenHeight - 2*padding - 4*squareEdge;
const defaultTop = 2*padding + 4*squareEdge ;
export const GameConstants = {
    //Screen
    screenWidth : screenWidth,
    screenHeight : screenHeight,
    //Default position x = screen/2,y = screen - ballradius
    defaultX : screenWidth/2,
    defaultY : defaultY,
    defaultTop : defaultTop,
    column : column, 
    line : line,   
    //Padding between square
    padding : padding,
    //Hafl edge of a block
    //edge : edge,
    //Square edge = edge - padding
    squareEdge : squareEdge,
    //Anchor
    needleAnchor : {x: 0.5, y: 1.5},
    echoAnchor : {x: 0.5, y: 1.2},
    //Scale
    needleScale : {x: 0.5, y: 0.5},
    echoDenominator : 150,
    echoMaxNumerator : 120,
    echoMinNumerator : 20,
    //Text font
    fontSize : 30,
    ballRadius : ballRadius,
    coinRadius : 15,
    minRing : 25,
    maxRing : 30,
    //Ball move
    ballSpeed : 10,
    distanceBetweenBalls : 10,
    fallSpeed : 10,
    //Tween animation
    ballTweenTime : 500,
    ringTweenTime : 10,
}