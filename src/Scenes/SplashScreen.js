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
    this.splash = new Image();
    this.splash.src = "resources/splash.jpg";
    this.startingPosition = [];

    var text;
    this.text = "Space to Start";
  }


  update()
  {
  }

  goNext()
  {
    if (gameNs.game.sceneManager.getScene() === "Splash")
    {
      gameNs.game.sceneManager.goToScene("Menu");
    }
  }


/**
  * Draws an image
  * Changes fonts
  * Draws am image
  */
  draw()
  {
    gameNs.game.ctx.drawImage(this.splash,0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.ctx.font= "100px VT323"; //48
    gameNs.game.ctx.fillText(this.text, gameNs.game.canvas.width / 2 - 250,gameNs.game.canvas.height - 50);
    gameNs.game.ctx.fill();
  }
}
