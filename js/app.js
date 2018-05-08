// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	this.x = x;
	this.y = y;
	this.sprite = 'images/enemy-bug.png';
	this.speed = speed;
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
var Player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.speed = speed;
};


Player.prototype.update = function() {
    // function not needed right now
}


Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];



var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);


var player = new Player(200,400,50);



player.handleInput = function(direction){

          if(direction === 'left' && this.x !== 0){
     this.x -= 100;
     }
     if(direction === 'up' && this.y > 0){
     this.y -= 82.5;
     }
     if(direction === 'right' && this.x < 400){
     this.x += 100;
     }
     if(direction === 'down' && this.y < 400){
     this.y += 82.5;
     }
    };


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
