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
        document.body.appendChild(gameNs.game.canvas);

        //   Initialise game variables.
        gameNs.game.prevTime = Date.now();
        gameNs.game.collisionManager = new CollisionManager();

        gameNs.game.tileGrid = new Grid(64, "Screen01");    
        gameNs.game.octo = new Octorok(new Vector2(5 * gameNs.game.tileGrid.tileSize, 4 * gameNs.game.tileGrid.tileSize), null, null, gameNs.game.tileGrid);  

        gameNs.game.input = new Input();
        gameNs.game.sceneManager = new SceneManager();
        gameNs.game.splash = new SplashScreen("Splash");
        gameNs.game.menu = new MenuScene("Menu");
        gameNs.game.play = new Play("Play");

        gameNs.game.sceneManager.addScene(gameNs.game.splash);
        gameNs.game.sceneManager.addScene(gameNs.game.menu);
        gameNs.game.sceneManager.addScene(gameNs.game.play);
        gameNs.game.sceneManager.goToScene(gameNs.game.splash.title);
        this.update = this.update.bind(this);

        // Interface testing
        gameNs.game.interface = new Interface(gameNs.game.canvas.width, gameNs.game.canvas.height);
        gameNs.game.input.bind(gameNs.game.interface.trigger, "p");
        
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
        gameNs.game.octo.update(gameNs.game.dt);
        let cols = gameNs.game.collisionManager.checkBoxColliderArray();

        gameNs.game.sceneManager.update();
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
        this.octo.draw(this.ctx);

        this.collisionManager.render(this.ctx);

        gameNs.game.player.draw(this.ctx);
        gameNs.game.testHeart.render(this.ctx);
        gameNs.game.testBomb.render(this.ctx);
        gameNs.game.testRupee.render(this.ctx);
        gameNs.game.testKey.render(this.ctx);
        //gameNs.game.interface.render(this.ctx);
    }
}
