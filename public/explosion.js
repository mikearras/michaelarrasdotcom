export class Explosion {

    constructor({position, velocity}, context, canvas){
        const image = new Image();
        image.src = './Sprites/explosion.png';
        this.context = context;
        this.scaleFactor = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 10;
        this.numFrames = 5;
        this.gameFrame = 0;
      
       
        this.velocity = {
            x: 0,
            y: 0
        }

        image.onload = ()=>{
            this.image = image;
            this.width = 64
            this.height = 64
            this.velocity = velocity
            this.position = position
        
        }
        
    }

    draw(){
      
       //only runs function if image has finished loading.
    
           this.context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.position.x, this.position.y, this.width*this.scaleFactor, this.height*this.scaleFactor)
       
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

        }
    }


}
