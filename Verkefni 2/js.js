//bý til canvasinn
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//set inn myndirnar sem eru notaðar en loada þeim ekki strax
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
};
bgImage.src = "images/background.jpg";

var playerReady = false;
var playerImage = new Image();
playerImage.onload = function() {
  playerReady = true;
};
playerImage.src = "images/barbarian.png";

var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function() {
  enemyReady = true;
};
enemyImage.src = "images/goblin.png";

//set hve hratt spilarinn hreyfist og læt hann byrja í miðjunni á canvasinu
var player = {
  speed: 192
};
player.x = canvas.width / 2;
player.y = canvas.height / 2;

//arrays fyrir enemy positions
var enemyYPositions = [];
var enemyXPositions = [];

//score
var enemiesDefeated = 0;
//object fyrir keypress
var keysDown = {};

//event listeners fyrir keydown og keyup
addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

//notar keypress til að hreyfa characterinn
var update = function(modifier) {
  if (38 in keysDown || 87 in keysDown) {
    player.y -= player.speed * modifier;
    if (player.y <= 0) {
      player.y = 0;
    }
  }
  if (40 in keysDown || 83 in keysDown) {
    player.y += player.speed * modifier;
    if (player.y >= 420) {
      player.y = 420;
    }
  }
  if (37 in keysDown || 65 in keysDown) {
    player.x -= player.speed * modifier;
    if (player.x <= 0) {
      player.x = 0;
    }
  }
  if (39 in keysDown || 68 in keysDown) {
    player.x += player.speed * modifier;
    if (player.x >= 460) {
      player.x = 460;
    }
  }

};

//function til að rendera allt
var render = function() {
  //ef random talan er minna en 1/100 þá setur þetta random position inní array
  if (Math.random() < 1/100)
    {
      enemyYPositions.push(0);
      enemyXPositions.push(Math.random() * 460);
    }
    //ef background imagið er loadað þá renerast það
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  //ef player imagið er loadað þá renerast það
  if (playerReady) {
    ctx.drawImage(playerImage, player.x, player.y);
  }
var currentEnemyNumber = 0;
var numberOfEnemies = enemyXPositions.length;//það eru jafn margir enemies og það eru hnit í arrayinu
  while (currentEnemyNumber < numberOfEnemies) {
        enemyYPositions[currentEnemyNumber] = enemyYPositions[currentEnemyNumber] + 1;
        currentEnemyNumber = currentEnemyNumber + 1;
    }
    //á meðan það eru minni enemies en það eru í arrayinu þá býr þetta til enemy með hnitin úr array
    currentEnemyNumber = 0;
    while (currentEnemyNumber < numberOfEnemies) {
        ctx.drawImage(enemyImage, enemyXPositions[currentEnemyNumber], enemyYPositions[currentEnemyNumber]);
        currentEnemyNumber = currentEnemyNumber + 1;
    }
    //ef playerinn snertir enemy þá hækkar scorið um 1 og enemy-inn fer á random stað efst í canvasinu
    currentEnemyNumber = 0;
    while (currentEnemyNumber < numberOfEnemies) {
        if (((player.x < enemyXPositions[currentEnemyNumber] && enemyXPositions[currentEnemyNumber] < player.x + 30) || (enemyXPositions[currentEnemyNumber] < player.x && player.x < enemyXPositions[currentEnemyNumber] + 30)) && ((player.y < enemyYPositions[currentEnemyNumber] && enemyYPositions[currentEnemyNumber] < player.y + 33) || (enemyYPositions[currentEnemyNumber] < player.y && player.y < enemyYPositions[currentEnemyNumber] + 30))) {
            enemiesDefeated++;
            enemyYPositions[currentEnemyNumber] = 0;
            enemyXPositions[currentEnemyNumber] = (Math.random() * 460);
        }
        currentEnemyNumber = currentEnemyNumber + 1;
    }
    //skrifar út scorið
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Times New Roman";
  ctx.textAlign = "left";
  ctx.textBaseLine = "top";
  ctx.fillText("Enemies Defeated: " + enemiesDefeated, 32, 32);
};
//loopa sem refreshar canvasið stanslaust
var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();
  then = now;
  requestAnimationFrame(main);
  };

var then = Date.now();
main();
