import { LetterProjectile } from "./letterProjectile.js";

export class Letter {

    constructor(imageSource, startFrame, endFrame,  spriteWidth, spriteHeight, scaleFactor, context, sheetRow, {position}){

        this.context = context;
        let image = new Image();
        image.src = imageSource;
        this.speed = 25;
        this.frameX = 0;
        this.frameY = 0;
        this.startFrame = startFrame;
        this.endFrame = endFrame;
        this.gameFrame = 0;
        this.sheetRow = sheetRow;
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;
        this.scaleFactor = scaleFactor;

        image.onload = ()=> {
           
            this.image = image;
            this.width = this.spriteWidth/2;
            this.height = this.spriteHeight/2;


            //starting position of a letter on the canvas
            this.position = {
                x: position.x,
                y: position.y - 250
            } 
        }
    
   
    }


    draw(){
        this.context.drawImage(this.image, this.frameX * this.spriteWidth, this.sheetRow * this.spriteHeight, this.spriteWidth, this.spriteHeight,this.position.x, this.position.y, this.width * this.scaleFactor, this.height * this.scaleFactor)

    }


    update({velocity}){

        if(this.image){
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
            //this.context.clearRect(this.position.x,this.position.y, this.width, this.height); 
            
            if(this.gameFrame % this.speed == 0)
            {     
                
                if(this.frameX < this.endFrame){
                    
                    this.frameX++;
                }else{
                    
                   this.frameX =  Math.floor(Math.random()*this.endFrame);
                }
           }
           
            this.gameFrame++;
            
           
     
        }

      
    }

    shoot(letterProjectiles){
        letterProjectiles.push(new LetterProjectile({
            position: {
                x: this.position.x,
                y: this.position.y + this.height/2,
            },
            velocity: {
                x: 0,
                y: 2
            }
        }, this.context))
        
    }
}
   