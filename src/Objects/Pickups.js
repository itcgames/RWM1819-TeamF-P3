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
    25,     // Width
    25,     // Height
    48,    // frameWidth
    45,    // frameHeight
    0,      // frameTop
    0,      // frameLeft
    0,
    0,
    "resources/objects.png",
    )
    //this.sprite.setScale(0.03, 0.03);
    //this.sprite.setScale(25/847, 25/768);
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
      50,    // frameWidth
      61,    // frameHeight
      0,      // frameTop
      0,      // frameLeft
      0,
      0,
      "resources/objects.png",
      )
      //this.sprite.setScale(1, 0.1);
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
      15,     // Width
      30,     // Height
      40,    // frameWidth
      60,    // frameHeight
      0,      // frameTop
      0,      // frameLeft
      0,
      0,
      "resources/objects.png",
      )
      //this.sprite.setScale(25/342, 25/569);
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
      "resources/objects.png",
      )
      //this.sprite.setScale(25/512, 25/512);
  }
}

/**
 * @description Stopwatch pickup, picking one up stops the enemies updating for a couple of seconds
 * @author Conor O'Toole
 */
class Key extends Objects {
  constructor(x,y) {
    super(
      "stopwatch",
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
      "resources/objects.png",
      )
      //this.sprite.setScale(25/512, 25/512);
  }
}

/**
 * @description Compass pickup, picking one up shows the goal destination
 * relative to the player
 * @author Conor O'Toole
 */
class Key extends Objects {
  constructor(x,y) {
    super(
      "compas",
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
      "resources/objects.png",
      )
      //this.sprite.setScale(25/512, 25/512);
  }
}

/**
 * @description Map pickup, picking one up shows the whole map on a minimap
 * @author Conor O'Toole
 */
class Key extends Objects {
  constructor(x,y) {
    super(
      "map",
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
      "resources/objects.png",
      )
      //this.sprite.setScale(25/512, 25/512);
  }
}
/**
 * @description sword pickup, picking one up gives the player a sword
 * @author Conor O'Toole
 */
class Key extends Objects {
  constructor(x,y) {
    super(
      "sword",
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
      "resources/objects.png",
      )
      //this.sprite.setScale(25/512, 25/512);
  }
}

/**
 * @description Triforce pickup
 * @author Conor O'Toole
 */
class Key extends Objects {
  constructor(x,y) {
    super(
      "triforcePiece",
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
      "resources/objects.png",
      )
      //this.sprite.setScale(25/512, 25/512);
  }
}

/**
 * @description fairy pickup, picking one up gives the player full health.
 * @author Conor O'Toole
 */
class Key extends Objects {
  constructor(x,y) {
    super(
      "fairy",
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
      "resources/objects.png",
      )
      //this.sprite.setScale(25/512, 25/512);
  }
}

/**
 * @description Heart container pickup, picking one up gives the player a greater maximum health
 * @author Conor O'Toole
 */
class Key extends Objects {
  constructor(x,y) {
    super(
      "heartContainer",
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
      "resources/objects.png",
      )
      //this.sprite.setScale(25/512, 25/512);
  }
}
