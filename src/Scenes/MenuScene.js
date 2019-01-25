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
    gameNs.game.spaceAlive = true;
    this.time = 0;
    this.spaceTime = 0;
    this.title = title;
    this.curX = 250;
    gameNs.game.curY = 200;
    
    this.playBtn = new Image();
    this.cursorBtn = new Image();
    this.instructionsBtn = new Image();
    this.playBtn.src = "resources/play.png";
    this.cursorBtn.src = "resources/cursor.png";
    this.instructionsBtn.src = "resources/instructions.png";
    ///this.playBtn.load("resources/img/play_button.png");
    //this.playBtn.setSpriteSheet(false, 3, 10);
    this.startingPosition = [];

    gameNs.game.nameSlotOne = "";
    gameNs.game.nameSlotTwo = "";
    gameNs.game.nameSlotThree = "";
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
    else if (gameNs.game.curY === 660 )
    {
      gameNs.game.curY -= 260;
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
    if (gameNs.game.curY >= 660)
    {
    gameNs.game.curY +=0;
    }
    else if (gameNs.game.curY === 400)
    {
      gameNs.game.curY += 260;
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
  if ((gameNs.game.curY === 200 || gameNs.game.curY === 300 || gameNs.game.curY === 400)  && gameNs.game.sceneManager.getScene() === "Menu")
  {
    if(gameNs.game.curY === 200 && gameNs.game.nameSlotOne !== ""){
      gameNs.game.sceneManager.goToScene("Play");
    } else if(gameNs.game.curY === 300 && gameNs.game.nameSlotTwo !== ""){
      gameNs.game.sceneManager.goToScene("Play");
    } else if(gameNs.game.curY === 400 && gameNs.game.nameSlotThree !== ""){
      gameNs.game.sceneManager.goToScene("Play");
    } else {
      gameNs.game.name.updateName((gameNs.game.curY / 100) - 1);
      gameNs.game.name.goToScene();
      gameNs.game.sceneManager.goToScene("NameScene");
    }
  }

  if (gameNs.game.curY === 660)
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
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.ctx.drawImage(this.instructionsBtn,325, 650, 250 , 100);

    gameNs.game.ctx.drawImage(this.cursorBtn, this.curX, gameNs.game.curY, 50, 50);
    gameNs.game.ctx.beginPath();
    gameNs.game.ctx.lineWidth = 15;
    gameNs.game.ctx.strokeStyle = '#666666';
    gameNs.game.ctx.moveTo(100, 125);
    gameNs.game.ctx.lineTo(800, 125);
    gameNs.game.ctx.lineTo(800, 525);
    gameNs.game.ctx.lineTo(100, 525);
    gameNs.game.ctx.lineTo(100, 125);
    gameNs.game.ctx.stroke();
    gameNs.game.ctx.closePath();

    if(gameNs.game.nameSlotOne !== null){
      gameNs.game.ctx.beginPath();
      gameNs.game.ctx.font = "64px VT323";
      gameNs.game.ctx.fillText(
      gameNs.game.nameSlotOne ,
      300,
      250);      
      gameNs.game.ctx.closePath();
    }

    if(gameNs.game.nameSlotTwo !== null){
      gameNs.game.ctx.beginPath();
      gameNs.game.ctx.font = "64px VT323";
      gameNs.game.ctx.fillText(
      gameNs.game.nameSlotTwo,
      300,
      350);       
      gameNs.game.ctx.closePath();
    }

    if(gameNs.game.nameSlotThree !== null){
      gameNs.game.ctx.beginPath();
      gameNs.game.ctx.font = "64px VT323";
      gameNs.game.ctx.fillText(
      gameNs.game.nameSlotThree,
      300,
      450);   
      gameNs.game.ctx.closePath();
    }
    

  // the outline

  // the fill color
    gameNs.game.ctx.fillStyle = "#FFCC00";
  }
}
