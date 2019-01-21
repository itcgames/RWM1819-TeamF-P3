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
       gameNs.sceneManager = new SceneManager();
       gameNs.menu = new MenuScene("Menu");
       gameNs.play = new Play("Play");

       gameNs.sceneManager.addScene(gameNs.menu);
       gameNs.sceneManager.addScene(gameNs.play);
       gameNs.sceneManager.goToScene(gameNs.menu.title);
       this.update = this.update.bind(this);


    }

    /**
     * Update function for the Game class.
     */
    update() {
        var now = Date.now();
        gameNs.game.dt = (now - gameNs.game.prevTime);
        gameNs.game.prevTime = now;

        //  Update Game here.
        gameNs.sceneManager.update()

        //  Draw new frame.
        gameNs.sceneManager.render();

        // Recursive call to Update method.
        window.requestAnimationFrame(gameNs.game.update);
    }

    /**
     * Render function for the Game class.
     */
    render() {
        //  Clear previous frame.
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        //  Render game objects here.

    }
}
