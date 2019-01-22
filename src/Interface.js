class Interface {

  constructor(screenWidth,screenHeight) {

    this.active = false;
    this.moving = false;
    this.atTop = true;

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

    this.scrollSpeed = 5;

    this.pos = {
      x: 0,
      y: this.defaultHeight,
    };
  }

  trigger() {
    this.moving = true;
    this.active = false;

    if(this.atTop) {
      this.atTop = false;
      console.log("BAP");
      // pause play, come down
      if(this.scrollSpeed < 0){
        this.scrollSpeed *= -1;
      }
    }
    else if (this.atTop === false) {
      console.log("BOP");
      // go back up, resume play
      if(this.scrollSpeed > 0){
        this.scrollSpeed *= -1;
      }
    }
  }

  update() {
    if(this.moving) {

      // Check if the UI is at the top of the screen
      if(this.pos.y < this.defaultHeight){
        console.log("HIT TOP");
        this.pos.y = this.defaultHeight;
        this.moving = false;

        this.atTop = true;

        /* resume gameplay */
        this.trigger();
      }

      // Check if the UI is at the bottom
      else if (this.pos.y > 0){
        console.log("HIT BOTTOM");
        this.pos.y = 0;
        this.moving = false;

        this.active = true;
        
        /* update menu logic */
        this.trigger();
      }

      this.pos.y += this.scrollSpeed;
    }
    else if (this.active) {
      // MENU LOGIC GOES HERE
    }

    console.log(this.pos.y - this.defaultHeight);
  }

  render(ctx) {
    ctx.fillRect(this.pos.x,this.pos.y,this.screen.w,this.screen.h);
  }

  updateCounts(rupees, bombs, keys) {
    this.rupeeCount = rupees;
    this.bombCount = bombs;
    this.keyCount = keys;
  }
}