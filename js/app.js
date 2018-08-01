// Enemies
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // enemy position reset
    if (this.x > 550) {
        this.x = -100;
        this.speed = 300 + Math.floor(Math.random() * 512);
    }

    // checking player and enemy collision
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
        console.log("Game Over. Restating");
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-horn-girl.png'
};

Player.prototype.update = function() {
    // keeping player in canvas dimensions
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // winning the game
    if (this.y < 0) {
        var pos;
        this.x = 200;
        this.y = 380;
        console.log("Game won. Restarting");
        alert("You have won the game");
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// arrow keys (movement of player)
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
		case "a":
		case "A":
            this.x -= this.speed + 50;
            console.log("left arrow key pressed");
            break;
        case 'up':
            this.y -= this.speed + 30;
            console.log("up arrow key pressed");
            break;
        case 'right':
            this.x += this.speed + 50;
            console.log("right arrow key pressed");
            break;
        case 'down':
            this.y += this.speed + 30;
            console.log("down arrow key pressed");
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// enemy starting position
var enemyPosition = [50, 130, 210];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 300 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

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
