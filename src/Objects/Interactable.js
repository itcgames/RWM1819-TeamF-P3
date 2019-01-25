class Interactable {
  constructor(path, text, width, height, position) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.text = text;
    this.sprite = null;
    this.path = path;
    this.draggable = {};
    this.renderBorder = false;

    if (this.path !== null) {
      this.sprite = new AssetManager(position.x, position.y, this.width, this.height, 0, 0);
    }
  }

  getBoundingBox(){
    return {x: this.position.x, y: this.position.y, width: this.width, height: this.height};
  }

  hoverEnd(){
    this.renderBorder = false;
  }

  updatePosition(x,y){
    this.position.x = x;
    this.position.y = y;
  }

  hoverStart(){  
    this.renderBorder = true;
  }

  draw(ctx){
    if(this.sprite === null){
      if(this.text !== null){
        ctx.beginPath();
        ctx.font = "64px VT323";
        ctx.fillText(
          this.text,
          this.position.x,
          this.position.y + this.height);       
      }
      if(this.renderBorder){
        gameNs.game.ctx.lineWidth = 1;
        gameNs.game.ctx.strokeRect(this.position.x - 4, this.position.y + 5, 34, 50);
      }
      ctx.closePath();

    } else {
      this.sprite.draw(ctx);
    }
  }
}

class DropArea{
  constructor(width, height, position){
    this.position = position;
    this.width = width;
    this.height = height;
    this.text = "";
    this.draggable = {};
  }

  getBoundingBox(){
    return {x: this.position.x, y: this.position.y, width: this.width, height: this.height};
  }

  validDrop(){
  }

  addLetter(letter){
    this.text = this.text + letter;
  }

  update(){
  }

  draw(ctx){
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