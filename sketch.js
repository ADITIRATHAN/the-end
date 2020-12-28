var PLAY = 1;
var END = 0;
gameState = PLAY;

var monkey , monkey_running,monkeydie,die;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var score, survialTime;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //die = loadAnimation("sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(50,285,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(70, 350, 29800, 10);
  ground.velocityX = -1;
  ground.x=ground.width/2;
  
   
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
}


function draw() {
  // monkey.debug=true
  //background    
  background("white")
  
  survivalTime = survivalTime+1;
  
  stroke("black");
    fill("black");
      textSize(20);
  
  text("SurvivalTime:"+  survivalTime, 100, 50);
  
   stroke("black");
    fill("black");
      textSize(20);
  text("score:"+score,300,100);

  monkey.collide(ground);
  
  

  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    score = score + Math.round(getFrameRate()/300);
    survialTime= survialTime + Math.round(getFrameRate()/300);
    
    ground.velocityX = -4;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
    
    if(keyDown("space")) {
        monkey.velocityY = -8;
    } 
    
    if(foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score+2;
    }
    
     monkey.velocityY = monkey.velocityY + 0.8;
    
    obstacleGroup.setLifetimeEach(-1);
    
    food();
  obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
    }
  }
  
  if (gameState === END) {
     obstacleGroup.destroyEach();
    foodGroup.destroyEach();
     survivalTime.visible = false;
     stroke("red");
    fill("red");
       textSize(30);
  text("GAME OVER 🐵", 90, 180);
     
      stroke("black");
    fill("red");
       textSize(30);
     text("MONKEY HAS FAINTED😑",25,220);
    
   
    
   }
  
  drawSprites();
}

function food() {
  if(frameCount % 80 === 0){
    banana = createSprite(400,350,40,10);
    banana.addImage("banana",bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    foodGroup.add(banana);
     }
}

function obstacles() {
  if(frameCount % 300 === 0 ){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }
}




