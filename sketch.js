let timer = 60;
let gameState = 0;
let font;
var buttonsPlayer1 = [];
var buttonsPlayer2 = [];
var img;
var img2;
var activeButtonIndexPlayer1 = -1;
var activeButtonIndexPlayer2 = -1;
var litButtonIndex = -1; // Keep track of the index of the lit up button
var scorePlayer1 = 0; // Player 1 score
var scorePlayer2 = 0; // Player 2 score

//sounds
let p1UD, p1LR, p2UD, p2LR, buzz;



function preload() {
  font = loadFont('Teko-VariableFont_wght.ttf');
//default buttons
img = loadImage("p1 uparrow1.png");
img2 = loadImage("p1 downarrow1.png");
img3 = loadImage("p1 rightarrow1.png");
img4 = loadImage("p1 leftarrow1.png");
img5 = loadImage("p2 uparrow1.png");
img6 = loadImage("p2 downarrow1.png");
img7 = loadImage("p2 leftarrow1.png");
img8 = loadImage("p2 rightarrow1.png");
//lit up buttons
img9 = loadImage("p1 uparrow2.png");
img10 = loadImage("p1 downarrow2.png"); //test as an alternative placeholder for other buttons
img11 = loadImage('p1 rightarrow2.png');
img12 = loadImage('p1 leftarrow2.png');
img13 = loadImage('p2 uparrow2.png');
img14 = loadImage('p2 downarrow2.png');
img15 = loadImage('p2 rightarrow2.png');
img16 = loadImage('p2 leftarrow2.png');
//Mascot images
img17 = loadImage ('p1WinMascot.png');
img18 = loadImage ('p1LoseMascot3.png');
img19 = loadImage ('p2WinMascot.png');
img20 = loadImage ('p2LoseMascot.png');

//gamestates
img21 = loadImage ('start screen.png');
img22 = loadImage ('player 1 win screen.png');
img23 = loadImage ('player 2 win screen.png');
img24 = loadImage ('tie screen.png');
//sounds
p1UD = loadSound('ding.wav');
p1LR = loadSound('bing.wav');
p2UD = loadSound('bonk.wav');
p2LR = loadSound('glass.wav');
buzz = loadSound('buzz.flac')

}




function setup() {
  createCanvas(800, 700); // Extended canvas width to accommodate both players
  var buttonSize = 100; // Size of each button
  var padding = 30; // Padding between buttons
 
  // Positions for D-pad layout for player 1
  var player1CenterX = width / 4;
  var centerY = height / 2;
  var player1TopX = player1CenterX - buttonSize / 2;
  var player1TopY = centerY - buttonSize - padding;
  var player1BottomX = player1CenterX - buttonSize / 2;
  var player1BottomY = centerY + padding;
  var player1LeftX = player1CenterX - buttonSize - padding;
  var player1LeftY = centerY - buttonSize / 2;
  var player1RightX = player1CenterX + padding;
  var player1RightY = centerY - buttonSize / 2;
 
  // Create buttons for each direction for player 1
  buttonsPlayer1.push(new Button(player1TopX, player1TopY, img, img9));
  buttonsPlayer1.push(new Button(player1BottomX, player1BottomY, img2, img10));
  buttonsPlayer1.push(new Button(player1LeftX, player1LeftY, img4, img12));
  buttonsPlayer1.push(new Button(player1RightX, player1RightY, img3, img11));
  
  // Positions for D-pad layout for player 2 (on the right side)
  var player2CenterX = width * 3 / 4;
  var player2TopX = player2CenterX - buttonSize / 2;
  var player2TopY = centerY - buttonSize - padding;
  var player2BottomX = player2CenterX - buttonSize / 2;
  var player2BottomY = centerY + padding;
  var player2LeftX = player2CenterX - buttonSize - padding;
  var player2LeftY = centerY - buttonSize / 2;
  var player2RightX = player2CenterX + padding;
  var player2RightY = centerY - buttonSize / 2;
 
  // Create buttons for each direction for player 2
  buttonsPlayer2.push(new Button(player2TopX, player2TopY, img5, img13));
  buttonsPlayer2.push(new Button(player2BottomX, player2BottomY, img6, img14));
  buttonsPlayer2.push(new Button(player2LeftX, player2LeftY, img7, img16));
  buttonsPlayer2.push(new Button(player2RightX, player2RightY, img8, img15));
  }
  




function draw() {
  background(255);
  if (gameState == 0) {
    mainMenu();
  } else if (gameState == 1) {
    gameActive();
  } else if (gameState == 2) {
    p1Win();
  } else if (gameState == 3) {
    p2Win();
  } else if (gameState == 4) {
    playerTie();
  }
}




function mainMenu() {
  background(20);
  image(img21, -290, -300, 1370, 1000);
  textFont(font);
  textAlign(CENTER);
  textSize(30);
  fill(255);
  text("PRESS SPACE TO START THE GAME", width / 2, height / 2);
}




function gameActive() {
  background(0);
  fill(255);
  textSize(30);
  textAlign(CENTER);
 


  // Code for timer
  text("Time:", 320, 60);
  text(timer, 400, 60);

  
 
  // Player 1 Score
  textSize(20);
  text("Player 1 Score:", 130, 120);
  text(scorePlayer1, 230, 120);
 
  // Player 2 Score
  text("Player 2 Score:", 520, 120);
  text(scorePlayer2, 620, 120);

  // //Mascot images
  // image(img17, 120, 563);
  // image(img18, 120, 563, 225, 275);
  // image(img19, 650, 565, 250, 300);

  //Mascot images
  if (scorePlayer1 > scorePlayer2) {
    // Player 1 is winning, display p1WinMascot
    image(img17, 120, 563);
    image(img20, 650, 565, 240, 280);//p2 lose

  
  } else if (scorePlayer2 > scorePlayer1) {
    // Player 2 is winning, display p2WinMascot
    image(img18, 120, 563, 225, 275); // Display p1WinMascot for Player 1
  image(img19, 650, 565, 250, 300);
  } else {
    // Scores are tied, display default mascots
    image(img17, 120, 563); // p1WinMascot
    image(img19, 650, 565, 250, 300); // p2WinMascot
  }

  // Decrease timer
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }
 
  // Show lit up buttons for player 1
  for (var i = 0; i < buttonsPlayer1.length; i++) {
    buttonsPlayer1[i].show(i === litButtonIndex);
  }
 
  // Show lit up buttons for player 2
  for (var j = 0; j < buttonsPlayer2.length; j++) {
    buttonsPlayer2[j].show(j === litButtonIndex);
  }


  // Check for end conditions
  if (timer === 0) {
    if (scorePlayer1 > scorePlayer2) {
      // Player 1 wins
      gameState = 2; // Transition to player 1 win state
    } else if (scorePlayer2 > scorePlayer1) {
      // Player 2 wins
      gameState = 3; // Transition to player 2 win state
    } else if(scorePlayer1 === scorePlayer2) {
      // It's a tie
      // You can handle tie state here if needed
      gameState = 4;
    }
  }
  

}




// Function to randomly select a button to light up
function lightUpRandomButton() {
  litButtonIndex = Math.floor(random(buttonsPlayer1.length));
  for (var i = 0; i < buttonsPlayer1.length; i++) {
    buttonsPlayer1[i].litState = (i === litButtonIndex);
  }
}




// Function to handle button clicks for player 1
function handleClickPlayer1() {
  if (litButtonIndex !== -1 && activeButtonIndexPlayer1 === litButtonIndex) {
    // User hit the lit up button for player 1
    scorePlayer1++; // Increase player 1 score
    
 // Player one sound plays if arrow key matches lit up button   
  if (keyCode === UP_ARROW && litButtonIndex === 0 ) {
    p1UD.play();
  } else if (keyCode === DOWN_ARROW && litButtonIndex === 1 ) {
    p1UD.play();
  } else if (keyCode === LEFT_ARROW && litButtonIndex === 2 ) {
    p1LR.play();
  } else if (keyCode === RIGHT_ARROW && litButtonIndex === 3) {
     p1LR.play();
  } 
   
    lightUpRandomButton(); // Light up another random button
  }
}

 
  

// Function to handle button clicks for player 2
function handleClickPlayer2() {
  if (litButtonIndex !== -1 && activeButtonIndexPlayer2 === litButtonIndex) {
    // User hit the lit up button for player 2
    scorePlayer2++; // Increase player 2 score
    
    // Player two sound plays if arrow key matches lit up button 
 if (keyCode === 87 && litButtonIndex === 0 ) {
    p2UD.play();
  } else if (keyCode === 83 && litButtonIndex === 1 ) {
    p2UD.play();
  } else if (keyCode === 65 && litButtonIndex === 2 ) {
    p2LR.play();
  } else if (keyCode === 68 && litButtonIndex === 3)
    p2LR.play();    

    lightUpRandomButton(); // Light up another random button
  }
}




function keyReleased() {
  // Start the game when space is pressed
  if (gameState == 0 && keyCode == 32) {
    gameState = 1;
    lightUpRandomButton(); // Start the game by lighting up a random button
  } else if (keyCode == 82 && gameState == 2) {
    gameActive();
    timer = 5;
  } else if (keyCode == 82 && gameState == 3) {
    gameActive();
    timer = 5;
  }
}




function keyPressed() {
  if (keyCode === UP_ARROW) {
    activeButtonIndexPlayer1 = 0;
    handleClickPlayer1();
  } else if (keyCode === DOWN_ARROW) {
    activeButtonIndexPlayer1 = 1;
    handleClickPlayer1();
  } else if (keyCode === LEFT_ARROW) {
    activeButtonIndexPlayer1 = 2;
    handleClickPlayer1();
  } else if (keyCode === RIGHT_ARROW) {
    activeButtonIndexPlayer1 = 3;
    handleClickPlayer1();
  } else if (keyCode === 87) {
    activeButtonIndexPlayer2 = 0; // W for player 2's UP button
    handleClickPlayer2();
  } else if (keyCode === 83) {
    activeButtonIndexPlayer2 = 1; // S for player 2's DOWN button
    handleClickPlayer2();
  } else if (keyCode === 65) {
    activeButtonIndexPlayer2 = 2; // A for player 2's LEFT button
    handleClickPlayer2();
  } else if (keyCode === 68) {
    activeButtonIndexPlayer2 = 3; // D for player 2's RIGHT button
    handleClickPlayer2();
  }
  
  
  //Code for buzzer if wrong key is pressed
  // if (litButtonIndex != activeButtonIndexPlayer1 ) {
  //   buzz.play();
  // } 

    
}
  
  





function p1Win() {
  background(255, 0, 0); // Red background for player 1 win
  textSize(50);
  image(img22, 500, 350, 1050, 800);
  textAlign(CENTER);
  fill(255);
  text("Player 1 Wins!", width / 2, height / 2);
  text("Rematch?", 400, 400);
}




function p2Win() {
  background(0, 0, 255); // Blue background for player 2 win
  image(img23, 500, 350, 1050, 800);
  textSize(50);
  textAlign(CENTER);
  fill(255);
  text("Player 2 Wins!", width / 2, height / 2);
  text("Rematch?", 400, 400);
}

function playerTie() {
  background(0);
  image(img24, 400, 350, 850, 700);
  textSize(50);
  textAlign(CENTER);
  fill(255);
  text("Players Tied!", width / 2, height / 2);
  text("Rematch?", 400, 400);
}



class Button {
  constructor(x, y, img, activeImg) {
  this.x = x;
  this.y = y;
  this.img = img; // Image of the button
  this.activeImg = activeImg;
  this.litState = false; // Keep track of whether the button is lit up
  }
  



  show(active) {
    imageMode(CENTER);
    if (active) {
    image(this.activeImg, this.x, this.y, 200, 200); // Display the lit up image
    } else {
    image(this.img, this.x, this.y, 150, 150); // Display the button image
    }
    }
    }
    
