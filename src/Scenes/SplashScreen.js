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
    this.splash.src = "resources/splash.jpg";

    ///this.playBtn.load("resources/img/play_button.png");
    //this.playBtn.setSpriteSheet(false, 3, 10);
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
    //this.playBtn.draw();
    gameNs.game.ctx.drawImage(this.splash,0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);

    //gameNs.game.ctx.fill();

    //gameNs.game.ctx.globalAlpha = 0.1;
    gameNs.game.ctx.font= "100px VT323"; //48
    gameNs.game.ctx.fillText(this.text, 700,900);

  }


}
