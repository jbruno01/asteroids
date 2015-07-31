(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Game = Asteroids.Game = function(canvasEl) {
  this.DIM_X = canvasEl.width;
  this.DIM_Y = canvasEl.height;
  this.NUM_ASTEROIDS = 3;
  this.NUM_EACH_STARS = 25;
  this.addAsteroids(this.NUM_ASTEROIDS);
  this.addStars();
  this.POINTS = 0;
  this.LIVES = 3;
  this.LEVEL = 1;
  this.ship = new Asteroids.Ship({game: this});
  this.bullets = [];
};


Game.prototype.addAsteroids = function(num) {
  this.asteroids = [];
  for (var i = 0; i < num; i++ ){
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
    }))
    this.stars.push(new Asteroids.MediumStar({
      pos: this.randomPosition(),
      game: this
    }))
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
  this.renderDetails();
  if (this.needLevelUp()){
    this.levelUp();
  } else if (this.isOver()){
    this.renderGameOver();
  }
};

Game.prototype.renderGameOver = function () {
  ctx.font = "56px serif";
  ctx.textAlign = "center";
  ctx.fillText("Game Over. R to reset!!", this.DIM_X / 2, this.DIM_Y / 2);
  key("r", function () {
    this.reset()
  }.bind(this))
}

Game.prototype.renderDetails = function () {
  ctx.font = "36px serif";
  ctx.textAlign = "center";
  ctx.fillText("Points: " + this.POINTS, this.DIM_X * .9, 50);
  ctx.fillText("Lives: " + this.LIVES, this.DIM_X * .1, 50);
  ctx.fillText("Level: " + this.LEVEL, this.DIM_X / 2, 50);
}

Game.prototype.isOver = function () {
  return this.LIVES === 0 || this.asteroids.length === 0;
}

Game.prototype.needLevelUp = function () {
  return this.LIVES > 0 && this.asteroids.length === 0;
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

Game.prototype.reset = function () {
  this.LIVES = 3;
  this.POINTS = 0;
  this.asteroids = [];
  this.NUM_ASTEROIDS = 3;
  this.bullets = [];
  this.addAsteroids(this.NUM_ASTEROIDS);
  this.addStars();
  this.LEVEL = 1;
}

Game.prototype.levelUp = function () {
  this.LEVEL += 1;
  this.NUM_ASTEROIDS += 1;
  this.addAsteroids(this.NUM_ASTEROIDS)
}

Game.prototype.checkCollisions = function() {
  var asteroids = this.asteroids;
  for (var i = 0; i < asteroids.length; i++ ){
    if(asteroids[i].isCollidedWith(this.ship)){
      this.ship.relocate();
      if(this.LIVES > 0){
        this.LIVES -= 1;
      }
    };
    for(var j = 0; j < this.bullets.length; j++){
      if(asteroids[i].isCollidedWith(this.bullets[j])){
        if(asteroids[i].radius > 30){
          asteroids[i].split();
          if(!this.isOver()){
            this.POINTS += 10;
          }
        } else if(asteroids[i].radius > 20) {
          asteroids[i].split();
          if(!this.isOver()){
            this.POINTS += 20;
          }
        } else {
          if(!this.isOver()){
            this.POINTS += 30;
          }
          this.remove(asteroids[i]);
        }

        this.remove(this.bullets[j]);
      };
    };
  };
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
  this.ship.setLastDirection();
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
  var speedLimit = 10;
  if ((speedLimit * speedLimit) < ((speedX * speedX) + (speedY * speedY))) {
    return this.maxSpeed(speedX * 0.9, speedY * 0.9);
  };
  return [speedX, speedY];
};



})();
