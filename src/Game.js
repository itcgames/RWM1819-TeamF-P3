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
       gameNs.game.collisionManager = new CollisionManager();
       gameNs.game.input = new Input();
       gameNs.sceneManager = new SceneManager();
       gameNs.splash = new SplashScreen("Splash");
       gameNs.menu = new MenuScene("Menu");
       gameNs.play = new Play("Play");

       gameNs.sceneManager.addScene(gameNs.splash);
       gameNs.sceneManager.addScene(gameNs.menu);
       gameNs.sceneManager.addScene(gameNs.play);
       gameNs.sceneManager.goToScene(gameNs.menu.title);
       this.update = this.update.bind(this);





        //   Initialise game variables.



        //   Initialise game variables.
        gameNs.game.player = new Player();
        gameNs.game.player.init(gameNs.game.canvas.ctx);

        gameNs.game.input.bind(gameNs.game.player.moveUp, "w");
        gameNs.game.input.bind(gameNs.game.player.moveLeft, "a");
        gameNs.game.input.bind(gameNs.game.player.moveDown, "s");
        gameNs.game.input.bind(gameNs.game.player.moveRight, "d");
        gameNs.game.input.bind(gameNs.game.player.meleeAttack, " ");
        gameNs.game.input.bind(gameNs.sceneManager.goToNextScene, "x");
        gameNs.game.input.bind(gameNs.menu.cursorMoveUp, "ArrowUp");
        gameNs.game.input.bind(gameNs.menu.cursorMoveDown, "ArrowDown");
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
        gameNs.sceneManager.update()
        gameNs.game.input.update();
        ;

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
        //this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
         gameNs.sceneManager.render()

    }
}
