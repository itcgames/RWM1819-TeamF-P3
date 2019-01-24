class Game
{
    /**
     * Constructor function for Game class.
     */

    constructor() {
    }

    /**
     * Initialisation function for the Game class.
     */
    init() {
        //  Initialise the canvas
        gameNs.game.canvas = document.createElement("canvas");
        gameNs.game.canvas.id = 'mycanvas';
        gameNs.game.canvas.width = 64 * 16;
        gameNs.game.canvas.height = 64 * 13;
        gameNs.game.ctx = gameNs.game.canvas.getContext("2d");
        document.body.appendChild(gameNs.game.canvas);


       //   Initialise game variables.
       gameNs.game.collisionManager = new CollisionManager();
       gameNs.game.input = new Input();
       gameNs.game.globalInput = new Input();
       gameNs.game.sceneManager = new SceneManager();
       gameNs.game.splash = new SplashScreen("Splash");
       gameNs.game.menu = new MenuScene("Menu");
       gameNs.game.instructions = new InstructionsScene("Instructions");
       gameNs.game.play = new Play("Play");

       gameNs.game.sceneManager.addScene(gameNs.game.instructions);
       gameNs.game.sceneManager.addScene(gameNs.game.splash);
       gameNs.game.sceneManager.addScene(gameNs.game.play);
       gameNs.game.sceneManager.addScene(gameNs.game.menu);
       gameNs.game.sceneManager.goToScene(gameNs.game.splash.title);
       this.update = this.update.bind(this);

        //   Initialise game variables.
        gameNs.game.prevTime = Date.now();

        gameNs.game.sceneManager.addScene(gameNs.game.splash);
        gameNs.game.sceneManager.addScene(gameNs.game.menu);
        gameNs.game.sceneManager.addScene(gameNs.game.play);
        gameNs.game.sceneManager.goToScene(gameNs.game.splash.title);
        this.update = this.update.bind(this);

        // Interface testing
        gameNs.game.interface = new Interface(gameNs.game.canvas.width, gameNs.game.canvas.height);
        gameNs.game.globalInput.bind(gameNs.game.interface.trigger, "p");

        //   Initialise game variables.
        gameNs.game.player = new Player(new Vector2(400,400), new BoxCollider(new Vector2(400,400), 42, 64), null);
        gameNs.game.player.init(gameNs.game.canvas.ctx);

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
        gameNs.game.input.bind(gameNs.game.player.meleeAttack, "e");
        gameNs.game.input.bind(gameNs.game.player.meleeAttack, "E");
        gameNs.game.input.bind(gameNs.game.menu.cursorMoveUp, "ArrowUp");
        gameNs.game.input.bind(gameNs.game.menu.cursorMoveDown, "ArrowDown");


        gameNs.game.input.bind(gameNs.game.menu.navigation, "Enter");
        gameNs.game.input.bind(gameNs.game.instructions.comeBack, "Escape");
        gameNs.game.input.bind(gameNs.game.splash.goNext, " ")

        gameNs.game.input.setHoldValue(1000);
        gameNs.game.play.initWorld();

        gameNs.game.pickups = [];

        gameNs.game.testHeart = new Heart(350,400);
        gameNs.game.testBomb = new Bomb(550,400);
        gameNs.game.testRupee = new Rupee(350,600);
        gameNs.game.testKey = new Key(550,600);
        
        gameNs.game.pickups.push(gameNs.game.testHeart);
        gameNs.game.pickups.push(gameNs.game.testBomb);
        gameNs.game.pickups.push(gameNs.game.testRupee);
        gameNs.game.pickups.push(gameNs.game.testKey);
    }

    /**
     * Update function for the Game class.
     */
    update() {
        //  Determine dt
        var now = Date.now();
        gameNs.game.dt = (now - gameNs.game.prevTime);
        gameNs.game.prevTime = now;
        //  Update Game here.

        gameNs.game.sceneManager.update();
        gameNs.game.globalInput.update();

        if((gameNs.game.interface.active === false) && (gameNs.game.interface.moving === false)) {
            gameNs.game.input.update();
            let cols = gameNs.game.collisionManager.checkBoxColliderArray();
            gameNs.game.player.update(gameNs.game.dt, cols);
            gameNs.game.octo.update(gameNs.game.dt);
        }

        for(var i = 0; i < gameNs.game.pickups.length; i++){
            gameNs.game.pickups[i].update();
        }

        gameNs.game.input.update();
        gameNs.game.sceneManager.update();

        //  Draw new frame.
        gameNs.game.draw();

        // Recursive call to Update method.
        window.requestAnimationFrame(gameNs.game.update);
    }

    /**
     * Render function for the Game class.
     */
    draw() {
        //  Clear previous frame.
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        //  Render game objects here.
        gameNs.game.sceneManager.draw();
    }
}
