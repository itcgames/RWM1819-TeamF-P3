/**
 * @author Conor O'Toole
 * C00206724
 * This scene loads all scenes inot the scene manager
 * It updates and renders every class
 * It initialises the first scene alsos
 */

class Play
{
  constructor(title)
  {
    this.overworld = [];
    this.activeScreen = 0;
    this.scrolling = false;

    this.title = title;
  }

    /**
  * initWorld
  * @desc Initialises game world
  */
  initWorld()
  {
    this.overworld.push(
      new Screen("Screen01"),
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
    gameNs.game.interface.pos = new Vector2(
      this.overworld[this.activeScreen].grid.position.x,
      this.overworld[this.activeScreen].grid.position.y + gameNs.game.interface.defaultHeight
    );
    //   Initialise game variables.
    gameNs.game.player = new Player(new Vector2(2520, 3200), new BoxCollider(new Vector2(400, 400), 42, 64));
    gameNs.game.player.init();

    
    this.camera = new Camera(
      0,
      0,
      64*16,
      64*13
      );
    this.camera.pos.x = this.overworld[this.activeScreen].grid.position.x + this.camera.size.w/2;
    this.camera.pos.y = this.overworld[this.activeScreen].grid.position.y + this.camera.size.h/2;
    this.camera.setBounds(-10000,-10000,10000,10000);

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
    gameNs.game.pickups.push(new Heart(350,400));
    gameNs.game.pickups.push(new Bomb(550,400));
    gameNs.game.pickups.push(new Rupee(350,600));
    gameNs.game.pickups.push(new Key(550,600));
    gameNs.game.pickups.push(new Fairy(150,300));
    gameNs.game.pickups.push(new MapPickup(800,300));
    gameNs.game.pickups.push(new Compass(450,300));
    gameNs.game.pickups.push(new HeartContainer(250,600));
    gameNs.game.pickups.push(new StopWatch(250,750));
    gameNs.game.pickups.push(new SwordPickup(250,750));
  }

  /**
  * update
  * @desc calls draw and itself recursively also updates animations
  */
  update(dt)
  {
    for(let i = 0; i < this.overworld[this.activeScreen].enemyList.length; i++){
      this.overworld[this.activeScreen].enemyList[i].update(dt);
      console.log("monster update");
    }
    //this.camera.follow(gameNs.game.player.position.x, gameNs.game.player.position.y);

    if((gameNs.game.interface.active === false) && (gameNs.game.interface.moving === false)) {
      gameNs.game.input.update();
      gameNs.game.collisionManager.checkBoxColliderArray();
      if(!gameNs.game.player.stopWatch){
        //gameNs.game.octo.update(gameNs.game.dt);
      }
      gameNs.game.player.update(gameNs.game.dt);

      for(var i = 0; i < gameNs.game.pickups.length; i++){
        gameNs.game.pickups[i].update();
      }
    }
    
    // if(Screen.worldToScreen(gameNs.game.player.position).y < 10){
    //   console.log("Bam");
    //   //this.transition();
    // }
    if(gameNs.game.collisionManager.boxCollidedWithTag(gameNs.game.player.collider, "exit")
      && this.camera.panning === false){
      this.transition();
      console.log("BOOM");
    }

    gameNs.game.interface.update();
  }

  transition(){

    // gameNs.game.player.position = new Vector2(
    //   this.overworld[this.activeScreen].grid.position.x + 200,
    //   this.overworld[this.activeScreen].grid.position.y + 200
    // );
    gameNs.game.player.position = new Vector2(
      gameNs.game.player.position.x + this.overworld[this.activeScreen].grid.forwardPush.x*50,
      gameNs.game.player.position.y + this.overworld[this.activeScreen].grid.forwardPush.y*50
    );

    this.activeScreen += 1;

    this.camera.pos.x = this.overworld[this.activeScreen].grid.position.x + this.camera.size.w/2; 
    this.camera.pos.y = this.overworld[this.activeScreen].grid.position.y + this.camera.size.h/2;

    gameNs.game.interface.pos = {
      x: this.overworld[this.activeScreen].grid.position.x,
      y: this.overworld[this.activeScreen].grid.position.y + gameNs.game.interface.defaultHeight
    };
  }

  draw()
  {
    //gameNs.game.tileGrid.draw(gameNs.game.ctx);

    this.camera.draw(0,gameNs.game.ctx);

    for(let i = 0; i < this.overworld.length; i++){
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
}