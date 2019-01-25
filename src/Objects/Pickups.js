/**
 * @description Recovery heart, picking one up heals the player
 * @author John O'Meara & Conor O'Toole
 */
class Heart extends Objects {

  constructor(x, y) {
    super(
      "heart",
      x,
      y,
      25, // Width
      25, // Height
      64, // frameWidth
      64, // frameHeight
      128, // frameTop
      256, // frameLeft
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
  constructor(x, y) {
    super(
      "bomb",
      x,
      y,
      30, // Width
      30, // Height
      64, // frameWidth
      64, // frameHeight
      0, // frameTop
      0, // frameLeft
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
  constructor(x, y) {
    super(
      "rupee",
      x,
      y,
      30, // Width
      30, // Height
      64, // frameWidth
      64, // frameHeight
      64, // frameTop
      0, // frameLeft
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
  constructor(x, y) {
    super(
      "key",
      x,
      y,
      30, // Width
      30, // Height
      64, // frameWidth
      64, // frameHeight
      0, // frameTop
      192, // frameLeft
      0,
      0,
      "resources/objects.png",
    )
  }
}

/**
 * @description Stopwatch pickup, picking one up stops the enemies updating for a couple of seconds
 * @author Conor O'Toole
 */
class StopWatch extends Objects {
  constructor(x, y) {
    super(
      "stopwatch",
      x,
      y,
      30, // Width
      30, // Height
      64, // frameWidth
      64, // frameHeight
      0, // frameTop
      256, // frameLeft
      0,
      0,
      "resources/objects.png",
    )
  }
}

/**
 * @description Compass pickup, picking one up shows the goal destination
 * relative to the player
 * @author Conor O'Toole
 */
class Compass extends Objects {
  constructor(x, y) {
    super(
      "compass",
      x,
      y,
      30, // Width
      30, // Height
      64, // frameWidth
      64, // frameHeight
      64, // frameTop
      128, // frameLeft
      0,
      0,
      "resources/objects.png",
    )
  }
}

/**
 * @description Map pickup, picking one up shows the whole map on a minimap
 * @author Conor O'Toole
 */
class MapPickup extends Objects {
  constructor(x, y) {
    super(
      "map",
      x,
      y,
      30, // Width
      30, // Height
      64, // frameWidth
      64, // frameHeight
      0, // frameTop
      128, // frameLeft
      0,
      0,
      "resources/objects.png",
    )
    //this.sprite.setScale(25/512, 25/512);
  }
}
/**
 * @description sword pickup, picking one up gives the player a sword
 * @author Conor O'Toole
 */
class SwordPickup extends Objects {
  constructor(x, y) {
    super(
      "swordPickup",
      x,
      y,
      30, // Width
      30, // Height
      64, // frameWidth
      64, // frameHeight
      64, // frameTop
      192, // frameLeft
      0,
      0,
      "resources/objects.png",
    )
  }
}

/**
 * @description Triforce pickup
 * @author Conor O'Toole
 */
class TriForce extends Objects {
  constructor(x, y) {
    super(
      "triforce",
      x,
      y,
      30, // Width
      30, // Height
      64, // frameWidth
      64, // frameHeight
      64, // frameTop
      256, // frameLeft
      0,
      0,
      "resources/objects.png",
    )
  }
}

/**
 * @description fairy pickup, picking one up gives the player full health.
 * @author Conor O'Toole
 */
class Fairy extends Objects {
  constructor(x, y) {
    super(
      "fairy",
      x,
      y,
      30, // Width
      30, // Height
      64, // frameWidth
      64, // frameHeight
      128, // frameTop
      0, // frameLeft
      0,
      0,
      "resources/npcSprites.png",
    )
    //this.sprite.setScale(25/512, 25/512);
  }
}

/**
 * @description Heart container pickup, picking one up gives the player a greater maximum health
 * @author Conor O'Toole
 */
class HeartContainer extends Objects {
  constructor(x, y) {
    super(
      "heartContainer",
      x,
      y,
      30, // Width
      30, // Height
      64, // frameWidth
      64, // frameHeight
      0, // frameTop
      64, // frameLeft
      0,
      0,
      "resources/objects.png",
    )
  }
}