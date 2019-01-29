/**
 * @author Conor O'Toole
 * C00206724
 * This scene loads all scenes inot the scene manager
 * It updates and renders every class
 * It initialises the first scene alsos
 */

class Play {
  constructor(title) {
    this.overworld = [];
    this.activeScreen = 0;
    this.scrolling = false;

    this.camera = new Camera(0, 0, 64 * 16, 64 * 13);
    this.camera.setBounds(-10000, -10000, 10000, 10000);
    this.title = title;
  }

  /**
   * initWorld
   * @desc Initialises game world
   */
  initWorld() {
    this.overworld.push(new Screen("Screen01"));
    this.overworld.push(
      //new Screen("Screen01"),
      new Screen("Screen02"),
      new Screen("Screen03"),
      new Screen("Screen04"),
      new Screen("Screen05"),
      new Screen("Screen06"),
      new Screen("Screen07"),
      new Screen("Screen08"),
      new Screen("Screen09"),
      new Screen("Screen10"),
      new Screen("Screen11")
    );
    // Interface testing
    gameNs.game.interface = new Interface(gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.globalInput.bind(gameNs.game.interface.trigger, "p");
    //   Initialise game variables.
    gameNs.game.player = new Player(new Vector2(2520, 3200), new BoxCollider(new Vector2(400, 400), 42, 64), null);
    gameNs.game.player.init();

    gameNs.game.input.bind(gameNs.game.player.moveUp, "w");
    gameNs.game.input.bind(gameNs.game.player.moveUp, "W");
    gameNs.game.input.bind(gameNs.game.player.moveLeft, "a");
    gameNs.game.input.bind(gameNs.game.player.moveLeft, "A");
    gameNs.game.input.bind(gameNs.game.player.moveDown, "s");
    gameNs.game.input.bind(gameNs.game.player.moveDown, "S");
    gameNs.game.input.bind(gameNs.game.player.moveRight, "d");
    gameNs.game.input.bind(gameNs.game.player.moveRight, "D");
    gameNs.game.input.bind(gameNs.game.player.useUtility, "q");
    gameNs.game.input.bind(gameNs.game.player.useUtility, "Q");
    gameNs.game.input.bind(gameNs.game.player.meleeAttack, " ");
    gameNs.game.input.setHoldValue(1000);

    gameNs.game.pickups = [];
    gameNs.game.pickups.push(new Heart(350, 400));
    gameNs.game.pickups.push(new Bomb(550, 400));
    gameNs.game.pickups.push(new Rupee(350, 600));
    gameNs.game.pickups.push(new Key(550, 600));
    gameNs.game.pickups.push(new Fairy(150, 300));
    gameNs.game.pickups.push(new MapPickup(800, 300));
    gameNs.game.pickups.push(new Compass(450, 300));
    gameNs.game.pickups.push(new HeartContainer(250, 600));
    gameNs.game.pickups.push(new StopWatch(250, 750));
    gameNs.game.pickups.push(new SwordPickup(250, 750));

    gameNs.game.tileGrid = new Grid(64, "Screen01");
    gameNs.game.octo = new Octorok(new Vector2(5 * gameNs.game.tileGrid.tileSize, 4 * gameNs.game.tileGrid.tileSize), null, null, gameNs.game.tileGrid);
    console.log("intiWOrld");
  }

  /**
   * update
   * @desc calls draw and itself recursively also updates animations
   */
  update(dt) {
    // for(let i = 0; i < overworld[active.x][active.y].grid.enemyList.length(); i++){
    //   overworld[active.x][active.y].grid.enemyList[i];
    // }
    for (let i = 0; i < this.overworld[this.activeScreen].enemyList.length; i++) {
      this.overworld[this.activeScreen].enemyList[i].update(dt);
    }
    this.camera.follow(gameNs.game.player.position.x, gameNs.game.player.position.y);
    // gameNs.game.player.update(gameNs.game.dt);

    // gameNs.game.interface.update();

    if ((gameNs.game.interface.active === false) && (gameNs.game.interface.moving === false)) {
      gameNs.game.input.update();
      gameNs.game.collisionManager.checkBoxColliderArray();
      if (!gameNs.game.player.stopWatch) {
        //gameNs.game.octo.update(gameNs.game.dt);
      }
      gameNs.game.player.update(gameNs.game.dt);

      for (var i = 0; i < gameNs.game.pickups.length; i++) {
        gameNs.game.pickups[i].update();
      }
    }
    gameNs.game.interface.update();

  }

  draw() {
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    //gameNs.game.tileGrid.draw(gameNs.game.ctx);
    //gameNs.game.octo.draw(gameNs.game.ctx);

    this.camera.draw(0, gameNs.game.ctx);

    for (let i = 0; i < this.overworld.length; i++) {
      this.overworld[i].render(gameNs.game.ctx);
    }

    this.overworld[this.activeScreen].renderActive(gameNs.game.ctx, true);

    gameNs.game.collisionManager.render(gameNs.game.ctx);

    //gameNs.game.collisionManager.render(gameNs.game.ctx); // collision test
    for (var i = 0; i < gameNs.game.pickups.length; i++) {
      gameNs.game.pickups[i].draw(gameNs.game.ctx);
    }
    gameNs.game.player.draw(gameNs.game.ctx);

    gameNs.game.interface.render(gameNs.game.ctx, this.camera);
  }
}