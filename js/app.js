// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player constructor coded with the help of this walkthrough:
// https://matthewcranford.com/arcade-game-walkthrough-part-4-heros-first-steps/
let Player = class {
    constructor() {
        // Character img
        this.sprite = 'images/char-boy.png';
        // Define how far the player can move side to side
        this.side = 101;
        // Define how far the player can move up or down
        this.upDown = 83;
        // Set the starting position
        this.init_X = this.side * 2;
        this.init_Y = (this.upDown * 5) - 20;
    }
    
    handleInput(input) {
        switch(input) {
            case 'left':
                this.x -= this.side;
                break;
            case 'up':
                this.y -= this.upDown;
                break;
            case 'right':
                this.x += this.side;
                break;
            case 'down':
                this.y += this.upDown
                break;
        }
    }
    
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


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
