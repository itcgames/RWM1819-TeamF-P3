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

        gameNs.game.tileGrid = new Grid(64, 16, 13);    
        gameNs.game.octo = new Octorok(new Vector2(0,0), new BoxCollider(), null, gameNs.game.tileGrid);  
        gameNs.game.tileGrid.getTile(0, 2).isTraversable = false;  
        gameNs.game.tileGrid.getTile(2, 1).isTraversable = false;  
        gameNs.game.tileGrid.getTile(1, 2).isTraversable = false; 
        gameNs.game.tileGrid.getTile(2, 0).isTraversable = false;  
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
        this.octo.draw(this.ctx);

        //  Render game objects here.
        this.collisionManager.render(this.ctx);
    }
}