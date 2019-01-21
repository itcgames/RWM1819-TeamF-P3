/**
 * @author Conor O'Toole
 * C00206724
 * The scene for the main menu
 */

class MenuScene
{
/**
  * @param {title} string title of the MenuScene.
  * This construcor uses the keyword super to inherit from the Scene class
  */
  constructor(title)
  {
    this.title = title;
    //this.playBtn = new AssetManager(200, 200, 500, 250, "mycanvas");
    this.playBtn = new Image();
    this.cursorBtn = new Image();
    this.playBtn.src = "resources/images/Play.jpg";
    this.cursorBtn.src = "resources/images/cursor.png";

    ///this.playBtn.load("resources/img/play_button.png");
    //this.playBtn.setSpriteSheet(false, 3, 10);
      this.startingPosition = [];
      this.gestureManager = new GestureManager();
      this.gestureManager.init();
  }


  update()
  {
    if (this.gestureManager.getOnePointDetection())
    {
      this.gestureManager.getTouchPosition()

      this.startingPosition = this.gestureManager.getTouchPosition()
      //console.log( this.startingPosition)
      if (this.checkCollisionBetween(300, 50, 300, 300))
      {
        gameNs.sceneManager.goToScene(gameNs.game.title)
        console.log("change scene");
      }
    }
      /*if (this.checkCollisionBetween(300, 350, 300, 100))
      {
        gameNs.sceneManager.goToScene(gameNs.help.title)
      }
      if (this.checkCollisionBetween(300, 500, 300, 100))
      {
        gameNs.sceneManager.goToScene(gameNs.highScore.title)
      }*/

        /*if (this.checkCollisionBetween(300, 650, 300, 100)) {
            gameNs.game.tutorialBool = true;
          gameNs.sceneManager.goToScene(gameNs.game.title)
      }*/
      //gameNs.sceneManager.goToScene(gameNs.game.title)
      //gameNs.sceneManager.render()
      //this.gestureManager.resetDetection()
    //}
  }

  checkCollisionBetween(x,y,width,height)
  {
   var collides = false;
   if ((this.startingPosition[0] < x + width) &&
     (this.startingPosition[0] > x) &&
     (this.startingPosition[1] < y + height) &&
     (this.startingPosition[1] > y)){
       collides = true;
     }
   return collides;
 }


/**
  * creates a canvas and context
  * changes the color of the background to green
  * changes the font and the font size
  */
  render()
  {


    //ctx.font = '100px serif'; //48
    //this.playBtn.draw();
    gameNs.game.ctx.drawImage(this.playBtn,300, 50, 300, 300);
    gameNs.game.ctx.drawImage(this.cursorBtn, 200, 300, 50, 50);

    gameNs.game.ctx.beginPath();
    gameNs.game.ctx.moveTo(100, 100);
    gameNs.game.ctx.lineTo(100, 300);
    gameNs.game.ctx.lineTo(300, 300);
    gameNs.game.ctx.closePath();

  // the outline
    gameNs.game.ctx.lineWidth = 10;
    gameNs.game.ctx.strokeStyle = '#666666';
    gameNs.game.ctx.stroke();

  // the fill color
    gameNs.game.ctx.fillStyle = "#FFCC00";
    gameNs.game.ctx.fill();

    //ctx.fillText(this.title, 100,100);
  }


}
