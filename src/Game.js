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
        document.body.appendChild(gameNs.game.canvas);

       //   Initialise game variables.
        gameNs.game.collisionManager = new CollisionManager();

        gameNs.game.tileGrid = new Grid(64, 16, 13);        
        //   Initialise game variables.
        gameNs.game.player = new Player();
        gameNs.game.player.init(gameNs.game.canvas.ctx);
        gameNs.game.input = new Input();
        gameNs.game.input.bind(gameNs.game.player.moveUp, "w");
        gameNs.game.input.bind(gameNs.game.player.moveLeft, "a");
        gameNs.game.input.bind(gameNs.game.player.moveDown, "s");
        gameNs.game.input.bind(gameNs.game.player.moveRight, "d");
        gameNs.game.input.bind(gameNs.game.player.meleeAttack, " ");
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
        gameNs.game.player.update(gameNs.game.dt);

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

        this.tileGrid.draw(this.ctx);

        //  Render game objects here.
        this.collisionManager.render(this.ctx);
        
        //  Render game objects here.
        gameNs.game.player.draw(this.ctx);
    }
}