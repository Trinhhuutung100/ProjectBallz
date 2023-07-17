import { Container, Sprite, Text } from "pixi.js";
import { GameConstants } from "./gameconstants";
const paddingTop = GameConstants.screenHeight/4;
const paddingLeft= GameConstants.screenWidth/20;
const distanceWidth = GameConstants.screenWidth/3.25;
const distanceHeight = GameConstants.screenHeight/5;
export class UI_SHOP extends Container {
    constructor(game) {
        super();
        this.game = game;
        this.drawTextShop();
        this.drawNumberOfRing();
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                this.drawItem(i,j);
            }
        }
        this.game.app.stage.addChild(this);
    }
    drawTextShop(){ // vẽ chữ shop 
        const text = new Text("SHOP", { 
            fontFamily: "Arial",
            fontSize: 48,
            fill: 0xffffff, 
        });
        text.anchor.set(0.5);
        text.x = GameConstants.screenWidth/2;
        text.y = GameConstants.screenHeight/6;
        this.addChild(text);
        
    }
    drawNumberOfRing(){ // hiển thị số lượng chiếc nhẫn đã có
        const text = new Text("212", { // ví dụ 212 là số chiếc nhẫn hiện tại
            fontFamily: "Arial",
            fontSize:20,
            fill: 0xffffff, 
        });
        text.anchor.set(1,0);
        text.x=GameConstants.screenWidth*0.97;
        text.y=0;
        this.addChild(text);
        const ring = Sprite.from("assets/images/ring.png");
        ring.anchor.set(1,0);
        ring.scale.set(0.008);
        ring.tint = 0xffff00;
        ring.x=GameConstants.screenWidth;
        ring.y=0;
        this.addChild(ring);
    }
    drawItem(row, col) { // vẽ item shop ứng với hàng, cột
        const item = Sprite.from(`assets/images/lock${3*row+(col+1)}.png`);
        const x = paddingLeft + distanceWidth * col;
        const y = paddingTop + distanceHeight * row;
        item.position.set(x, y);
        this.addChild(item);
    }
}


