/**
 * @author John O'Grady
 * The scene for naming the character
 */

class NameScene {
  /**
   * @param {title} string title of the nameScenes.
   * This construcor uses the keyword super to inherit from the Scene class
   */
  constructor(title) {
    this.title = title;
    this.letters = [];
    var width = 32;
    var height = 48;

    this.return = false;
    this.enterText;

    var position = new Vector2(gameNs.game.canvas.width / 2 - (48 * 2.5),gameNs.game.canvas.height / 2 - 48 * 5);  
    var xOffSet = 10;
    var yOffSet = 10;
    for(var i = 0; i < 5; i++){
      for(var j = 0; j < 6; j++){
        var letter = "A";
        var newPosition = new Vector2(position.x + width * j + (xOffSet * j), position.y + height * i + (yOffSet * i));

        this.dragObject = new Interactable(null, String.fromCharCode(letter.charCodeAt(0) + j + (i * 6)), width, height, newPosition);
        this.dragObject.draggable = new Draggable(this.dragObject);
        this.letters.push(this.dragObject);
      }
    }
    
    document.addEventListener("mouseup", this.checkValid.bind(this), true);
    this.text = "Press Shift to Return to the Main Menu";
    this.instructions = "Drag and drop letters in to the top box to create your name.";
    this.returnToMain = this.returnToMain.bind(this);
    this.nameArea = new DropArea(250, 48, new Vector2(position.x, position.y - 100));
    this.nameArea.draggable = new DropZone(this.nameArea);
  }

  update(){
  }

  goToScene(){
    this.return = false;
    this.nameArea.text = "";
  }

  updateName(row) {
    console.log(row);
    this.row = row;
  }

  checkValid(){
    if(this.letters == undefined || this.letters.length <=0){
      // do nothing
    } else {
      console.log(this.nameArea.getBoundingBox());
      for(var j = 0; j < this.letters.length; j++){ // first iterate through all the draggables
          var dropzone = this.nameArea.getBoundingBox(); // get the bounds of the dropzone
          var draggable = this.letters[j].getBoundingBox();
          if(utilities.boundingBoxCollision(draggable, dropzone)){ 
            console.log(draggable);
            this.nameArea.validDrop(); 
            this.nameArea.addLetter(this.letters[j].text);
          }
          
          this.letters[j].updatePosition(this.letters[j].draggable.origin.x,this.letters[j].draggable.origin.y);
        }
      }
  }

  returnToMain(){
    if(this.nameArea.text !== "" && gameNs.game.sceneManager.getScene() === "NameScene"){
      if(this.row === 1){
        gameNs.game.nameSlotOne = this.nameArea.text;
      } else if (this.row === 2) {
        gameNs.game.nameSlotTwo = this.nameArea.text;
      } else {
        gameNs.game.nameSlotThree = this.nameArea.text;
      }
      this.return = true;
      if(this.return){
        gameNs.game.sceneManager.goToScene("Menu");
      }
    }
  }

  /**
   * draws the scene
   */
  draw() {
    
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.ctx.fillStyle = "Black";
    gameNs.game.ctx.fillRect(0,0,gameNs.game.canvas.width, gameNs.game.canvas.height);

    for(var i = 0; i < this.letters.length; i++){
      this.letters[i].draw(gameNs.game.ctx);
    }
    this.nameArea.draw(gameNs.game.ctx);

    gameNs.game.ctx.beginPath();
    if(this.text !== null){
      gameNs.game.ctx.font = "34px VT323";
      gameNs.game.ctx.fillStyle = "White";
      gameNs.game.ctx.fillText(
      this.text,
      gameNs.game.canvas.width / 2 - 250,
      gameNs.game.canvas.height - 200);
    }

    if(this.instructions !== null){
      gameNs.game.ctx.font = "34px VT323";
      gameNs.game.ctx.fillStyle = "White";
      gameNs.game.ctx.fillText(
      this.instructions,
      gameNs.game.canvas.width / 2 - 400,
      gameNs.game.canvas.height - 250);
    }

    // the outline
    gameNs.game.ctx.lineWidth = 5;
    gameNs.game.ctx.strokeRect(gameNs.game.canvas.width / 2 - 150, gameNs.game.canvas.height / 2 - 32 * 8, 48 * 6, 48 * 7);

    gameNs.game.ctx.closePath();
    gameNs.game.ctx.fill();     
  }
}