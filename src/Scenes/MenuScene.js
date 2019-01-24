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
    gameNs.game.cursAlive = false;
    gameNs.game.spaceAlive = true;;
    this.time = 0;
    this.spaceTime = 0;
    this.title = title;
    this.curX = 250;
    gameNs.game.curY = 200;
    //this.playBtn = new AssetManager(200, 200, 500, 250, "mycanvas");
    this.playBtn = new Image();
    this.cursorBtn = new Image();
    this.instructionsBtn = new Image();
    this.playBtn.src = "resources/play.png";
    this.cursorBtn.src = "resources/cursor.png";
    this.instructionsBtn.src = "resources/instructions.png"



    ///this.playBtn.load("resources/img/play_button.png");
    //this.playBtn.setSpriteSheet(false, 3, 10);
      this.startingPosition = [];


  }


  update()
  {

    this.time++;
    if (this.time >= 30)
    {
      gameNs.game.cursAlive = true;
      this.time = 0;
    }

    this.spaceTime++;
    if (this.time >= 60)
    {
      gameNs.game.spaceAlive = true;
      this.spaceTime = 0;
      gameNs.game.spaceAlive = false;
    }


  }

cursorMoveUp()
{
  if ( gameNs.game.cursAlive === true)
  {
    if (gameNs.game.curY === 200)
    {
      gameNs.game.curY -=0;
    }
    else if (gameNs.game.curY === 675)
    {
      gameNs.game.curY -= 275;
    }
    else
    {
      gameNs.game.curY -= 100;
      gameNs.game.cursAlive = false;
    }
  }

}


cursorMoveDown()
{
  if (gameNs.game.cursAlive === true)
  {
    if (gameNs.game.curY >= 750)
    {
    gameNs.game.curY +=0;
    }
    else if (gameNs.game.curY === 400)
    {
      gameNs.game.curY += 175;
      console.log(  gameNs.game.curY);
    }
    else {
      gameNs.game.curY += 100;
      gameNs.game.cursAlive = false;
    }
  }
}

navigation()
{
  if (gameNs.game.curY === 675 && gameNs.game.sceneManager.getScene() === "Menu")
  {
    gameNs.game.sceneManager.goToScene("Play");
  }

  if (gameNs.game.curY === 775)
  {
    gameNs.game.sceneManager.goToScene("Instructions");
  }
}
/**
  * creates a canvas and context
  * changes the color of the background to green
  * changes the font and the font size
  */
  draw()
  {


    //ctx.font = '100px serif'; //48
    //this.playBtn.draw();
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.ctx.drawImage(this.playBtn,325, 650, 150, 100);
    gameNs.game.ctx.drawImage(this.instructionsBtn,325, 750, 300, 100);

    gameNs.game.ctx.drawImage(this.cursorBtn, this.curX, gameNs.game.curY, 50, 50);

    gameNs.game.ctx.beginPath();
    gameNs.game.ctx.moveTo(200, 125);
    gameNs.game.ctx.lineTo(900, 125);
    gameNs.game.ctx.lineTo(900, 525);
    gameNs.game.ctx.lineTo(200, 525);
    gameNs.game.ctx.closePath();

  // the outline
    gameNs.game.ctx.lineWidth = 25;
    gameNs.game.ctx.strokeStyle = '#666666';
    gameNs.game.ctx.stroke();

  // the fill color
    gameNs.game.ctx.fillStyle = "#FFCC00";
    //gameNs.game.ctx.fill();

    //ctx.fillText(this.title, 100,100);
  }


}
