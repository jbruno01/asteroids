(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function(ctx, canvasEl){
    this.game = new Asteroids.Game(canvasEl);
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    this.bindKeyHandlers();
    this.interval = window.setInterval(this.game.render.bind(this.game, this.ctx), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var gameview = this;
    var thrust = 5;
    key('up', function() { gameview.game.ship.power([0, thrust * -1]) });
    key('left', function() { gameview.game.ship.power([-1 * thrust, 0]) });
    key('right', function() { gameview.game.ship.power([thrust, 0]) });
    key('down', function() { gameview.game.ship.power([0, thrust]) });
    key('space', function() { gameview.game.ship.fireBullet() });
  };

  })();
