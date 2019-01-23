/**
 * @description Recovery heart, picking one up heals the player
 * @author John O'Meara
 */
class Heart extends Objects {

  constructor(x, y) {
    super(
    "heart",
    x,
    y,
    25,     // Width
    25,     // Height
    847,    // frameWidth
    768,    // frameHeight
    0,      // frameTop
    0,      // frameLeft
    0,
    0,
    "resources/recoveryheart.png",
    )
    //this.sprite.setScale(0.03, 0.03);
    this.sprite.setScale(25/847, 25/768);
  }
}

/**
 * @description Bomb pickup, picking one up increases player bomb count
 * @author John O'Meara
 */
class Bomb extends Objects {
  constructor(x,y) {
    super(
      "bomb",
      x,
      y,
      25,     // Width
      25,     // Height
      256,    // frameWidth
      256,    // frameHeight
      0,      // frameTop
      0,      // frameLeft
      0,
      0,
      "resources/bomb.png",
      )
      this.sprite.setScale(0.1, 0.1);
  }
}

/**
 * @description Rupee pickup, picking one up increases player rupee count
 * @author John O'Meara
 */
class Rupee extends Objects {
  constructor(x,y) {
    super(
      "rupee",
      x,
      y,
      25,     // Width
      25,     // Height
      342,    // frameWidth
      569,    // frameHeight
      0,      // frameTop
      0,      // frameLeft
      0,
      0,
      "resources/rupee.png",
      )
      this.sprite.setScale(25/342, 25/569);
  }
}

/**
 * @description Key pickup, picking one up gives the player an extra key
 * @author John O'Meara
 */
class Key extends Objects {
  constructor(x,y) {
    super(
      "key",
      x,
      y,
      25,     // Width
      25,     // Height
      512,    // frameWidth
      512,    // frameHeight
      0,      // frameTop
      0,      // frameLeft
      0,
      0,
      "resources/key.png",
      )
      this.sprite.setScale(25/512, 25/512);
  }
}