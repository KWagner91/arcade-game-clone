// Variables
    var level = 1;


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    if (this.x > 500) {
		this.x = -10;
	}
	    if (player.x < this.x + 60 && player.x + 30 > this.x && player.y < this.y + 25 && 30 + player.y > this.y) {
        player.reset();
}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
var Player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};


Player.prototype.update = function() {
    // function not needed right now
};


Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    document.querySelector(".level").innerHTML = "Your Level: " + level;
};


// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.success = function() {
  this.x = 200;
  this.y = 400;
  this.speed = 50;
  bugMove(level);
  counter = 0;
};


Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
	this.speed = 50;
	level = 1;
	allEnemies = [];
	bugMove(level);
	bugMove(level);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];


var bugMove = function(number) {

	var enemyOne = new Enemy(Math.floor(Math.random() * 12), 50, Math.random() * 100*number);
	var enemyTwo = new Enemy(Math.floor(Math.random() * 12), 230, Math.random() * 100*number);
	var enemyThree = new Enemy(Math.floor(Math.random() * 12), 140, Math.random() * 100*number);
	
	var array = [enemyOne, enemyTwo, enemyThree];

	var randomBug = array[Math.floor(Math.random()*array.length)];
	allEnemies.push(randomBug);
};

var player = new Player(200, 400, 50);
bugMove(level);
bugMove(level);
var counter = 0;


player.handleInput = function(direction){

          if(direction === 'left' && this.x !== 0){
     this.x -= 100;
     }
     if (direction === 'up' && this.y > 0){
     this.y -= 82.5;
     }
     if (direction === 'right' && this.x < 400){
     this.x += 100;
     }
     if (direction === 'down' && this.y < 400){
     this.y += 82.5;
     }
     if (this.y < 70 && counter < 1) {
		level += 1;
		counter += 1;
		var updateScore = document.querySelector(".score");
		updateScore.innerHTML = "Score = 1";
		setTimeout(function(){ 
			 player.success(); 
			 }, 1200);
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
