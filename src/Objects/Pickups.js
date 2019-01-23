/**
 * @description Recovery heart, picking one up heals the player
 * @author John O'Meara
 */
class Heart extends Object {

  constructor(x, y) {
    super(
    "heart",
    x,
    y,
    25,     // Width
    25,     // Height
    48,    // frameWidth
    45,    // frameHeight
    0,      // frameTop
    0,      // frameLeft
    0,
    0,
    "resources/images/heart.png",
    )
    //this.sprite.setScale(0.03, 0.03);
    //this.sprite.setScale(25/847, 25/768);
  }
}

/**
 * @description Bomb pickup, picking one up increases player bomb count
 * @author John O'Meara
 */
class Bomb extends Object {
  constructor(x,y) {
    super(
      "bomb",
      x,
      y,
      25,     // Width
      25,     // Height
      50,    // frameWidth
      61,    // frameHeight
      0,      // frameTop
      0,      // frameLeft
      0,
      0,
      "resources/images/bomb.png",
      )
      //this.sprite.setScale(1, 0.1);
  }
}

/**
 * @description Rupee pickup, picking one up increases player rupee count
 * @author John O'Meara
 */
class Rupee extends Object {
  constructor(x,y) {
    super(
      "rupee",
      x,
      y,
      15,     // Width
      30,     // Height
      40,    // frameWidth
      60,    // frameHeight
      0,      // frameTop
      0,      // frameLeft
      0,
      0,
      "resources/images/rupee.png",
      )
      //this.sprite.setScale(25/342, 25/569);
  }
}

/**
 * @description Key pickup, picking one up gives the player an extra key
 * @author John O'Meara
 */
class Key extends Object {
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
      "resources/images/key.png",
      )
      //this.sprite.setScale(25/512, 25/512);
  }
}