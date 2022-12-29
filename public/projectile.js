export class Projectile {
    constructor({position, velocity}, context){
        const image = new Image();
        image.src = "./Sprites/projectile.png";
        this.context = context;
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
        this.numFrames = 3;
        this.speed = 5;
      

        image.onload = ()=>{
            this.image = image;
            this.width = 64;
            this.height = 64;
            this.position = position;
            this.velocity = velocity;     
        }
    
    }


    draw(){
        
        this.context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.position.x, this.position.y, this.width*.75, this.height*.75);

    }

    update(){
        
        if(this.image){

            //this.context.clearRect(this.position.x,this.position.y, this.width, this.height); 
            
            this.position.y += this.velocity.y;

            this.draw();

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