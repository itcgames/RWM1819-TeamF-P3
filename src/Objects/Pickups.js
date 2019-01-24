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
    64,    // frameWidth
    64,    // frameHeight
    128,      // frameTop
    256,      // frameLeft
    0,
    0,
    "resources/objects.png",
    )
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
      30,     // Width
      30,     // Height
      64,    // frameWidth
      64,    // frameHeight
      0,      // frameTop
      0,      // frameLeft
      0,
      0,
      "resources/objects.png",
      )
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
      30,     // Width
      30,     // Height
      64,    // frameWidth
      64,    // frameHeight
      64,      // frameTop
      0,      // frameLeft
      4,
      2,
      "resources/objects.png",
      )
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
      30,     // Width
      30,     // Height
      64,    // frameWidth
      64,    // frameHeight
      0,      // frameTop
      192,      // frameLeft
      0,
      0,
      "resources/objects.png",
      )
  }
}