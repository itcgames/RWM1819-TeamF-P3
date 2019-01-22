
class Heart extends Object {

    constructor(x,y){
        super(
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
            "resources/images/recoveryheart.png",
        )
        this.sprite.setScale(0.03,0.03);
    }

    pickup(){
        console.log("Ya got me");
    }
}