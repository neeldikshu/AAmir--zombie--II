const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground,left,right,bridge,jointLink,joint;
var stones = [];  
var bg_img;
var button_img;
var zombie1,zombie2,zombie3,zombie4,zombie;
function preload(){
bg_img = loadImage("background.png");
zombie1 = loadImage("zombie1.png")
zombie2 = loadImage("zombie2.png")
zombie3 = loadImage("zombie3.png")
zombie4 = loadImage("zombie4.png")
button_img = loadImage("axe.png")
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(width/2,height-20,width,20)
  left = new Base(200,height/2,400,100)
  right = new Base(width-200,height/2,400,100)
  bridge = new Bridge(30, { x: 50, y: height / 2 - 140 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

zombie = createSprite(width/2,height-100)
//zombie.addImage(zombie1);
zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
zombie.scale=0.1;
zombie.velocityX=-10;

breakButton = createImg("axe.png");
 breakButton.position(width - 200, height / 2 - 50);
 //breakButton.class("breakbutton");
 breakButton.mousePressed(handleButtonPress);

for (var i = 0; i <= 8; i++) {
  var x = random(width / 2 - 100, width / 2 + -200); 
  var y = random(-40, 110);
  var stone = new Stone (x, y, 80, 80);
  stones.push(stone);
  }
}

function draw() {
  background(bg_img);

  Engine.update(engine);
//rectMode(CENTER)

  //ground.display();
 // left.display();
  //right.display();
  bridge.show();
  
  for (var stone of stones) {
    stone.display();
  }
  if (zombie.position.x >= width - 300) {
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300) {
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }
  // stone.display();

 

  drawSprites();
}

function handleButtonPress() {
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}