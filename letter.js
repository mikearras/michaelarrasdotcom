export class Letter {

    constructor(imageSource, startFrame, endFrame,  spriteWidth, spriteHeight, context, sheetRow, {position}){

        this.context = context;
        let image = new Image();
        image.src = imageSource;
        this.speed = 5;
        this.frameX = 0;
        this.frameY = 0;
        this.startFrame = startFrame;
        this.endFrame = endFrame;
        //this.numFrames = numFrames;
        this.gameFrame = 0;
        this.sheetRow = sheetRow;
        this.spriteHeight = spriteHeight;
        this.spriteWidth = spriteWidth;

        image.onload = ()=> {
           
            this.image = image;
            this.width = this.spriteWidth/2;
            this.height = this.spriteHeight/2;


            //starting position of a letter on the canvas
            this.position = {
                x: position.x,
                y: position.y
            } 
            //this.context = context;
        }
    
   
    }

    

    draw(){
        this.context.drawImage(this.image, this.frameX * this.spriteWidth, this.sheetRow * this.spriteHeight, this.spriteWidth, this.spriteHeight,this.position.x, this.position.y, 100, 100)

    }


    update({velocity}){
        if(this.image){
           
            this.position.x += velocity.x;
            this.position.y += velocity.y;

            this.draw();
            if(this.gameFrame % this.speed == 0)
            {     
                //this.draw();
                
                if(this.frameX < this.endFrame){
                    this.frameX++;
                }else{
                   this.frameX = this.startFrame;
                }
           }
           
            this.gameFrame++;
           
     
        }

      
    }
}
   