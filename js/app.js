// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    // The possible locations of the enemy along the y-axis
    let rows = [65, 148, 231];
    
    // Initialize the enemy with a specific y-axis location
    // from the predefined possible rows
    this.y = rows[Math.floor(Math.random() * rows.length)];
    
    // Set the speed of the enemy
    this.speed = 20 + Math.floor(Math.random() * 250);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
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
        // Define how far the player can move side to side (the width of the columns)
        this.side = 101;
        // Define how far the player can move up or down (the height of the rows)
        this.upDown = 83;
        // Set the starting position, middle column
        this.init_X = this.side * 2;
        // Set the starting position, bottom row with padding
        this.init_Y = (this.upDown * 5) - 20;
        // Define positional properties, x and y, initialized with the player
        // in starting position
        this.x = this.init_X;
        this.y = this.init_Y;
    }
    
    handleInput(input) {
        switch(input) {
            case 'left':
                // Add left boundary
                if (this.x >= this.side) {
                    this.x -= this.side;
                }
                break;
            case 'up':
                // Add top boundary
                if (this.y >= this.upDown) {
                    this.y -= this.upDown;
                } else if (this.y < this.upDown) {
                    this.y = 0;
                }
                break;
            case 'right':
                // Add right boundary
                if (this.x <= this.side * 3) {
                    this.x += this.side;
                }
                break;
            case 'down':
                // Add bottom boundary
                if (this.y <= this.upDown * 4) {
                    this.y += this.upDown;
                }
                break;
        }
        
        // this.update(this.x, this.y);
        
    }
    
    update(x, y) {
        // Check for collision
        for (let enemy of allEnemies) {
            // Check x coordinate && y coordinate
            if ((player.x <= enemy.x + 100 || player.x + 100 >= enemy.x) && (player.y == enemy.y)) {
                player.x = player.init_X;
                player.y = player.init_Y;
            }
        }
        
        // Check if player won
        if (player.y == 0) {
            player.render(x, y);
            window.setTimeout(function() {
                if(confirm("Congratulations, you won!!")) {
                    player.x = player.init_X;
                    player.y = player.init_Y;
                }
            });
        }
    }
    
    render(x, y) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let numPossEnemies = [2, 3, 4, 5];
let numEnemies = numPossEnemies[Math.floor(Math.random) * numPossEnemies.length];
let allEnemies = [];

for (let i = 0; i < numEnemies; i++) {
    allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
let player = new Player();

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
