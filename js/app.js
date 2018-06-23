/**
    * @description sets global variables.
    * @varaibles
    */
let enemyCharacter = 'enemy-bug.png';
let playerCharacter;
let defaultClass;
let defaultPlayer = 'char-boy';
let score = 0;

/**
    * @description objewct array of all player characters to choose from
    * object
    */
let charList = ['char-boy', 'char-cat-girl', 'char-horn-girl', 'char-pink-girl', 'char-princess-girl'];

/**
    * @description shortcuts for jquery selectors
    */
let characterSelection = $('#characterSelection');
let ul = document.getElementById('characterSelection');
let scoreEl = document.getElementsByClassName('score');

/**
    * @description loop that creates LI elements for character choice list
    */
for (let i = 0; i < charList.length; i++) {
    if (charList[i] === 'char-boy') {
        defaultClass = charList[i] + ' blueBorder';
    } else {
        defaultClass = charList[i];
    }
    characterSelection.append($('<li class="' + defaultClass + '"><img src="images/' + charList[i] + '.png" /></li>'));
}

/**
    * @description gets the classname of the parent element and adds class blueBorder to selected character
    * @event listener
    * @param {string} e - full html element selected
    */
ul.addEventListener('click', function (e) {
    //get target class name for setting player character to use in game later
    playerCharacter = e.target.parentElement.className;
    //removing any or a previous blueBorder class before adding or changing it based on character selected
    $('#characterSelection li').removeClass('blueBorder');
    //adding a class of blueBorder to show which character is selected
    e.target.parentElement.classList.add('blueBorder');
    //settign the sprite of the player class to the selected image above and adding .png at the end to pull in the image
    player.sprite = 'images/' + playerCharacter + '.png';
});

/**
    * @description sets playerCharacter variable for use in which character image to use in game
    */
if (playerCharacter) {
    //if new character is selected sets it to the player character name minus the .png
    playerCharacter;
} else {
    //default image upon loading the game
    playerCharacter = defaultPlayer;
}

/**
    * @description rmeoves a solid star by adding the class for outline star.
    * @class
    * @param {number} x- x position of enemy character
    * @param {number} y- y position of enemy character
    * @param {number} speed- spped of enemy character
    */
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/' + enemyCharacter;
};

/**
    * @description Update the enemy's position, required method for game
    * @class
    * @param {string} dt- a time delta between ticks
    */
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -100;
    }

    // check for collision betweeen the player and the enemy
    if (player.x < this.x + 38 && player.x + 38 > this.x && player.y < this.y + 20 && 35 + player.y > this.y) {
        player.gameReset();
    }
};

/**
    * @description Draw the enemy on the screen, required method for game
    * @class
    */
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let playerX = 200;
let playerY = 400;

let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + playerCharacter + '.png';
}

/**
    * @description Update the player's position and keep player with-n bounds of board, required method for game
    * @class
    * @param {string} dt- a time delta between ticks
    */
Player.prototype.update = function () {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y > 400) {
        this.y = 400;
    } else if (this.y <= 0) {
        player.playerReset();
    }
}

/**
    * @description resets players position back to start
    * @class
    */
Player.prototype.playerReset = function () {
    this.x = playerX;
    this.y = playerY;
    score++;
    scoreEl.innerHTML = score;
}

/**
    * @description resets players position back to start and resets score to 0
    * @class
    */
   Player.prototype.gameReset = function () {
    score = 0;
    player.playerReset();
}

/**
    * @description Draw the player on the screen, required method for game
    * @class
    */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
    * @description determines the direction to move the character based on keys pressed
    * @class
    * @param {string} key- a tthe key that was pressed on keyboard
    */
Player.prototype.handleInput = function (key) {
    if (key === 'left') {
        this.x -= 100;
    } else if (key === 'right') {
        this.x += 100;
    } else if (key === 'up') {
        this.y -= 83;
    } else if (key === 'down') {
        this.y += 83;
    }
}

/**
    * @description create blank enemey object array to hold all enemies and instantiates a new player object in a variable
    * @class
    * @param {number} x- x position of player character
    * @param {number} y- y position of player character
    */
let allEnemies = [];
let player = new Player(200, 400);

/**
    * @description loops through and pushs a new enemey into the allEnemies Object with position's to place in game
    */
for (let i = 0; i < 3; i++) {
    let startSpeed = 40 * Math.floor(Math.random() * 16 + 3);
    allEnemies.push(new Enemy(-101, 65 + (85 * i), startSpeed));
}

/**
    * @description This listens for key presses and sends the keys to your. Player.handleInput() method. You don't need to modify this.
    * @event listener
    * @param {string} e- key pressed on keyboard
    */
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});