var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
  bgReady = true;
};
bgImage.src = "images/background.jpg";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
  heroReady = true;
};
heroImage.src = "images/barbarian.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
  monsterReady = true;
};
monsterImage.src = "images/goblin.png";


var hero = {
  speed: 192
};
hero.x = canvas.width / 2;
hero.y = canvas.height / 2;

var enemyYPositions = [];
var enemyXPositions = [];
var monster = {};
var monstersCaught = 0;

var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false);

var update = function(modifier) {
  if (38 in keysDown || 87 in keysDown) {
    hero.y -= hero.speed * modifier;
    if (hero.y <= 0) {
      hero.y = 0;
    }
  }

  if (40 in keysDown || 83 in keysDown) {
    hero.y += hero.speed * modifier;
    if (hero.y >= 420) {
      hero.y = 420;
    }
  }
  if (37 in keysDown || 65 in keysDown) {
    hero.x -= hero.speed * modifier;
    if (hero.x <= 0) {
      hero.x = 0;
    }
  }
  if (39 in keysDown || 68 in keysDown) {
    hero.x += hero.speed * modifier;
    if (hero.x >= 460) {
      hero.x = 460;
    }
  }

};

var render = function() {
  if (Math.random() < 1/100)
    {
  enemyYPositions.push(0);
    enemyXPositions.push(Math.random() * 460);
    }
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }  
var currentEnemyNumber = 0;
var numberOfEnemies = enemyXPositions.length;
  while (currentEnemyNumber < numberOfEnemies) {
        enemyYPositions[currentEnemyNumber] = enemyYPositions[currentEnemyNumber] + 1;
        currentEnemyNumber = currentEnemyNumber + 1;
    }
    currentEnemyNumber = 0;
    while (currentEnemyNumber < numberOfEnemies) {
        ctx.drawImage(monsterImage, enemyXPositions[currentEnemyNumber], enemyYPositions[currentEnemyNumber]);
        currentEnemyNumber = currentEnemyNumber + 1;
    }
    currentEnemyNumber = 0;
    while (currentEnemyNumber < numberOfEnemies) {
        if (((hero.x < enemyXPositions[currentEnemyNumber] && enemyXPositions[currentEnemyNumber] < hero.x + 30) || (enemyXPositions[currentEnemyNumber] < hero.x && hero.x < enemyXPositions[currentEnemyNumber] + 30)) && ((hero.y < enemyYPositions[currentEnemyNumber] && enemyYPositions[currentEnemyNumber] < hero.y + 33) || (enemyYPositions[currentEnemyNumber] < hero.y && hero.y < enemyYPositions[currentEnemyNumber] + 30))) {
            monstersCaught++;
            enemyYPositions[currentEnemyNumber] = 0;
            enemyXPositions[currentEnemyNumber] = (Math.random() * 460);
        }
        currentEnemyNumber = currentEnemyNumber + 1;
    }

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseLine = "top";
  ctx.fillText("Monsters Defeated: " + monstersCaught, 32, 32);
};

var main = function() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();
  then = now;
  requestAnimationFrame(main);



  monster.x = monster.x - 2;
  };

var then = Date.now();
main();
