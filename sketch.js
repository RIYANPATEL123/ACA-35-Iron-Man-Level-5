//global variable declaration 
var bg, backgroundImg;
var stoneImage , stoneGroup;
var diamondGroup , diamondImg;
var score=0;
var spikesgroup , spikesImg;

//create a canvas where we can place anything
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironmanImg = loadImage("images/iron.png");
  stoneImg = loadImage("images/stone.png")
  diamondImg = loadImage("images/diamond.png")
  spikesImg = loadImage("images/spikes.png")


 }

//function helps to change the object which is placed
function setup() {
  createCanvas(1000, 600);

  //creats background
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale = 2;


  //create ironman
  ironman = createSprite(200,400,20,20);
  ironman.addImage(ironmanImg);
  ironman.scale = 0.3;
  ironman.debug=true;
  ironman.setCollider("rectangle",100,0,200,400)

  //create a ground where ironma can stand
  ground = createSprite(200,600,400,100);
  ground.visible = false;

  //creates new groups 
  stoneGroup = new Group ();
  diamondGroup = new Group();
  spikesGroup = new Group();


}


function draw() {
  //creats infinte scroll
  bg.velocityY = 4;
  if(bg.y>500)

  //helps to move ironman anywhere
  bg.y = bg.width/4;
  if (keyDown("up")) {
    ironman.velocityY = -10;

  } 
  if (keyDown("left")) {
    ironman.x = ironman.x - 5;
  }
    

  if (keyDown("right")) {
    ironman.x = ironman.x + 5;

  } 
  if (keyDown("down")) {
    ironman.velocityY =  5;

  } 


  //controls velocity of ironman 
  ironman.velocityY = ironman.velocityY + 0.5;
  ironman.collide(ground);

   generateStone ()
   for (var i = 0;i < (stoneGroup).length ;i++ ){
     var temp = (stoneGroup).get(i);

     //helps to stand ironman on ground 
     if(temp.isTouching(ironman)){
      ironman.collide(temp);

     }
       
     
   }
   
   generatespikes ()
   for (var i = 0; i < spikesGroup.length; i++){
     var temp = spikesGroup.get(i);

     //creates spikes 
     if (temp.isTouching(ironman)){
       score=score-5;
       temp.destroy();
       temp = null;
     } 
   } 
   generatediamonds ()
   for (var i = 0; i < diamondGroup.length; i++ ){
     var temp = diamondGroup.get(i);

    //create diamonds 
     if (temp.isTouching(ironman)){
       score++;
       temp.destroy();
       temp = null;
     }
   }

   
 
  
    //helps to draw the object 
    drawSprites();
    textSize(20);
    fill("brown");

    //calculates diamonds collected 
    text ("Diamonds Collected: " + score,500,50)
    
   
}

//funtion creats stone 
function generateStone (){
  if (frameCount  % 50 === 0 ){
    var stone =  createSprite(200,550,150,10)

    //generate stones  at random
    stone.y = random(0,500);
    stone.x = random(0,500);
    stone.addImage(stoneImg)
    stone.velocityY = -6;
    stone.scale = 1;
    stone.lifetime = 250;
    stoneGroup.add(stone);
  }

}

//funtion create diamonds  
function generatediamonds(){
  if (frameCount % 50 == 0){
      var diamond = createSprite(200,1200,40,10);
      diamond.addImage(diamondImg);

      //generates diamonds at random
      diamond.y = Math.round(random(80,350));
      diamond.scale = 0.5;
      diamond.velocityY = -5;
      diamond.lifetime = 1200;
      diamondGroup.add(diamond);
  }
}

//create spikes 
function generatespikes(){
  if (frameCount % 100 === 0){
    var spikes = createSprite(200,1000,40,10);
    spikes.addImage(spikesImg);

    // generate spikes at random
    spikes.y = Math.round(random(100,300));
    spikes.scale = 0.5;
    spikes.velocityY = 5;
    spikes.lifetime = 1200;
    spikesGroup.add(spikes);
  }
}

