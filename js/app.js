/**
* @description Variables defined for following functions
* @param {number} level
* @param {array} allEnemies
* @param {number} counter
* @param {number} sprite
* @param {array} character
*/
let level = 1;
let allEnemies = [];
let counter = 0;
let sprite = 0;
const character = ['char-boy', 'char-cat-girl', 'char-horn-girl', 'char-pink-girl', 'char-princess-girl'];
	
	

/**
* @description Enemy constructor function
* @constructor
* @param {number} x 
* @param {number} y 
* @param {number} speed - Movement speed
* @param {string} sprite - img of Enemy
*/
const Enemy = function(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.sprite = 'images/enemy-bug.png';
};




/**
* @description Enemy constructor Update function for position and movement
* @constructor
* @param {number} dt - time delta between ticks to ensure game runs at the same speed for all computers
*/
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



/**
* @description Enemies are drawn to the screen
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



/**
* @description Player constructor function
* @constructor
* @param {number} x 
* @param {number} y 
* @param {number} speed - Movement speed
* @param {number} sprite
* @param {string} sprite - img of Player, depending on internal count sprite
*/
const Player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/' + character[sprite] +'.png';
};



/**
* @description Player constructor Update function for updating character img upon key click (let sprite)
* @constructor
* @param {number} sprite
*/
Player.prototype.update = function() {
    this.sprite = 'images/' + character[sprite] +'.png';
};



/**
* @description Player is drawn to the screen
* @param {number} level - Current level is drawn to screen
*/
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    document.querySelector(".level").innerHTML = "Your current Level: " + level;
};


/**
* @description Player constructor success function if Player reaches other end of screen
* @constructor
* @param {number} level
* @param {number} counter - reset to allow reaching the end of screen again
*/
Player.prototype.success = function() {
	if (level > 5) {
		alert("You win the Game!");
}
	else {
	  this.x = 200;
	  this.y = 400;
	  this.speed = 50;
	  bugMove(level);
	  counter = 0;
	}
};



/**
* @description Player constructor reset function if Player is hit by Enemy
* @constructor
* @param {number} level - Level is reset to 1
* @param {array} allEnemies - resets number of Enemies on screen
* @param {function} bugMove(level) - 2 Enemies appear on screen
*/
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
	this.speed = 50;
	level = 1;
	allEnemies = [];
	bugMove(level);
	bugMove(level);
};



/**
* @description Function to display 1 random bug on screen, random movement speed depends on level
* @param {Object} enemyOne, enemyTwo, enemyThree
* @param {array} array
* @param {Object} randomBug - 1 random bug out of 3 in array
* @param {array} allEnemies - 1 random bug appears on screen
*/
const bugMove = function(number) {

	let enemyOne = new Enemy(Math.floor(Math.random() * 12), 50, Math.random() * 100 * number);
	let enemyTwo = new Enemy(Math.floor(Math.random() * 12), 230, Math.random() * 100 * number);
	let enemyThree = new Enemy(Math.floor(Math.random() * 12), 140, Math.random() * 100 * number);
	const array = [enemyOne, enemyTwo, enemyThree]
	const randomBug = array[Math.floor(Math.random()*array.length)];
	allEnemies.push(randomBug);
};



/**
* @description new Object player is initiated to start the game, Function bugMove(level) initiated, 2 Enemies appear on screen
* @param {Object} player
* @param {function} bugMove(level)
* @param {number} level - current level of player
*/
const player = new Player(200, 400, 50);
bugMove(level);
bugMove(level);



/**
* @description Function handle user keyboard input
* @bug "This" problem in setTimeout() - arrow function to avoid global value of "this", based on https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#The_this_problem
* @param {number} sprite 
* @param {number} counter - internal counter to avoid bug of multiple level ups if user presses any key
*/
player.handleInput = function(direction){
	 if (direction === 'char-change') {
		(sprite < 4) ? sprite += 1 : sprite = 0;
	 }
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
     if (this.y < 50 && counter < 1) {
		level += 1;
		counter += 1;
		setTimeout(() => {this.success()}, 1200);
	 }
    };



/**
* @description Event Listener Function for arrow keys and c key
* @param {Unicode} 37 - Arrow left
* @param {Unicode} 38 - Arrow up
* @param {Unicode} 39 - Arrow right
* @param {Unicode} 40 - Arrow down 
* @param {Unicode} 67 - C
*/
document.addEventListener('keyup', function(e) {
    
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        67: 'char-change'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



/**
* @description Disable arrow key scrolling in browser  
* 			   Code was taken from "https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa"
* @param {Unicode} 37 - Arrow left
* @param {Unicode} 38 - Arrow up
* @param {Unicode} 39 - Arrow right
* @param {Unicode} 40 - Arrow down 
*/
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
