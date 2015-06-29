(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Game = Asteroids.Game = function(canvasEl) {
  this.DIM_X = canvasEl.width;
  this.DIM_Y = canvasEl.height;
  this.NUM_ASTEROIDS = 8;
  this.addAsteroids();
  this.ship = new Asteroids.Ship({game: this});
  this.bullets = [];
};

Game.prototype.addAsteroids = function() {
  this.asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++ ){
    this.asteroids.push(new Asteroids.Asteroid({
      pos: this.randomPosition(),
      game: this
    }));
  };
};

Game.prototype.randomPosition = function() {
  return [(Math.random() * this.DIM_X), (Math.random() * this.DIM_Y)];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach(function(piece) {
    piece.draw(ctx);
  });
};

Game.prototype.moveObjects = function(){
  this.allObjects().forEach(function(piece) {
    piece.move();
  });
};

Game.prototype.render = function(ctx){
  this.step();
  this.draw(ctx);
};

Game.prototype.wrap = function(pos) {
  var wrapX = pos[0];
  var wrapY = pos[1];
  if(wrapX > this.DIM_X){
    wrapX -= this.DIM_X;
  };
  if(wrapX < 0) {
    wrapX += this.DIM_X;
  };
  if(wrapY > this.DIM_Y){
    wrapY -= this.DIM_Y;
  };
  if(wrapY < 0){
    wrapY += this.DIM_Y;
  };
  return [wrapX, wrapY]
};

Game.prototype.checkCollisions = function() {
  var asteroids = this.asteroids;
  var toBeRemoved = []
  for (var i = 0; i < asteroids.length; i++ ){
    if(asteroids[i].isCollidedWith(this.ship)){
      this.ship.relocate();
    };
    for(var j = 0; j < this.bullets.length; j++){
      if(asteroids[i].isCollidedWith(this.bullets[j])){
        toBeRemoved.push(asteroids[i]);
        toBeRemoved.push(this.bullets[j]);
      };
    };
  };
  this.remove(toBeRemoved);
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(removeArray) {
  var game = this;
  removeArray.forEach(function(obj){
    if(obj instanceof Asteroids.Asteroid) {
      game.asteroids.splice(game.asteroids.indexOf(obj), 1);
    };
    if (obj instanceof Asteroids.Bullet) {
      game.bullets.splice(game.bullets.indexOf(obj), 1);
    };
  });
};

Game.prototype.allObjects = function() {
  return this.asteroids.concat(this.ship).concat(this.bullets);
};

Game.prototype.maxSpeed = function(speedX, speedY) {
  var speedLimit = 15;
  if ((speedLimit * speedLimit) < ((speedX * speedX) + (speedY * speedY))) {
    return this.maxSpeed(speedX * 0.9, speedY * 0.9);
  };
  return [speedX, speedY];
};


})();
