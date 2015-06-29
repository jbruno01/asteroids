(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function(ctx){
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    this.interval = window.setInterval(this.game.render.bind(this.game, this.ctx), 20);
  };

  })();
