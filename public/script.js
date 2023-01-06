//import { Player } from "./player.js";
import { Word } from "./word.js"
import { Letter } from "./letter.js"
import { Player } from "./player.js";
import { Projectile } from "./projectile.js";
import { LetterProjectile } from "./letterProjectile.js";
import { Explosion } from "./explosion.js"


let modal = document.querySelector('#simplemodal');
let scoreButton = document.querySelector('#scoreButton');
let aboutButton = document.querySelector('#aboutButton');
let codeButton = document.querySelector('#codeButton');
let etcButton = document.querySelector('#etcButton');
let gameButton = document.querySelector('#gameButton');
let scoreForm = document.querySelector('#scoreForm');
let topScores = document.querySelector('.scores');
let gameOver = document.querySelector('#gameOver');
let gameScreen = document.querySelector('.gameScreen');
let scoreInfo = document.querySelector('.scoreInfo');
let wordSpeed = 1;
let removeCanvas = false;
let gameIsOn = true;
let aboutIsOn = false;
let contentOn = false;
let gameLoopRunning = true;
let instruct = document.querySelector('.keys');

scoreButton.addEventListener('click', ()=>{
    topScores.style.display = 'block';
    setInterval(() => {
        topScores.style.display = 'none';
    }, 5000);
});

let slider = document.querySelector('#slider');
let aboutSection = document.querySelector("#about");
let codeSection = document.querySelector("#code");
let canvas = document.querySelector('.canvas');

let buttons = [
    {
        div: aboutButton,
        open: false,
        name: 'about',
        content: aboutSection
    },
    {
        div: codeButton,
        open: false,
        name: 'code',
        content: codeSection
    },
    {
        div: etcButton,
        open: false,
        name: 'etc'
    },

    {
        div: gameButton,
        open: false,
        name: 'game',
        content: canvas
    }



]

function toggleContent(content, buttonFlag){

    slider.classList.add('slider');
    
    setTimeout(() => {
        slider.classList.remove('slider');
    }, 1000);

    //Display the selected content
    if(buttonFlag == true){
        setTimeout(() => {
            content.classList.add('contentToggle')
        }, 500);
        
    }
       
    if(gameIsOn == true && content != canvas){
        setTimeout(() => {
            scoreInfo.classList.add('canvasOff')
            canvas.classList.add('canvasOff')
        }, 500);
        gameLoopRunning = false;
        gameIsOn = false;
        instruct.style.display = 'none';

    }else if (gameIsOn == true && content == canvas){
        scoreInfo.classList.remove('canvasOff');
        canvas.classList.remove('canvasOff');
        
        if(gameLoopRunning == false){
            animate();
            gameLoopRunning = true;
            if (combinedScore == 0){
                instruct.style.display = 'block';
            }else{
                instruct.style.display = 'none';
            }
        }else{
            gameLoopRunning = true;
        }
        
    }else if (gameIsOn == false && content == canvas){
        gameIsOn = true;
        scoreInfo.classList.remove('canvasOff');
        canvas.classList.remove('canvasOff');
        animate();
        gameLoopRunning = true;
     
    }
    
}



function buttonCheck(buttons, clickedButton){
    
    for(let button of buttons){
        
        //cycle through buttons and turn off the one that's toggled (if it's not already displayed)
        if (button.open == true && button != clickedButton){
            button.open = false;
            button.content.classList.remove('contentToggle');            
        }
        
    }
}

buttons[0].div.addEventListener('click', ()=>{
    buttons[0].open = true;
    buttonCheck(buttons, buttons[0])
    toggleContent(aboutSection, buttons[0].open); 
    gameIsOn = false;
   
});

buttons[1].div.addEventListener('click', ()=>{
    buttons[1].open = true;
    buttonCheck(buttons, buttons[1]);
    toggleContent(codeSection, buttons[1].open);
    gameIsOn = false;
});


buttons[2].div.addEventListener('click', ()=>{
    buttons[2].open = true;
    buttonCheck(buttons, buttons[2]);
    toggleContent();
    gameIsOn = false;
});

buttons[3].div.addEventListener('click', ()=>{
    gameIsOn = true;
    buttons[3].open = true;
    buttonCheck(buttons, buttons[3]);
    toggleContent(canvas, buttons[3].open);
});


let context = canvas.getContext('2d');
let scaleFactor = 1;
let combinedScore = 0;
let totalScore = 0;
let prevScore = 0;


let fireRate = 100;





canvas.width = 900 * scaleGame();
canvas.height = 600 * scaleGame();

const player = new Player(context, canvas, scaleFactor);
let projectiles = [];
const letterProjectiles = [];


let frame = 0;

let images = {
    imageArray:  ['./Sprites/michael.png', './Sprites/arras.png'],
    wordLength: [7, 5]
}

let game = {
    over: false,
    active: false
}


let score = 0;
let topScore = 0;
let bottomScore = 0;
let scoreDisplay = document.querySelector('#scoreNumber');
let topScoreDisplay = document.querySelector('#topScoreNum');
let maxLetters = 7;
const michael = new Word(context, scaleFactor, maxLetters, canvas, projectiles, letterProjectiles, images, wordSpeed);
const words = [michael];


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



let explosion = new Explosion({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0, 
    }
},context, canvas)


getTopScore();


animate();




/********************************* Main Game Loop ******************************************************/


function animate(){

        context.fillStyle = 'rgb(50, 85, 94)';
        context.fillRect(0,0, canvas.width, canvas.height);


        //Player can't die if they haven't scored
        if(game.over == true && bottomScore < combinedScore){
                modal.style.display = 'block';
                return;
        }else if (game.over == true){
            gameOver.style.display = 'block';
            return;
        }
        
        if(combinedScore > 0){
            instruct.style.display = 'none';
        }

        combinedScore = score + words[0].getScore();
            if(combinedScore < prevScore){
                combinedScore = prevScore;
                score = prevScore;
            }else {
                prevScore = score + words[0].getScore();
            }
        
            if(combinedScore > topScore){
                topScoreDisplay.innerHTML = combinedScore;
            }
            scoreDisplay.innerHTML = combinedScore;

        
        setTimeout(() => {
            if(words[0].letters.length == 0){
                words.push(new Word(context, scaleFactor, maxLetters, canvas, projectiles, letterProjectiles, images, wordSpeed));
                words.splice(0, 1);
            
            //
            }else if(words[0].letters[0].position.y >= canvas.height){
                words.push(new Word(context, scaleFactor, maxLetters, canvas, projectiles, letterProjectiles, images, wordSpeed));
                words.splice(0, 1);
                fireRate *= .8;
                
                if(wordSpeed < 10){
                    wordSpeed *= 1.2;
                }
            }
    
        }, 100);


        frame += 1;



        player.update();
        explosion.update();

        let random = getRandomInt(2);

        words.forEach((word, wordIndex)=>{
            word.update();
            
            if (random == wordIndex){
                if(frame % 100 === 0 && word.letters.length > 0 && word.position.y <= 500){
                    word.letters[Math.floor(Math.random() * word.letters.length)].shoot(letterProjectiles)                 
                }
                
            }
                
        })

        
        letterProjectiles.forEach((letterProjectile, letterProjectileIndex)=>{

            if(letterProjectiles.length > 10){
                letterProjectiles.splice(0, 1);
            }
            letterProjectile.update();

            //   make letter projectiles wrap around
            setTimeout(() => {
                if(letterProjectile.position.y >= canvas.height){

        
                    letterProjectile.position.y = 0;
        
                }
                // Player gets hit by enemy projectiles

                    if (combinedScore > 0){
                        if(letterProjectile.position.y + letterProjectile.height >= player.position.y  &&
                            letterProjectile.position.x + letterProjectile.width >= player.position.x &&
                            letterProjectile.position.x <= player.position.x + player.width){ 
                                setTimeout(() => {
                                    game.over = true;
                                    //player.scale = 0;
                                    letterProjectiles.splice(letterProjectileIndex, 1); 
                                }, 500); 
                            
                        }
                    }      
                
            }, 100);
        
            
            
        })

        
        projectiles.forEach((projectile, projectileIndex) =>{
            projectile.update();

        
            //letterProjectile hit by player projectile
            letterProjectiles.forEach((letterProjectile, letterProjectileIndex)=>{
                setTimeout(() => {

                    const letterProjectileFound = letterProjectiles.find(letterProjectile2 =>{
                        return letterProjectile2 === letterProjectile
                    })

                    if(projectile.position.y <= letterProjectile.position.y + letterProjectile.height &&
                        projectile.position.y >= letterProjectile.position.y &&
                        projectile.position.x + projectile.width >= letterProjectile.position.x &&
                        projectile.position.x <= letterProjectile.position.x + letterProjectile.width){
                        projectiles.splice(projectileIndex, 1)

                        if (letterProjectileFound){
                            letterProjectiles.splice(letterProjectileIndex, 1)
                            score += 50;
                        }
                        
                        explosion.frameX = 0
                        explosion.scaleFactor = 1;
                        explosion.position.x = letterProjectile.position.x + letterProjectile.width/2 - explosion.width/2;
                        explosion.position.y = letterProjectile.position.y + letterProjectile.height/2 - explosion.height/2;
                    
                        //sets duration of explosion
                        setTimeout(() => {
                            explosion.frameX = 0;
                            explosion.scaleFactor = 0;
                        },600);

                    

                    }

                    if(projectile.position.y + projectile.height <= 0){

                        projectiles.splice(projectileIndex, 1)
                    }

                }, 100);    
            })
                    
            
        })  

    
        if (keys.a.pressed && player.position.x > 0){
            player.velocity.x = -7;
        }else if (keys.d.pressed && player.position.x + player.width <= canvas.width){
            player.velocity.x = 7;
        }else{
            player.velocity.x = 0;
        }

        if (gameIsOn == true){
            requestAnimationFrame(animate);
        }


        

}
    





addEventListener('keydown', ({key})=>{

    switch(key){
        case 'a':
            keys.a.pressed = true;
            break
        case 'd':
            keys.d.pressed = true;
            break
        case ' ':
            keys.space.pressed = true; 
            player.frameY = 1;
            player.numFrames = 5;
            break

}
})

addEventListener('keyup', ({key})=>{ 
   
  

    switch(key){
        case 'a': 
            keys.a.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
        case ' ':
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width/4 + 10,
                    y: player.position.y
                   
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
            }, 200);
           
            break

        case ' ':
            keys.space.pressed = false;
        break
}
})

scoreForm.addEventListener("submit", function (e) {
    //e.preventDefault();
        getData(e.target).then((name)=>{
            postTopScore(name.name);
        }); 
        
      
});




function getTopScore(){
    const options2 = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
    }
    
        fetch('/api', options2).then((response)=>{
        
                response.json().then((newData)=>{
                    topScoreDisplay.innerHTML = newData[0].combinedScore;
                    topScore = newData[0].combinedScore;
                    bottomScore = newData[9].combinedScore;
                })

            
        });
    
}



     

function scaleGame (){
    if(window.innerWidth < 800){
        scaleFactor = .75
    }else{
        scaleFactor = 1
    }
    return scaleFactor;
}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  
async function postTopScore(name){
   
    setTimeout(() => {
        modal.style.display = 'block';
        //data sent is JS object
        const data = { combinedScore, name}
        const options1 = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },

            //body needs to be converted to a JSON string
            body: JSON.stringify(data),
        }
    
        fetch('/api', options1);

        modal.style.display = 'none';
        
    }, 0);
    
}

async function getData(form) {
    let formData = new FormData(form);
    return Object.fromEntries(formData)
}


function testAnimOn(){
    if(aboutCanvas.width == 0 || aboutCanvas.width < 900){  
        aboutCanvas.width += 45;
    }
    if(aboutCanvas.width == 900){
        return
    }

    requestAnimationFrame(testAnimOn)
}

function testAnimOff(){
    if(aboutCanvas.width == 900 || aboutCanvas.width > 0){  
        aboutCanvas.width -= 45;
    }
    if(aboutCanvas.width  == 0) {
        return
    }

    requestAnimationFrame(testAnimOff)
}
function codeAnimOn(){
    if(codeCanvas.width == 0 || codeCanvas.width < 900){  
        codeCanvas.width += 45;
    }
    if(codeCanvas.width == 900){
        return
    }

    requestAnimationFrame(codeAnimOn)
}

function codeAnimOff(){
    if(codeCanvas.width == 900 || codeCanvas.width > 0){  
        codeCanvas.width -= 45;
    }
    if(codeCanvas.width  == 0) {
        return
    }

    requestAnimationFrame(codeAnimOff)
}

