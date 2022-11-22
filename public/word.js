import { Letter } from "./letter.js"
import { Explosion } from "./explosion.js"

export class Word{
    constructor(context, scaleFactor, wordLength, canvas, projectiles, letterProjectiles, images, wordSpeed){
        
        this.wordSpeed = wordSpeed
        this.position = {
            x: 0,
            y: 0,
        }
        this.velocity = {
            x: 1 * wordSpeed,
            y: 0  

        }
        this.hitCount = wordLength;
        this.wordLength = wordLength;
        this.canvas = canvas;
        this.contex = context;
        this.images = images;
        this.score = 0;
        this.scaleFactor = scaleFactor;

        //distance from top of window
        this.topMargin = 20;

       
        this.width = 110 * this.wordLength * scaleFactor;
        this.letters = [];
        this.projectiles = projectiles;


        this.explosion1 = new Explosion({
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0, 
            }
        },context, canvas)

        this.explosion2 = new Explosion({
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0, 
            }
        },context, canvas)

        this.explosion3 = new Explosion({
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0, 
            }
        },context, canvas)
        

        this.explosions = [this.explosion1, this.explosion2, this.explosion3];


        for (let x = 0; x < 7; x++){
            for(let y = 0; y < 2; y++){ 
                if (x < this.images.wordLength[y]){
                    this.letters.push(new Letter(this.images.imageArray[y], 0, 3, 250, 250, this.scaleFactor, context, x,  {position: {
                        x: x * 110 * this.scaleFactor,
                        y: y * 110 * this.scaleFactor,
                    }}));
                    
                }

            }
            
            
        }    
        
    }


    update(){
  

    this.explosions.forEach((explosion)=>{
        explosion.update()
    })
    
//***********************  Move Letter Grid   *************************************************************** */
        setTimeout(() => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.velocity.y = 0;
            if (this.position.x + this.width >= this.canvas.width){
                this.velocity.x = -this.velocity.x;
                this.velocity.y = 50;
           }
   
  /*****************  Move grid down when it hits edges  **************************/
           if(this.position.x <= 0){
               this.velocity.x = -this.velocity.x;
               this.velocity.y = 50;
   
           }
            
        },10);
       


    /******************* Letter Collisions  **************************************/

        this.letters.forEach((letter, letterIndex)=>{ 
            letter.update({velocity: this.velocity});     
            
            this.projectiles.forEach((projectile, projectileIndex)=>{          
                setTimeout(() => { 

                    //Player can only destroy letters if they're far enough down the screen
                    if (letter.position.y > 0 - letter.height/2){
                        if (projectile.position.y <= letter.position.y + letter.height &&
                            projectile.position.y >= letter.position.y  &&
                            projectile.position.x >= letter.position.x &&
                            projectile.position.x <= letter.position.x + letter.width/2){
    
                            
                            const projectileFound = this.projectiles.find(projectile2 =>{
                                return projectile2 === projectile
                            }) 
                            const letterFound = this.letters.find(letter2 =>{
                                return letter2 === letter
                            })
    
                            
                                //remove projectile and letter after hit
                            if (letterFound && projectileFound){ 
                                this.score += 50;
                                const random = Math.floor(Math.random()* this.explosions.length) 
                                this.explosions[random].frameX = 0
                                this.explosions[random].scaleFactor = 1;
                                this.explosions[random].position.x = letter.position.x + letter.width/2 - this.explosions[random].width/2;
                                this.explosions[random].position.y = letter.position.y + letter.height/2 - this.explosions[random].height/2;
                                this.explosions[random].velocity.x = this.velocity.x;
    
                                //sets duration of explosion
                                setTimeout(() => {
                                    this.explosions[random].frameX = 0;
                                    this.explosions[random].scaleFactor = 0;
                                },600);
    
                                setTimeout(() => {    
                                    this.letters.splice(letterIndex,1);
                                    if(this.letters.length > 0){
                                        const firstLetter = this.letters[0];
                                        const lastLetter = this.letters[this.letters.length -1];
                                        this.width = lastLetter.position.x  - firstLetter.position.x + lastLetter.width;
                                        this.position.x = firstLetter.position.x;
                                    
                                    } 
                                }, 10);
                        
    
                                setTimeout(() => {
                                    this.projectiles.splice(projectileIndex, 1); 
                                    
                                        
                                }, 10);
                            
                                
                        
                            }
                                    
                            
                        }      

                    }     
                            
                
                }, 100);
            
            });
            
            
        })
        
    }

    getScore(){
        return this.score;
    }
    
}