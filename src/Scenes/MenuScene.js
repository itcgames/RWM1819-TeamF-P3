/**
 * @author Conor O'Toole
 * C00206724
 * The scene for the main menu
 */

class MenuScene {
  /**
   * @param {title} string title of the MenuScene.
   * This construcor uses the keyword super to inherit from the Scene class
   */
  constructor(title) {
    gameNs.game.cursAlive = false;
    gameNs.game.spaceAlive = true;
    this.time = 0;
    this.spaceTime = 0;
    this.title = title;
    this.curX = 250;
    gameNs.game.curY = 200;

    this.cursorBtn = new Image();
    this.cursorBtn.src = "resources/cursor.png";
    this.instructiontTxt = "Instructions";
    this.startingPosition = [];

    gameNs.game.nameSlotOne = "";
    gameNs.game.nameSlotTwo = "";
    gameNs.game.nameSlotThree = "";
  }

  /**
   * update loop for the menu scene - prevent mutliple key detection
   */
  update() {
    this.time++;
    if (this.time >= 30) {
      gameNs.game.cursAlive = true;
      this.time = 0;
    }

    this.spaceTime++;
    if (this.time >= 60) {
      gameNs.game.spaceAlive = true;
      this.spaceTime = 0;
      gameNs.game.spaceAlive = false;
    }
  }

  /**
   * move the menu cursor up
   */
  cursorMoveUp() {
    if (gameNs.game.cursAlive === true) {
      if (gameNs.game.curY === 200) {
        gameNs.game.curY -= 0;
      } else if (gameNs.game.curY === 660) {
        gameNs.game.curY -= 260;
      } else {
        gameNs.game.curY -= 100;
        gameNs.game.cursAlive = false;
      }
    }
  }

  /**
   * move the menu cursor down
   */
  cursorMoveDown() {
    if (gameNs.game.cursAlive === true) {
      if (gameNs.game.curY >= 660) {
        gameNs.game.curY += 0;
      } else if (gameNs.game.curY === 400) {
        gameNs.game.curY += 260;
      } else {
        gameNs.game.curY += 100;
        gameNs.game.cursAlive = false;
      }
    }
  }

  /**
   * On enter key press detection - based on the cursors position navigate to
   */
  navigation() {
    if ((gameNs.game.curY === 200 || gameNs.game.curY === 300 || gameNs.game.curY === 400) && gameNs.game.sceneManager.getScene() === "Menu") {
      if (gameNs.game.curY === 200 && gameNs.game.nameSlotOne !== "") {
        gameNs.game.sceneManager.goToScene("Play");
      } else if (gameNs.game.curY === 300 && gameNs.game.nameSlotTwo !== "") {
        gameNs.game.sceneManager.goToScene("Play");
      } else if (gameNs.game.curY === 400 && gameNs.game.nameSlotThree !== "") {
        gameNs.game.sceneManager.goToScene("Play");
      } else {
        gameNs.game.name.updateName((gameNs.game.curY / 100) - 1);
        gameNs.game.name.goToScene();
        gameNs.game.sceneManager.goToScene("NameScene");
      }
    }

    if (gameNs.game.curY === 660) {
      gameNs.game.sceneManager.goToScene("Instructions");
    }
  }

  /**
   * creates a canvas and context
   * changes the color of the background to green
   * changes the font and the font size
   */
  draw() {
    gameNs.game.ctx.clearRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    gameNs.game.ctx.drawImage(this.cursorBtn, this.curX, gameNs.game.curY, 50, 50);
    gameNs.game.ctx.fillStyle = "Black";
    gameNs.game.ctx.fillRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);

    // render the border around the name area
    gameNs.game.ctx.beginPath();
    gameNs.game.ctx.lineWidth = 15;
    gameNs.game.ctx.strokeStyle = '#666666';
    gameNs.game.ctx.moveTo(100, 125);
    gameNs.game.ctx.lineTo(gameNs.game.canvas.width - 100, 125);
    gameNs.game.ctx.lineTo(gameNs.game.canvas.width - 100, gameNs.game.canvas.height - 250);
    gameNs.game.ctx.lineTo(100, gameNs.game.canvas.height - 250);
    gameNs.game.ctx.lineTo(100, 125);
    gameNs.game.ctx.stroke();
    gameNs.game.ctx.closePath();

    if (gameNs.game.nameSlotOne !== null) {
      gameNs.game.ctx.beginPath();
      gameNs.game.ctx.font = "64px VT323";
      gameNs.game.ctx.fillStyle = "White";
      gameNs.game.ctx.fillText(
        gameNs.game.nameSlotOne,
        300,
        250);
      gameNs.game.ctx.closePath();
    }

    if (gameNs.game.nameSlotTwo !== null) {
      gameNs.game.ctx.beginPath();
      gameNs.game.ctx.font = "64px VT323";
      gameNs.game.ctx.fillStyle = "White";
      gameNs.game.ctx.fillText(
        gameNs.game.nameSlotTwo,
        300,
        350);
      gameNs.game.ctx.closePath();
    }

    if (gameNs.game.nameSlotThree !== null) {
      gameNs.game.ctx.beginPath();
      gameNs.game.ctx.font = "64px VT323";
      gameNs.game.ctx.fillStyle = "White";
      gameNs.game.ctx.fillText(
        gameNs.game.nameSlotThree,
        300,
        450);
      gameNs.game.ctx.closePath();
    }

    // the outline
    gameNs.game.ctx.lineWidth = 25;
    gameNs.game.ctx.strokeStyle = "Blue";
    gameNs.game.ctx.stroke();

    // the fill color
    gameNs.game.ctx.fillStyle = "#FFCC00";
    gameNs.game.ctx.font = "100px VT323";
    gameNs.game.ctx.fillText(this.instructiontTxt, gameNs.game.canvas.width / 2 - 250, 725);
    gameNs.game.ctx.drawImage(this.cursorBtn, this.curX, gameNs.game.curY, 40, 40);
  }
}