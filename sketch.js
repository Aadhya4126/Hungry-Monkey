var monkey, monkey_running;
var ground;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var banana, obstacle;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {

  //animation for monkey
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  //images for banana and obstacle
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(500, 500);

  //create monkey
  monkey = createSprite(80, 350, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.13;

  //create moving ground
  ground = createSprite(250, 350, 900, 10);
  ground.velocityX = -4;

  //making groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();

}

function draw() {
  background("cyan");

  if (gameState === PLAY) {

    food();
    obstacle();

    //moving ground
    if (ground.x < 200) {
      ground.x = 250;
    }

    //jumping the monkey
    if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -10;
    }

    //giving gravity to monkey 
    monkey.velocityY = monkey.velocityY + 0.5;
    monkey.collide(ground);


    stroke("white");
    textSize(18);
    fill("white");
    text("Score: " + score, 300, 50);

    stroke("black");
    textSize(18);
    fill("black");
    survivalTime = Math.ceil(frameCount / frameRate());
    text("Survival Time: " + survivalTime, 30, 50);

    //ncrease score
    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      score = score + 1;
    }

    //changing gameState
    if (monkey.isTouching(obstacleGroup)) {
      obstacleGroup.destroyEach();
      gameState = END;
    }
  }

  if (gameState === END) {
    FoodGroup.destroyEach();
    monkey.x = 1000;
    ground.x = 1000;
    textSize(30);
    text("Game", 170, 190);
    textSize(30);
    text("Over", 175, 250);
  }
  drawSprites();
}

function food() {
  if (frameCount % 90 === 0) {
    banana = createSprite(550, Math.round(random(150, 200)), 20, 20)
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.15;
    banana.liIfetiIme = 300;
    banana.setCollider("circle", 0, 0, 155);
    FoodGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 300 === 0) {
    obstacles = createSprite(550, 315, 20, 20)
    obstacles.addImage(obstacleImage);
    obstacles.velocityX = -5;
    obstacles.scale = 0.14;
    obstacles.lifetime = 300;
    obstacleGroup.add(obstacles);
  }
}