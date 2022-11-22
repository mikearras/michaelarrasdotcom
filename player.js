export class Player {

    constructor(context, canvas){
        const image = new Image();
        image.src = './newPlayer.png';
        this.context = context;
        this.scaleFactor = 2;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 5;
        this.numFrames = 3;
        this.gameFrame = 0;
      
       
        this.velocity = {
            x: 5,
            y: 0
        }

        image.onload = ()=>{
            this.image = image;
            this.width = 100
            this.height = image.height/2

            this.position = {
                x: canvas.width/2 - this.width/2,
                y: canvas.height - 100
    
            }
        
        }
        
    }

    draw(){
      
       //only runs function if image has finished loading.
    
           this.context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.position.x, this.position.y, this.width, this.height)
       
    }

    update(){
        if (this.image){
            this.draw()
            //this.context.clearRect(this.position.x,this.position.y, this.width, this.height);  
            this.position.x += this.velocity.x;
           

            if(this.gameFrame % this.speed == 0)
            {
                
                this.draw();
                if(this.frameX < this.numFrames){
                    this.frameX++;
                }else{
                   this.frameX = 0;
                }
           }
           
            this.gameFrame++;
               // this.draw();  
        }
    }


}
