let enemyCharacter = 'enemy-bug.png';
let playerCharacter = 'char-boy.png';

//OBJECT LIST OF ALL PLAYER CHARACTER'S USED IN GAME
let charList = ['char-boy', 'char-cat-girl', 'char-horn-girl', 'char-pink-girl', 'char-princess-girl'];

//SHORTCUTS FOR jQuery SELECTION
let characterSelection = $('#characterSelection');
let ul = document.getElementById('characterSelection');

//CREATE LI ELEMENTS FOR CHARACTER IMAGES
for (let i = 0; i < charList.length; i++) {
    characterSelection.append($('<li class="' + charList[i] + '"><img src="images/' + charList[i] + '.png" /></li>'));
}

ul.addEventListener('click', function(e) {
    playerCharacter = e.target.parentElement.className;
    console.log(playerCharacter);
});

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/' + enemyCharacter;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 500) {
        this.x = -100;
    }

    // check for collision betweeen the player and the enemy
    if(player.x < this.x + 38 && player.x + 38 > this.x && player.y < this.y + 20 && 35 + player.y > this.y) {
        player.playerReset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let playerX = 200;
let playerY = 400;

let Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + playerCharacter;
}

Player.prototype.update = function() {
    if(this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y > 400) {
        this.y = 400;
    } else if (this.y <= 0) {
        player.playerReset();
    }
}

Player.prototype.playerReset = function() {
    this.x = playerX;
    this.y = playerY;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if(key === 'left') {
        this.x -= 100;
    } else if (key === 'right') {
        this.x += 100;
    } else if (key === 'up') {
        this.y -= 83;
    } else if (key === 'down') {
        this.y += 83;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player(200, 400);

for (let i = 0; i < 3; i++) {
    let startSpeed = 40 * Math.floor(Math.random() * 14 + 1);
    allEnemies.push(new Enemy(-100, 65 + (85 * i), startSpeed));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});