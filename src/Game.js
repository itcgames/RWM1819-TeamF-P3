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
        gameNs.game.testImage = new Image(2560,2048);
        gameNs.game.testImage.src = "src/testmap.png";

        gameNs.game.interface = new Interface(gameNs.game.canvas.width, gameNs.game.canvas.height);

        
        gameNs.game.interface.trigger();
    }

    /**
     * Update function for the Game class.
     */
    update() {
        var now = Date.now();
        gameNs.game.dt = (now - gameNs.game.prevTime);
        gameNs.game.prevTime = now;

        //  Update Game here.
        gameNs.game.interface.update();

        //  Draw new frame.
        gameNs.game.render();        

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
        this.ctx.drawImage(gameNs.game.testImage,0,0);
        gameNs.game.interface.render(this.ctx);
    }
}