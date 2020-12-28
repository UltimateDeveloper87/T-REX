var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstacles
var obstaclesGroup
var o1,o2,o3,o4,o5,o6;
var score
var gameState="Start"
var gameOver
var restart
var gameOverImage
var restartImage
var checkPoint
var die
var jump


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  o1=loadImage("obstacle1.png")
  
  o2=loadImage("obstacle2.png")
  
  o3=loadImage("obstacle3.png")
  
  o4=loadImage("obstacle4.png")
  
  o5=loadImage("obstacle5.png")
  
   o6=loadImage("obstacle6.png")
  
  gameOverImage=loadImage("gameOver.png")
  
  restartImage=loadImage("restart.png")
  
  jump=loadSound("jump.mp3")
  
  die=loadSound("die.mp3")
  
  checkPoint=loadSound("checkPoint.mp3")
  
  
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  
  trex.addAnimation("collided",trex_collided)
  
  trex.scale = 0.5;
  
  gameOver=createSprite(250,100,10,10)
  
  restart=createSprite(500,100,10,10)
  
  gameOver.addImage("gameOverImage",gameOverImage)
  
  restart.addImage("restartImage",restartImage)
  
  gameOver.visible=false
  
  restart.visible=false
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score=0
  
  obstaclesGroup=createGroup()
  cloudsGroup=createGroup()
  
}

function draw() {
  background("red");
  
  ground.velocityX = - (4*2*(score/100));
  
  textSize(25)
  text("score "+score,250,20)
  if (gameState=="Start"){
    
     score=score+Math.round(getFrameRate()/30)
    
    if(score>0 && score%100==0)
      checkPoint.play();
    
    if(keyDown("space")&& trex.y >= 120) {
    trex.velocityY = -10;
      jump.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
   
    spawnClouds();
  drawObstacles()
    
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(obstaclesGroup.isTouching (trex)){
      console.log("gameover")
      gameState="stop"
      gameOver.visible=true
    restart.visible=true
      die.play();
      
    }
  }
   else if(gameState=="stop")
{
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  ground.velocityX=0
  trex.velocityY=0
  trex.changeAnimation("collided",trex_collided)
  if(mousePressedOver(restart)){
    gameState="Start"
    gameOver.visible=false
    restart.visible=false
    obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
    trex.changeAnimation("running", trex_running);    
    score=0
    
  }
}
  
  
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 180
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud)
    }
}

function drawObstacles()
{
  if (frameCount % 100 === 0) {
    obstacles = createSprite(600,170,40,10);
    var randomVariable=Math.round(random(1,6))
    switch(randomVariable){
      case 1:obstacles.addImage("o1",o1);break;
      case 2:obstacles.addImage("o2",o2);break;
      case 3:obstacles.addImage("o3",o3);break;
      case 4:obstacles.addImage("o4",o4);break;
      case 5:obstacles.addImage("o5",o5);break;
      case 6:obstacles.addImage("o6",o6);break;
    }
        obstaclesGroup.add(obstacles)
    obstacles.scale = 0.4;
    obstacles.velocityX =-(4+2*(score/100));
  }
}


