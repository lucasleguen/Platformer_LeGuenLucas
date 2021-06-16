var debutmusic = true;
var music;
var credit;
var background;
var space;
var etatcredit = true;
var etatSceneOne = true;

class TitleScene extends Phaser.Scene{
    constructor(key) {
    super(key);
}

preload() {
    this.load.spritesheet("background", "assets/titlescreen.png", {
        frameHeight: 448,
        frameWidth: 896
    });
    
    this.load.image("credit","assets/credit.png");
    this.load.audio("music","audio/titleaudio.mp3");
}

create() {
    this.anims.create({
        key: "gameover",
        frames: this.anims.generateFrameNumbers("background", {
            start: 0,
            end: 23
        }),
        frameRate: 12,
        repeat: 0
    });
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //---Music---//
    
    music = this.sound.add("music", { loop: false });
    
    //---background---//
    
    background = this.background = this.add.sprite(447, 223, 'gameover')
    
    //---credit---//
    
    credit = this.add.image (0,0,"credit").setOrigin(0)
    
    
}

update() {
    this.background.anims.play("gameover", true);

    //---JouerMusic---//
    
if (debutmusic){
    music.play();
    debutmusic=false;
}
    //---PasserCredit---//
    
if (Phaser.Input.Keyboard.JustDown(space)){
    if(etatcredit == true && etatSceneOne == true){
        switchCredit();
       etatSceneOne = false;
    }
   else if(etatcredit == false && etatSceneOne == false){
       this.scene.start("sceneOne");
       music.stop();
       
   }
}
   

        
}
    
}
    



function switchCredit (){
    credit.setAlpha(0);
    etatcredit = false
    
}

