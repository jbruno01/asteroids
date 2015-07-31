(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Game = Asteroids.Game = function(canvasEl) {
  this.DIM_X = canvasEl.width;
  this.DIM_Y = canvasEl.height;
  this.NUM_ASTEROIDS = 8;
  this.NUM_EACH_STARS = 15;
  this.addAsteroids();
  this.addStars();
  this.POINTS = 0;
  this.LIVES = 3;
  this.ship = new Asteroids.Ship({game: this});
  this.bullets = [];
};


Game.prototype.addAsteroids = function() {
  this.asteroids = [];
  for (var i = 0; i < this.NUM_ASTEROIDS; i++ ){
    this.asteroids.push(new Asteroids.Asteroid({
      pos: this.randomPosition(),
      game: this,
      radius: 60,
      color: "green"
    }));
  };
};

Game.prototype.addStars = function() {
  this.stars = [];
  for (var i = 0; i < this.NUM_EACH_STARS; i++ ){
    this.stars.push(new Asteroids.LittleStar({
      pos: this.randomPosition(),
      game: this
    }));
    this.stars.push(new Asteroids.MediumStar({
      pos: this.randomPosition(),
      game: this
    }));
    this.stars.push(new Asteroids.BigStar({
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
  if (this.isOver()){
    ctx.font = "56px serif";
    ctx.textAlign = "center";
    ctx.fillText("Game Over. Thanks for playing!!", this.DIM_X / 2, this.DIM_Y / 2);
    Asteroids.GameView.unbindUsedKeys();
  }
};

Game.prototype.isOver = function () {
  return this.LIVES <= 0 || this.asteroids.length === 0;
}

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
  for (var i = 0; i < asteroids.length; i++ ){
    if(asteroids[i].isCollidedWith(this.ship)){
      this.ship.relocate();
      this.LIVES -= 1;
    };
    for(var j = 0; j < this.bullets.length; j++){
      if(asteroids[i].isCollidedWith(this.bullets[j])){
        if(asteroids[i].radius > 20){
          asteroids[i].split();
          this.POINTS += 10;
        } else {
          this.remove(asteroids[i]);
          this.POINTS += 20;
        }

        this.remove(this.bullets[j]);
      };
    };
  };
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(obj) {
  var game = this;
  if(obj instanceof Asteroids.Asteroid) {
    game.asteroids.splice(game.asteroids.indexOf(obj), 1);
  };
  if (obj instanceof Asteroids.Bullet) {
    game.bullets.splice(game.bullets.indexOf(obj), 1);
  };
};

Game.prototype.isOutOfBounds = function(pos) {
  return (pos[0] > this.DIM_X || pos[0] < 0 || pos[1] > this.DIM_Y || pos[1] < 0)
}

Game.prototype.allObjects = function() {
  return this.stars.concat(this.ship).concat(this.bullets).concat(this.asteroids);
};

Game.prototype.maxSpeed = function(speedX, speedY) {
  var speedLimit = 12;
  if ((speedLimit * speedLimit) < ((speedX * speedX) + (speedY * speedY))) {
    return this.maxSpeed(speedX * 0.9, speedY * 0.9);
  };
  return [speedX, speedY];
};



})();
