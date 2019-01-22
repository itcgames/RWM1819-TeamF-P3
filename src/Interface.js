/**
 * @description Controls the pause menu's functionality and animation
 * @author John O'Meara
 */

class Interface {

  /**
   * Creates the interface object
   * @param {number} screenWidth Width of the game screen
   * @param {number} screenHeight Height of the game screen
   */
  constructor(screenWidth,screenHeight) {

    this.active = false;
    this.moving = false;

    this.rupeeCount = 0;
    this.bombCount = 0;
    this.keyCount = 0;

    this.screen = {
      w: screenWidth,
      h: screenHeight,
    };

    this.topHeight = 200;

    this.defaultHeight = (this.screen.h - this.topHeight)*-1;
    this.goalHeight = this.defaultHeight;

    this.scrollSpeed = 10;

    this.pos = {
      x: 0,
      y: this.defaultHeight,
    };

    this.map = {
      x: 50,
      y: 250,
      w: 250,
      h: 150,
    };

    // function binding
    this.trigger = this.trigger.bind(this);
  }

  /**
   * Triggers the pause menu. Starts it moving in the opposite direction.
   *
   */
  trigger() {


    if(!this.moving){
      if(this.active) {
        console.log("GO UP");
        // go back up, resume play
        if(this.scrollSpeed > 0){
          this.scrollSpeed *= -1;
        }
      }
      else {
        console.log("GO DOWN");
        // pause play, come down
        if(this.scrollSpeed < 0){
          this.scrollSpeed *= -1;
        }
      }

      this.moving = true;
      this.active = false;
    }
  }

  /**
   * Updates the UI. Checks if it should be moving, handles it's active state
   * functionality
   */
  update() {
    if(this.moving) {
      this.move();
    }
    else if (this.active) {
      // MENU LOGIC GOES HERE
    }
  }

  /**
   * Moves the UI plane. Checks the position of the plane to determine the
   * state of the UI.
   */
  move(){
    // Check if the UI is at the top of the screen
    if(this.pos.y < this.defaultHeight){
      console.log("HIT TOP");
      this.pos.y = this.defaultHeight;
      this.moving = false;

      /* resume gameplay */

    }

    // Check if the UI is at the bottom
    else if (this.pos.y > 0){
      console.log("HIT BOTTOM");
      this.pos.y = 0;
      this.moving = false;
      this.active = true;

      /* update menu logic */

    }

    this.pos.y += this.scrollSpeed;
  }

  /**
   * Renders the interface.
   * Positions are relative to the position of the pause menu screen's position
   * @param {ctx} ctx Context
   */
  render(ctx) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(this.pos.x,this.pos.y,this.screen.w,this.screen.h);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(
      this.map.x + this.pos.x,
      this.map.y + this.pos.y,
      this.map.w,
      this.map.h
    );

    ctx.font = "60px comic sans"
    ctx.fillText(
      "Inventory",
      50 + this.pos.x,
      70 + this.pos.y);
  }

  /**
   * Called whenever player collects/spends an item so that the UI can
   * reflect the current state
   * @param {number} rupees Total rupee count
   * @param {number} bombs Total bomb count
   * @param {number} keys Total key count
   */
  updateCounts(rupees, bombs, keys) {
    this.rupeeCount = rupees;
    this.bombCount = bombs;
    this.keyCount = keys;
  }
}
