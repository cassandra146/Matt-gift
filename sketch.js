let player;
let coins = [];
let balls = [];
let money = [];
let score = 0;
let gameOver = false;
let gravity = 0.5;
let jumpForce = -10;
let moveSpeed = 5;
let numItems = 12; // Doubled from 6 to 12

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = {
    x: width / 4,
    y: height / 2,
    size: 30,
    velocityY: 0
  };
  
  // Create a larger number of coins (e.g., 50) that won't regenerate
  for (let i = 0; i < 50; i++) {
    coins.push({
      x: random(50, width - 50),
      y: random(50, height / 2),
      size: 15
    });
  }
  
  // Create dollar signs
  for (let i = 0; i < numItems; i++) {
    money.push({
      x: random(50, width - 50),
      y: random(50, height / 2),
      size: 20
    });
  }
  
  // Create tennis balls
  for (let i = 0; i < numItems; i++) {
    balls.push({
      x: i < numItems / 2 ? width : 0, // Half from right to left, half from left to right
      y: random(height),
      size: 20,
      speed: i < numItems / 2 ? random(3, 7) : -random(3, 7) // Random speed, direction based on position
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(135, 206, 235); // Sky blue background
  
  // Draw clouds
  drawClouds();
  
  // Draw the London skyline using shapes
  drawSkyline();
  
  if (!gameOver) {
    // Player movement
    player.velocityY += gravity;
    player.y += player.velocityY;
    
    // Keep player in bounds
    if (player.y > height - player.size) {
      player.y = height - player.size;
      player.velocityY = 0;
    }
    if (player.y < 0) {
      player.y = 0;
      player.velocityY = 0;
    }
    
    // Left/Right movement
    if (keyIsDown(LEFT_ARROW)) {
      player.x -= moveSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      player.x += moveSpeed;
    }
    
    // Keep player within screen bounds
    player.x = constrain(player.x, 0, width - player.size);
    
    // Draw player (stick figure)
    drawStickFigure(player.x, player.y);
    
    // Update and draw coins
    for (let i = coins.length - 1; i >= 0; i--) {
      let coin = coins[i];
      fill(255, 215, 0); // Gold color
      circle(coin.x, coin.y, coin.size);
      
      // Check collision with player
      if (dist(player.x, player.y, coin.x, coin.y) < (player.size + coin.size) / 2) {
        coins.splice(i, 1);
        score++;
      }
    }
    
    // Update and draw dollar signs
    for (let i = money.length - 1; i >= 0; i--) {
      let bill = money[i];
      fill(0, 255, 0); // Green color for dollar sign
      textSize(bill.size);
      text('$', bill.x, bill.y);
      
      // Check collision with player
      if (dist(player.x, player.y, bill.x, bill.y) < (player.size + bill.size) / 2) {
        money.splice(i, 1);
        // Remove one tennis ball
        if (balls.length > 0) {
          balls.splice(0, 1);
        }
      }
    }
    
    // Update and draw tennis balls
    for (let ball of balls) {
      ball.x += ball.speed; // Update position based on speed
      if (ball.x < -ball.size || ball.x > width + ball.size) {
        ball.x = ball.speed > 0 ? 0 : width; // Reset position based on direction
        ball.y = random(height);
      }
      
      fill(220, 255, 0); // Tennis ball color
      circle(ball.x, ball.y, ball.size);
      
      // Check collision with player
      if (dist(player.x, player.y, ball.x, ball.y) < (player.size + ball.size) / 2) {
        gameOver = true;
      }
    }
    
    // Display score and remaining items
    fill(255, 0, 0); // Red color for text
    textSize(24);
    textAlign(CENTER);
    text('Score: ' + score, width / 2, 30);
    text('Coins remaining: ' + coins.length, width / 2, 60);
    text('Dollar signs remaining: ' + money.length, width / 2, 90);
    
    // Check for win condition
    if (coins.length === 0 && money.length === 0) {
      gameOver = true;
    }
    
  } else {
    // Game Over screen
    fill(255, 0, 0); // Red color for text
    textSize(48);
    textAlign(CENTER);
    if (coins.length === 0 && money.length === 0) {
      text('You Win!', width / 2, height / 2);
    } else {
      text('Game Over!', width / 2, height / 2);
    }
    text('Score: ' + score, width / 2, height / 2 + 50);
    text('Press R to restart', width / 2, height / 2 + 100);
  }
}

function drawClouds() {
  fill(255); // White color for clouds
  noStroke();
  
  // Array of cloud positions and sizes
  let clouds = [
    {x: width / 5, y: height / 5, w: 100, h: 60},
    {x: width / 2, y: height / 4, w: 120, h: 70},
    {x: width * 3 / 4, y: height / 6, w: 90, h: 50},
    {x: width / 3, y: height / 3, w: 110, h: 65}
  ];
  
  // Draw clouds
  for (let cloud of clouds) {
    ellipse(cloud.x, cloud.y, cloud.w, cloud.h);
    ellipse(cloud.x + 30, cloud.y + 10, cloud.w, cloud.h);
    ellipse(cloud.x - 30, cloud.y + 10, cloud.w, cloud.h);
  }
}

function drawSkyline() {
  noStroke();
  fill(50); // Dark grey for buildings
  
  // Array of building positions and sizes
  let buildings = [
    {x: width / 12, w: 60, h: 180},
    {x: width / 8, w: 80, h: 250},
    {x: width / 6, w: 100, h: 320},
    {x: width / 4, w: 70, h: 200},
    {x: width / 3, w: 90, h: 280},
    {x: width / 2.5, w: 110, h: 350},
    {x: width / 2, w: 85, h: 230},
    {x: width / 1.8, w: 95, h: 300},
    {x: width / 1.6, w: 75, h: 270},
    {x: width / 1.4, w: 120, h: 400},
    {x: width / 1.2, w: 70, h: 220},
    {x: width / 1.1, w: 90, h: 290}
  ];
  
  // Draw buildings
  for (let building of buildings) {
    rect(building.x, height - building.h, building.w, building.h);
    
    // Add windows to each building
    fill(255, 255, 0); // Solid yellow windows
    let windowSize = 10;
    let spacing = 20;
    for (let wx = building.x + 10; wx < building.x + building.w - 10; wx += spacing) {
      for (let wy = height - building.h + 10; wy < height - 10; wy += spacing) {
        rect(wx, wy, windowSize, windowSize);
      }
    }
    fill(50); // Reset fill for next building
  }
  
  // Ground
  noStroke();
  fill(50);
  rect(0, height - 20, width, 20);
}

function keyPressed() {
  if (key === ' ' && !gameOver) {
    player.velocityY = jumpForce;
  }
  if (key === 'r' && gameOver) {
    // Reset game
    gameOver = false;
    score = 0;
    player.x = width / 4;
    player.y = height / 2;
    player.velocityY = 0;
    coins = [];
    balls = [];
    setup();
  }
}

function drawStickFigure(x, y) {
  stroke(0, 0, 255); // Blue color for stick figure
  strokeWeight(2);
  // Head
  circle(x, y, 20);
  // Body
  line(x, y + 10, x, y + 30);
  // Arms
  line(x - 15, y + 20, x + 15, y + 20);
  // Legs
  line(x, y + 30, x - 10, y + 45);
  line(x, y + 30, x + 10, y + 45);
}