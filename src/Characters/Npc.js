/**
 * @description Base class for npc objects.
 * @author D.J. O'Leary
 */
class Npc extends Character {
    
    /**
     * 
     * @param {Vector2} position 
     * @param {Collider} collider 
     * @param {Sprite} sprite 
     * @param {Grid} grid
     */
    constructor(position, collider, sprite, grid) {
        super(position, collider, sprite);
        this.grid = grid;
        this.tileSize = this.grid.tileSize;
        this.updateGridPosition(this.tileSize);
        this.targetPos = new Vector2(this.gridPosition.x, this.gridPosition.y);        
        this.tilesToLeft = 0;    //  The number of tiles to the left.
        this.tilesToRight = 0;   //  The number of tiles to the right.
    }

    /**
     * 
     * @param {DeltaTime} dt 
     */
    wander() {
        this.updateGridPosition(this.tileSize);
        //  If in the target grid position.
        if (this.gridPosition.x === this.targetPos.x && this.gridPosition.y === this.targetPos.y) {
            //  Get our chance of turning left.
            var leftWeight = this.determineTurnWeights();
            //  Save the old orientation so we know where we came from.
            var oldOrientation = this.orientation;
            //  Turn left or right.
            this.turn(leftWeight);
            //  If there is nowhere to go don't set a new target so we will immediately turn again.
            if (this.tilesToLeft === 0 && this.tilesToRight === 0){
                /*  Do Nothing  */
            } else {
                //  Pick a new target in the direction we are facing.
                this.determineNewTarget(oldOrientation); 
            }          

        } else {
            //  Move along the grid by the size of one tile.
            this.move();
        }
    }

    /**
     * Determine the Npc's percent chance of turning left based on the number of tiles in that direction.
     * The remaining percentage is the Npc's chance of turning right.
     */
    determineTurnWeights(){
        //  Determine the weightings for turning.   
        var leftWeight = 0; 
        this.tilesToLeft = 0;
        this.tilesToRight = 0;   
        this.nearestObstacle() 
        switch (this.orientation) {
            //  If we are currently facing North.
            case this.OrientationEnum.North:
                //  Along the x-axis.
                leftWeight = Math.floor((this.tilesToLeft / this.grid.width) * 100); 
                break;

            //  If we are currently facing East.
            case this.OrientationEnum.East:
                //  Along the y-axis.
                leftWeight = Math.floor((this.tilesToLeft / this.grid.height) * 100); 
                break;

            //  If we are currently facing South.
            case this.OrientationEnum.South:
                //  Along the x-axis.
                leftWeight = Math.floor((this.tilesToLeft / this.grid.width) * 100);                   
                break;

            //  If we are currently facing West.
            case this.OrientationEnum.West:                
                //  Along the y-axis.
                leftWeight = Math.floor((this.tilesToLeft / this.grid.height) * 100);
                break;

            default:
                /*  Do Nothing  */
                break;
        }
        return leftWeight;
    }

    /**
     * 
     */
    nearestObstacle(){
        switch (this.orientation) {
            //  If we are currently facing North.
            case this.OrientationEnum.North:
                var tempLeftCoordinate = this.gridPosition.x - 1;
                while(tempLeftCoordinate > 0 && this.grid.getTile(tempLeftCoordinate, this.gridPosition.y).isTraversable){
                    tempLeftCoordinate--;
                }
                this.tilesToLeft = this.gridPosition.x - (tempLeftCoordinate + 1);
                
                var tempRightCoordinate = this.gridPosition.x + 1;
                while(tempRightCoordinate < this.grid.width && this.grid.getTile(tempRightCoordinate, this.gridPosition.y).isTraversable){
                    tempRightCoordinate++;
                }
                this.tilesToRight = (tempRightCoordinate - 1) - this.gridPosition.x;
                break;

            //  If we are currently facing East.
            case this.OrientationEnum.East:
                var tempLeftCoordinate = this.gridPosition.y - 1;
                while(tempLeftCoordinate > 0 && this.grid.getTile(this.gridPosition.x, tempLeftCoordinate).isTraversable){
                    tempLeftCoordinate--;
                }
                this.tilesToLeft = this.gridPosition.y - (tempLeftCoordinate + 1);
                
                var tempRightCoordinate = this.gridPosition.y + 1;
                while(tempRightCoordinate < this.grid.height && this.grid.getTile(this.gridPosition.x, tempRightCoordinate).isTraversable){
                    tempRightCoordinate++;
                }
                this.tilesToRight = (tempRightCoordinate - 1) - this.gridPosition.y;
                break;

            //  If we are currently facing South.
            case this.OrientationEnum.South:
                var tempRightCoordinate = this.gridPosition.x - 1;
                while(tempRightCoordinate > 0 && this.grid.getTile(tempRightCoordinate, this.gridPosition.y).isTraversable){
                    tempRightCoordinate--;
                }
                this.tilesToRight = this.gridPosition.x - (tempRightCoordinate + 1);
                
                var tempLeftCoordinate = this.gridPosition.x + 1;
                while(tempLeftCoordinate < this.grid.width && this.grid.getTile(tempLeftCoordinate, this.gridPosition.y).isTraversable){
                    tempLeftCoordinate++;
                }
                this.tilesToLeft = (tempLeftCoordinate - 1) - this.gridPosition.x;
                break;

            //  If we are currently facing West.
            case this.OrientationEnum.West:
                var tempRightCoordinate = this.gridPosition.y - 1;
                while(tempRightCoordinate > 0 && this.grid.getTile(this.gridPosition.x, tempRightCoordinate).isTraversable){
                    tempRightCoordinate--;
                }
                this.tilesToRight = this.gridPosition.y - (tempRightCoordinate + 1);
                
                var tempLeftCoordinate = this.gridPosition.y + 1;
                while(tempLeftCoordinate < this.grid.height && this.grid.getTile(this.gridPosition.x, tempLeftCoordinate).isTraversable){
                    tempLeftCoordinate++;
                }
                this.tilesToLeft = (tempLeftCoordinate - 1) - this.gridPosition.y;
                break;
        
            default:
                /*  Do Nothing  */
                break;
        }
    }

    /**
     * Generates a random number to decide if the Npc should turn left or right from its current position.
     * @param {Integer} leftWeight The percentage chance of turning left.
     */
    turn(leftWeight) {
        //  Get a random number between 1 and 100.
        var result = Npc.RandomNum(1,100);
        switch (this.orientation) {
            //  If we are currently facing North.
            case this.OrientationEnum.North:
                //  If the random number is below or equal to our percent chance of turning left. Turn left.
                if (result <= leftWeight) {
                    this.orientation = this.OrientationEnum.West;
                } else {    //  Else turn right.
                    this.orientation = this.OrientationEnum.East;
                }
                break;

            //  If we are currently facing East.
            case this.OrientationEnum.East:
                //  If the random number is below or equal to our percent chance of turning left. Turn left.
                if (result <= leftWeight) {
                    this.orientation = this.OrientationEnum.North;
                } else {    //  Else turn right.
                    this.orientation = this.OrientationEnum.South;
                }
                break;

            //  If we are currently facing South.
            case this.OrientationEnum.South:
                //  If the random number is below or equal to our percent chance of turning left. Turn left.
                if (result <= leftWeight) {
                    this.orientation = this.OrientationEnum.East;
                } else  {    //  Else turn right.
                    this.orientation = this.OrientationEnum.West;
                }
                break;

            //  If we are currently facing West.
            case this.OrientationEnum.West:
                //  If the random number is below or equal to our percent chance of turning left. Turn left.
                if (result <= leftWeight) {
                    this.orientation = this.OrientationEnum.South;
                } else {    //  Else turn right.
                    this.orientation = this.OrientationEnum.North;
                }
                break;
            default:
                /*  Do Nothing  */
                break;
        }
    }

    /**
     * Determines where the new target position on the grid is.
     * @param {OrientationEnum} oldOrientation
     */
    determineNewTarget(oldOrientation){
        var tilesToMove = 0;
        switch (this.orientation) {
            //  If we are currently facing North.
            case this.OrientationEnum.North:
                //  If we were facing East.
                if (oldOrientation === this.OrientationEnum.East){
                    tilesToMove = Npc.RandomNum(1, this.tilesToLeft);
                } else if (oldOrientation === this.OrientationEnum.West) { //  If we were facing West.
                    tilesToMove = Npc.RandomNum(1, this.tilesToRight);                        
                }            
                this.targetPos.y -= tilesToMove;        
                break;

            //  If we are currently facing East.
            case this.OrientationEnum.East:  
                //  If we were facing North.                  
                if (oldOrientation === this.OrientationEnum.North){
                    tilesToMove = Npc.RandomNum(1, this.tilesToRight);
                } else if (oldOrientation === this.OrientationEnum.South) { //  If we were facing South.
                    tilesToMove = Npc.RandomNum(1, this.tilesToLeft);                        
                } 
                this.targetPos.x += tilesToMove;
                break;

            //  If we are currently facing South.
            case this.OrientationEnum.South:
                //  If we were facing East. We turned right to get our new orientation.
                if (oldOrientation === this.OrientationEnum.East){
                    tilesToMove = Npc.RandomNum(1, this.tilesToRight);                        
                } else if (oldOrientation === this.OrientationEnum.West) { //  If we were facing West. We turned left to get our new orientation.
                    tilesToMove = Npc.RandomNum(1, this.tilesToLeft);
                }              
                this.targetPos.y += tilesToMove;
                break;

            //  If we are currently facing West.
            case this.OrientationEnum.West:
                //  If we were facing North. We turned left to get our new orientation.
                if (oldOrientation === this.OrientationEnum.North){
                    tilesToMove = Npc.RandomNum(1, this.tilesToLeft);                        
                } else if (oldOrientation === this.OrientationEnum.South) { //  If we were facing South. We turned right to get our new orientation.
                    tilesToMove = Npc.RandomNum(1, this.tilesToRight);
                } 
                this.targetPos.x -= tilesToMove;
                break;

            default:
                /*  Do Nothing  */
                break;                                        
        }
        //  Checks if the new target is in the grid and if not makes it.
        this.targetInGrid();
    }

    /**
     * Checks if the target is in the grid and if not sets it to be.
     */
    targetInGrid(){
        if (this.targetPos.x < 0) {
            this.targetPos.x = 0;
        } else if (this.targetPos.x > this.grid.width - 1) {
            this.targetPos.x = this.grid.width - 1;
        } 

        if (this.targetPos.y < 0) {
            this.targetPos.y = 0;
        } else if (this.targetPos.y > this.grid.height) {
            this.targetPos.y = this.grid.height - 1;
        }
    }

    /**
     * Moves the Npc along the grid by the size of one tile.
     */
    move(){
        /**
         * Move along the x-axis.
         */
        if (this.gridPosition.x < this.targetPos.x){
            this.position.x += this.tileSize;
        } else if (this.gridPosition.x > this.targetPos.x) {
            this.position.x -= this.tileSize;
        }

        /**
         * Move along the y-axis.
         */
        if (this.gridPosition.y < this.targetPos.y){
            this.position.y += this.tileSize;
        } else if (this.gridPosition.y > this.targetPos.y) {
            this.position.y -= this.tileSize;
        }
    }    

    /**
     * 
     * @param {Integer} min 
     * @param {Integer} max 
     */
    static RandomNum(min, max) {
        return Math.floor((Math.random() * max) - min);
    }
}