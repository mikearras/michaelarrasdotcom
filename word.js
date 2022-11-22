import { Letter } from "./letter.js"
import { Explosion } from "./explosion.js"

export class Word{
    constructor(imageSource, context, wordLength, canvas, projectiles, row){
        
            this.position = {
                x: 0,
                y: 0,

            }

        this.velocity = {
            x: 3,
            y: 0  

        }
        this.hitCount = wordLength;
        this.wordLength = wordLength;
        this.canvas = canvas;
        this.contex = context;

       
        this.width = 700;
        this.letters = [];
        this.projectiles = projectiles;

        for (let i = 0; i < wordLength; i++){
            this.letters.push(new Letter(imageSource, 0, 3, 200, 200, context, i,  {position: {
                x: i * 100,
                y: row * 100 + 20
            }}));

        }
        

        
        
    }

    update(){
        this.contex.fillStyle = 'white';    
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        this.velocity.y = 0;

        if (this.position.x + this.width >= this.canvas.width){
             this.velocity.x = -this.velocity.x;
             this.velocity.y = 100;
        }

        if(this.position.x <= 0){
            this.velocity.x = -this.velocity.x;
            this.velocity.y = 100;

        }


        this.letters.forEach((letter, letterIndex)=>{
            letter.update({velocity: this.velocity});
            setTimeout(() => {
                if (letter.position.y + letter.height/2 -100 >= this.canvas.height){
                    letter.position.y = 0;
                }
            }, 0);
            
            this.projectiles.forEach((projectile, projectileIndex)=>{
                setTimeout(() => {
                    if (projectile.position.y <= letter.position.y + letter.height &&
                        projectile.position.y >= letter.position.y  &&
                        projectile.position.x >= letter.position.x &&
                        projectile.position.x <= letter.position.x + letter.width/2){
                        setTimeout(() => {
                            const letterFound = this.letters.find(letter2 =>{
                                return letter2 === letter
                            }) 
                            const projectileFound = this.projectiles.find(projectile2 =>{
                                return projectile2 === projectile
                            }) 

                            //remove projectile and letter after hit
                            if (letterFound && projectileFound){
                               letter.sheetRow = this.wordLength;    
                               setTimeout(() => {
                                  this.letters.splice(letterIndex,1);
                                  const firstLetter = this.letters[0];
                                if(this.letters.length > 0){
                                    const firstLetter = this.letters[0];
                                    const lastLetter = this.letters[this.letters.length -1];
                                    this.width = lastLetter.position.x  - firstLetter.position.x + lastLetter.width;
                                    this.position.x = firstLetter.position.x;
                
                                }       
                                }, 150);
                                this.projectiles.splice(projectileIndex, 1); 
                                
                                
                            }
        
                        }, 0);
                        
                        
                        
                        //  projectile.context.clearRect(projectile.position.x,projectile.position.y, projectile.width, projectile.height);
                        //this.projectiles.splice(projectileIndex, 1);
                    }                  
                })
                }, 0);
               
            
        })
        
    }
    
}