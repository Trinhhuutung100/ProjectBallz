
export class Abjust{
    static screenWidth = innerWidth;
    static screenHeight = innerHeight;
    static needleAnchor = {x: 0.5, y: 1.5};
    static echoAnchor = {x: 0.5, y: 1.2};
    static ballScale = 0.01;
    static minRingScale = 0.011;
    static maxRingScale = 0.0135 ;
    static needleScale = {x: 0.5, y: 0.5};
    static echoDenominator = 150;
    static echoMaxNumerator = 120;
    static echoMinNumerator = 20;
    static fontSize = 32;
    static edge = innerWidth/20;
    static ballRadius = 10;
    static ballSpeed = 20;
    static distanceBetweenBalls = 5;
    static ballTweenTime = 500;
    static ringTweenTime = 100;
    static defaultX = Abjust.screenWidth/2;
    static defaultY = Abjust.screenHeight - Abjust.ballRadius;
}