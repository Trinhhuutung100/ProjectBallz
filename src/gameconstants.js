
export const GameConstants = {
    //Screen
    screenWidth : innerWidth,
    screenHeight : innerHeight,
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
    fontSize : 32,
    //Padding between square
    padding : 5,
    //Hafl edge of a block
    edge : innerWidth/20,
    //Square edge = edge - padding
    squareEdge : innerWidth/20 - 5,
    ballRadius : 10,
    coinRadius : 15,
    //Ball move
    ballSpeed : 10,
    distanceBetweenBalls : 10,
    fallSpeed : 10,
    //Tween animation
    ballTweenTime : 500,
    ringTweenTime : 10,
    //Default position x = screen/2,y = screen - ballradius
    defaultX : innerWidth/2,
    defaultY : innerHeight - 10,
}