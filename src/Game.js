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
       gameNs.game.EndScene = new EndScene("Ending");

       gameNs.game.sceneManager.addScene(gameNs.game.instructions);
       gameNs.game.sceneManager.addScene(gameNs.game.splash);
       gameNs.game.sceneManager.addScene(gameNs.game.play);
       gameNs.game.sceneManager.addScene(gameNs.game.menu);
       gameNs.game.sceneManager.addScene(gameNs.game.EndScene);
       gameNs.game.sceneManager.goToScene(gameNs.game.EndScene.title);
       this.update = this.update.bind(this);

        //   Initialise game variables.
        gameNs.game.prevTime = Date.now();
        gameNs.game.globalInput.bind(gameNs.game.menu.cursorMoveUp, "ArrowUp");
        gameNs.game.globalInput.bind(gameNs.game.menu.cursorMoveDown, "ArrowDown");
        gameNs.game.globalInput.bind(gameNs.game.menu.navigation, "Enter");
        gameNs.game.globalInput.bind(gameNs.game.instructions.comeBack, "Escape");
        gameNs.game.globalInput.bind(gameNs.game.splash.goNext, " ");
        gameNs.game.globalInput.bind(gameNs.game.EndScene.reset, "r");

        gameNs.game.play.initWorld();
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
