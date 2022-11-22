export class LetterProjectile {
    constructor({position, velocity}, context){
        
        this.context = context;
        this.frameX = 0;
        this.frameY = 0;
        this.gameFrame = 0;
        this.numFrames = 8;

        this.cssAnim = {
            image: './Sprites/cssImage.png',
            scale: 1,
            length: 4,
            speed: 10
        }
        
        this.jsAnim = {
            image: './Sprites/java.png',
            scale: 1,
            length: 4,
            speed: 10
        }
        this.cPlusPlus = {
            image: './Sprites/c++.png',
            scale: 1,
            length: 8,
            speed: 4
        }
        this.python = {
            image: './Sprites/python.png',
            scale: 1,
            length: 10,
            speed: 3
        }

        this.sprites = [this.cssAnim, this.jsAnim, this.cPlusPlus, this.python];

        const image = new Image();
        this.random = Math.floor(Math.random()* this.sprites.length)
        image.src = this.sprites[this.random].image;

        image.onload = ()=>{
            this.image = image;
            this.width = image.width/this.sprites[this.random].length;
            this.height = image.height;
            this.position = position;
            this.velocity = velocity; 
            
        }
    
    }

    draw(){
    
       this.context.drawImage(this.image, this.frameX * this.width, 
                this.frameY * this.height, this.width, 
                this.height, this.position.x, this.position.y, 
                this.width * this.sprites[this.random].scale, this.height * this.sprites[this.random].scale
            );
            
    }


    update(){
        
        if(this.image){
            //this.context.clearRect(this.position.x,this.position.y, this.width, this.height); 
            this.draw();
            setTimeout(() => {
                this.position.y += this.velocity.y;
            }, 0);
            

            if(this.gameFrame % this.sprites[this.random].speed == 0)
            {
                this.draw();
                if(this.frameX < this.sprites[this.random].length -1){
                    this.frameX++;
                }else{
                   this.frameX = 0;
                }
           }

            this.gameFrame++;
              
        }


       
       
    }



  
}    

