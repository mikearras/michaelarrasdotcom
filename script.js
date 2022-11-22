//import { Player } from "./player.js";
import { Word } from "./word.js"
import { Letter } from "./letter.js"
import { Player } from "./player.js";
import { Projectile } from "./projectile.js";

let canvas = document.querySelector('.canvas');
let context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const player = new Player(context, canvas);
let projectiles = [];


const michael = new Word('./michael.png', context, 7, canvas, projectiles, 0);
const arras = new Word('./arras.png', context, 5, canvas, projectiles, 1);



const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },

    space: {
        pressed: false
    }
}

function animate(){ 
   context.fillStyle = 'white';
    context.fillRect(0,0, canvas.width, canvas.height);
    
    player.update();
   michael.update();
   arras.update();

   


 

    

    projectiles.forEach((projectile, projectileIndex) =>{
        projectile.update();
       
        setTimeout(() => {
            if(projectile.position.y + projectile.height <= 0){
                projectiles.splice(projectileIndex, 1)

            }
        }, 20);
        
    
    
        
         
        
    })  
        
 
    requestAnimationFrame(animate);
   
    if (keys.a.pressed && player.position.x > 0){
        player.velocity.x = -5;
    }else if (keys.d.pressed && player.position.x + player.width <= canvas.width){
        player.velocity.x = 5;
    }else{
        player.velocity.x = 0;
    }

        
};


animate();


addEventListener('keydown', ({key})=>{  //object destructuring
    switch(key){
        case 'a':
            keys.a.pressed = true;
            break
        case 'd':
            keys.d.pressed = true;
            break
        case ' ':
            keys.space.pressed = true; 
            break

}
})

addEventListener('keyup', ({key})=>{  //object destructuring
    switch(key){
        case 'a': 
            keys.a.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
        case ' ':
            player.frameY = 1;
             player.numFrames = 8;
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width/4 + 10,
                    y: player.position.y + 30
                   
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }, context))
            keys.space.pressed = false;
            setTimeout(() => {
                player.frameY = 0
                player.numFrames = 3
            }, 400);
           
            break

        case ' ':
            keys.space.pressed = false;
        break
}
})


   
