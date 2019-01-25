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

    console.log(screenWidth);
    console.log(screenHeight);
    this.active = false;
    this.moving = false;

    this.screen = {
      w: screenWidth,
      h: screenHeight,
    };

    this.topHeight = 128;

    this.defaultHeight = (this.screen.h - this.topHeight)*-1;

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
    
    this.pos.y += this.scrollSpeed;
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

    console.log(this.pos.y);
  }

  /**
   * Renders the interface.
   * Positions are relative to the position of the pause menu screen's position
   * @param {ctx} ctx Context
   */
  render(ctx, camera) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(
      this.pos.x + (camera.pos.x + camera.size.width/2),
      this.pos.y + (camera.pos.y + camera.size.height/2),
      this.screen.w,
      this.screen.h
    );

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(
      this.map.x + this.pos.x,
      this.map.y + this.pos.y,
      this.map.w,
      this.map.h
    );

    //ctx.font = "60px comic sans"
    ctx.fillText(
      "Inventory",
      50 + this.pos.x,
      70 + this.pos.y);

    ctx.fillText(
      "Bombs: "+gameNs.game.player.bombs,
      50 + this.pos.x,
      750 + this.pos.y
    )
    ctx.fillText(
      "Rupees: "+gameNs.game.player.rupees,
      50 + this.pos.x,
      770 + this.pos.y
    )
    ctx.fillText(
      "Keys: "+gameNs.game.player.keys,
      50 + this.pos.x,
      790 + this.pos.y
    )
    ctx.fillText(
      "will to live: "+1+"   :^)",
      50 + this.pos.x,
      810 + this.pos.y
    )
  }
}
