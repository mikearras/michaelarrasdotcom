

function animate(){

    if(removeCanvas == true){
        canvas.width -= 45;
    
        if (canvas.width < 50){
            canvas.width = 0;
            scoreInfo.style.display = 'none'
            removeCanvas = false;
        }
        if (canvas.width == 0){
            canvas.style.display = 'none';
            aboutCanvas.style.display = 'block';    
        }  
       
    }

    if(canvas.width == 0 && aboutCanvas.width < 900){
        aboutCanvas.width += 45;    
    }

    if(aboutCanvas.width == 900){
        return
    }


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

    requestAnimationFrame(animate);
};


