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
        gameNs.game.canvas.width = window.innerWidth;
        gameNs.game.canvas.height = window.innerHeight;
        gameNs.game.ctx = gameNs.game.canvas.getContext("2d");
        gameNs.game.ctx.fillStyle = "green";
        gameNs.game.ctx.font = "30px Pixel-Emulator.otf";
        document.body.appendChild(gameNs.game.canvas);

        //   Initialise game variables.
        gameNs.game.input = new Input();
        gameNs.sceneManager = new SceneManager();
        gameNs.splash = new SplashScreen("Splash");
        gameNs.menu = new MenuScene("Menu");
        gameNs.play = new Play("Play");

        gameNs.sceneManager.addScene(gameNs.splash);
        gameNs.sceneManager.addScene(gameNs.menu);
        gameNs.sceneManager.addScene(gameNs.play);
        gameNs.sceneManager.goToScene(gameNs.splash.title);
        this.update = this.update.bind(this);


        // Interface testing
        gameNs.game.interface = new Interface(gameNs.game.canvas.width, gameNs.game.canvas.height);
        gameNs.game.input.bind(gameNs.game.interface.trigger, "p");

        //   Initialise game variables.
        gameNs.game.collisionManager = new CollisionManager();

        gameNs.game.tileGrid = new Grid(64, 16, 13);
        //   Initialise game variables.
        gameNs.game.player = new Player();
        gameNs.game.player.init(gameNs.game.canvas.ctx);

        gameNs.game.input.bind(gameNs.game.player.moveUp, "w");
        gameNs.game.input.bind(gameNs.game.player.moveLeft, "a");
        gameNs.game.input.bind(gameNs.game.player.moveDown, "s");
        gameNs.game.input.bind(gameNs.game.player.moveRight, "d");
        gameNs.game.input.bind(gameNs.game.player.meleeAttack, " ");

        gameNs.game.testHeart = new Heart(350,400);
        gameNs.game.testBomb = new Bomb(550,400);
        gameNs.game.testRupee = new Rupee(350,600);
        gameNs.game.testKey = new Key(550,600);
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
        let cols = gameNs.game.collisionManager.checkBoxColliderArray();

        gameNs.sceneManager.update();
        gameNs.game.input.update();
        gameNs.game.player.update(gameNs.game.dt, cols);

        gameNs.game.interface.update();

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
        this.tileGrid.draw(this.ctx);

        this.collisionManager.render(this.ctx);

        gameNs.game.player.draw(this.ctx);
        gameNs.game.testHeart.render(this.ctx);
        gameNs.game.testBomb.render(this.ctx);
        gameNs.game.testRupee.render(this.ctx);
        gameNs.game.testKey.render(this.ctx);
        gameNs.game.interface.render(this.ctx);
    }
}
