/**
 * @author Conor O'Toole
 * C00206724
 * The scene for the Splash Screen
 */

class SplashScreen
{
/**
  * @param {title} string title of the MenuScene.
  * This construcor uses the keyword super to inherit from the Scene class
  */
  constructor(title)
  {
    this.title = title;
    //this.playBtn = new AssetManager(200, 200, 500, 250, "mycanvas");
    this.splash = new Image();
    this.splash.src = "resources/images/splash.jpg";

    ///this.playBtn.load("resources/img/play_button.png");
    //this.playBtn.setSpriteSheet(false, 3, 10);
      this.startingPosition = [];
      this.gestureManager = new GestureManager();
      this.gestureManager.init();

      var text;
      this.text = "Space to Start";


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
        //gameNs.sceneManager.goToScene(gameNs.game.title)
        gameNs.sceneManager.goToNextScene();
        console.log("change scene");
      }
    }

    /*while (gameNs.game.ctx.globalAlpha <= 1.0)
    {
      gameNs.game.ctx.globalAlpha - 0.02;
    }*/
    //while (gameNs.game.ctx.globalAlpha >= 0.0)

    //  gameNs.game.ctx.globalAlpha = 0.01;



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



    //this.playBtn.draw();
    gameNs.game.ctx.drawImage(this.splash,0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);

    //gameNs.game.ctx.fill();

    gameNs.game.ctx.globalAlpha = 0.1;
    gameNs.game.ctx.font= "100px VT323"; //48
    gameNs.game.ctx.fillText(this.text, 700,900);

  }


}
