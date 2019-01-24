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
       gameNs.game.ctx.fillStyle = "green";
       gameNs.game.ctx.font = "30px Pixel-Emulator.otf";
       document.body.appendChild(gameNs.game.canvas);

       //   Initialise game variables.
       gameNs.game.collisionManager = new CollisionManager();
       gameNs.game.input = new Input();
       gameNs.game.sceneManager = new SceneManager();
       gameNs.game.splash = new SplashScreen("Splash");
       gameNs.game.menu = new MenuScene("Menu");
       gameNs.game.instructions = new InstructionsScene("Instructions");
       gameNs.game.play = new Play("Play");

       gameNs.game.sceneManager.addScene(gameNs.game.instructions);
       gameNs.game.sceneManager.addScene(gameNs.game.menu);
       gameNs.game.sceneManager.addScene(gameNs.game.splash);
       gameNs.game.sceneManager.addScene(gameNs.game.play);
       gameNs.game.sceneManager.goToScene(gameNs.game.menu.title);
       this.update = this.update.bind(this);


        //   Initialise game variables.
        gameNs.game.player = new Player();
        gameNs.game.player.init(gameNs.game.canvas.ctx);

        gameNs.game.input.bind(gameNs.game.player.moveUp, "w");
        gameNs.game.input.bind(gameNs.game.player.moveLeft, "a");
        gameNs.game.input.bind(gameNs.game.player.moveDown, "s");
        gameNs.game.input.bind(gameNs.game.player.moveRight, "d");
        gameNs.game.input.bind(gameNs.game.player.meleeAttack, " ");
        gameNs.game.input.bind(gameNs.game.menu.cursorMoveUp, "ArrowUp");
        gameNs.game.input.bind(gameNs.game.menu.cursorMoveDown, "ArrowDown");

        if (gameNs.game.curY === 300)
        {
          gameNs.game.input.bind(gameNs.game.menu.goToInstructions, "t");
        }
        gameNs.game.input.setHoldValue(1000);
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
         gameNs.game.sceneManager.render()

    }
}
