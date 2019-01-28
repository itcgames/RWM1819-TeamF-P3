/**
 * @author John O'Grady
 * Interactable object that represents draggable entities in game
 */
class Interactable {
  /**
   * Constrctuor for interactable
   * @param {*} path - image path if the interactable has a sprite
   * @param {*} text - text to be renderned within the bounds
   * @param {*} width - width of the interactable zone
   * @param {*} height - height of the interactable zone
   * @param {*} position - position in world space
   */
  constructor(path, text, width, height, position) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.text = text;
    this.sprite = null;
    this.path = path;
    this.draggable = {}; // reference to the drag and drop component of the interactable
    this.renderBorder = false;

    if (this.path !== null) {
      this.sprite = new AssetManager(position.x, position.y, this.width, this.height, 0, 0);
    }
  }

  /**
   * return an object contain the dimensions and position of the interactable object - evoked by drag and drop component
   */
  getBoundingBox(){
    return {x: this.position.x, y: this.position.y, width: this.width, height: this.height};
  }

  /**
   *  stop rendering a rectangular border around the interactable, evoked in drag and drop component
   */
  hoverEnd(){
    this.renderBorder = false;
  }

  /**
   * update the current position of the interactable - used by the drag and drop component
   * @param {*} x 
   * @param {*} y 
   */
  updatePosition(x,y){
    this.position.x = x;
    this.position.y = y;
  }

  /**
   * render a rectangular border around the interactable, evoked in drag and drop component
   */
  hoverStart(){  
    this.renderBorder = true;
  }

  /**
   * render the image if the interactable is assigned one otherwise render the text element if it contains one
   * @param {*} ctx - canvas context
   */
  draw(ctx){
    if(this.sprite === null){
      if(this.text !== null){
        ctx.beginPath();
        gameNs.game.ctx.fillStyle = "White";
        gameNs.game.ctx.font = "34px VT323";
        ctx.fillText(
          this.text,
          this.position.x + this.width / 4.5,
          this.position.y + this.height / 1.25);       
      }
      if(this.renderBorder){
        gameNs.game.ctx.lineWidth = 1;
        gameNs.game.ctx.strokeRect(this.position.x - 4, this.position.y + 5, this.width, this.height);
      }
      ctx.closePath();

    } else {
      this.sprite.draw(ctx);
    }
  }
}

/**
 * @author John O'Grady
 * Companion class to interactable class - provides a drop area for the interactables to detect
 */
class DropArea{
  /**
   * constructor
   * @param {*} width width of the drop area
   * @param {*} height heght of the drop area
   * @param {*} position global positions of the area
   */
  constructor(width, height, position){
    this.position = position;
    this.width = width;
    this.height = height;
    this.text = "";
    this.draggable = {};
  }

  /**
   * return an object contain the dimensions and position of the interactable object - evoked by drag and drop component
   */
  getBoundingBox(){
    return {x: this.position.x, y: this.position.y, width: this.width, height: this.height};
  }

  // required for drag and drop component but unused
  validDrop(){
  }

  /**
   * Add a letter to the text object of the drop area
   * @param {*} letter letter to fill text area for rendering
   */
  addLetter(letter){
    this.text = this.text + letter;
  }

  /**
   * render the drop area border and any text contained within
   */
  draw(){
    gameNs.game.ctx.beginPath();
    if(this.text !== null){
      gameNs.game.ctx.font = "64px VT323";
      gameNs.game.ctx.fillText(
      this.text,
      this.position.x,
      this.position.y + this.height);    
    }
    gameNs.game.ctx.lineWidth = 1;
    gameNs.game.ctx.strokeRect(this.position.x - 4, this.position.y + 5, this.width, this.height);
    gameNs.game.ctx.closePath(); 
  }
}