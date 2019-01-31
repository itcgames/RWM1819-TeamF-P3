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
    gameNs.game.player = new Player(new Vector2(2520, 3200), new BoxCollider(new Vector2(400, 400), 42, 64));
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
    gameNs.game.input.bind(gameNs.game.player.jump, "f");
    gameNs.game.input.bind(gameNs.game.player.jump, "F");
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

    console.log("intiWOrld");

    this.overworld[1].enemyList.push(new Octorok(
      new Vector2(this.overworld[1].grid.position.x + (5 * this.overworld[1].grid.tileSize), this.overworld[1].grid.position.y + (5 * this.overworld[1].grid.tileSize)), 
      null, 
      this.overworld[1].grid)
    );
  }

  /**
   * update
   * @desc calls draw and itself recursively also updates animations
   */
  update(dt) {    
    this.camera.follow(gameNs.game.player.position.x, gameNs.game.player.position.y);
    this.setActiveScreen();
    if ((gameNs.game.interface.active === false) && (gameNs.game.interface.moving === false)) {
      gameNs.game.input.update();
      gameNs.game.collisionManager.checkBoxColliderArray();
      if (!gameNs.game.player.stopWatch) {
        for (let i = 0; i < this.overworld[this.activeScreen].enemyList.length; i++) {
          this.overworld[this.activeScreen].enemyList[i].update(dt);
        }
      }
      gameNs.game.player.update(gameNs.game.dt);

      gameNs.game.collisionManager.checkBoxColliderArray();
      for (var i = 0; i < gameNs.game.pickups.length; i++) {
        gameNs.game.pickups[i].update();
      }
    }
    
    gameNs.game.interface.update();
  }

  spawnPickup(type, position){
    var pickup;
      switch (type) {
        case 0:
          pickup = new Rupee(position.x, position.y);
          break;
        case 1:
          pickup = new Key(position.x, position.y);
          break;
        case 2:
          pickup = new Bomb(position.x, position.y);
          break;
        case 3:
          pickup = new Heart(position.x, position.y);
          break;
        case 4:
          pickup = new HeartContainer(position.x, position.y);
          break;
        case 5:
          pickup = new Fairy(position.x, position.y);
          break;
      }

      gameNs.game.pickups.push(pickup);
  }

  draw() {
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);

    this.camera.draw(0, gameNs.game.ctx);

    for (let i = 0; i < this.overworld.length; i++) {
      this.overworld[i].render(gameNs.game.ctx);
    }

    this.overworld[this.activeScreen].renderActive(gameNs.game.ctx, true);

    //gameNs.game.collisionManager.render(gameNs.game.ctx); // collision test
    
    for (var i = 0; i < gameNs.game.pickups.length; i++) {
      gameNs.game.pickups[i].draw(gameNs.game.ctx);
    }
    gameNs.game.player.draw(gameNs.game.ctx);

    gameNs.game.interface.render(gameNs.game.ctx, this.camera);
  }


  overworldCoords(position) {
    return new Vector2((position.x - position.x % 1024) / 1024, (position.y - position.y % 704) / 704);
  }

  setActiveScreen(){
    var playerOverworldCoords = this.overworldCoords(gameNs.game.player.position);
    if (playerOverworldCoords.x === 2 && playerOverworldCoords.y === 4) {
      this.activeScreen = 0;
    } else if (playerOverworldCoords.x === 2 && playerOverworldCoords.y === 3) {
      this.activeScreen = 1;
    } else if (playerOverworldCoords.x === 1 && playerOverworldCoords.y === 3) {
      this.activeScreen = 2;
    } else if (playerOverworldCoords.x === 0 && playerOverworldCoords.y === 3) {
      this.activeScreen = 3;
    } else if (playerOverworldCoords.x === 0 && playerOverworldCoords.y === 2) {
      this.activeScreen = 4;
    } else if (playerOverworldCoords.x === 1 && playerOverworldCoords.y === 2) {
      this.activeScreen = 5;
    } else if (playerOverworldCoords.x === 1 && playerOverworldCoords.y === 1) {
      this.activeScreen = 6;
    } else if (playerOverworldCoords.x === 2 && playerOverworldCoords.y === 1) {
      this.activeScreen = 7;
    } else if (playerOverworldCoords.x === 3 && playerOverworldCoords.y === 1) {
      this.activeScreen = 8;
    }  else if (playerOverworldCoords.x === 3 && playerOverworldCoords.y === 0) {
      this.activeScreen = 9;
    } else if (playerOverworldCoords.x === 2 && playerOverworldCoords.y === 0) {
      this.activeScreen = 10;
    }   
  }
}