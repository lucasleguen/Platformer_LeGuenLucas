var player;
var platforms;
var pdv = 3;
var pdvt = 4;

// vie Player //
var coeur1;
var coeur2;
var coeur3;
var coeurv1;
var coeurv2;
var coeurv3;

//

var griffe;
var newgriffe;
var canAttack = true;

//

var grimper = true;

//
var vietortue = true;
//
var comptinv=100;
var invincible=false;
var tortue;
var tortue2;
var cursors;
var maison;
var changementZone3;
var positionX=100;
var positionY=450;

// transformation

var formeBestiale=false;

// chaire
var viande = true;
var chaire1;
var chaire2;
var chaire3;
var chaires;

// rage
var rage = false

// particules
var particles_cendre;
var emitter_particles_cendre;

// Musique
var debutsceneonemusic = true;
var sceneonemusic;

// Instant kill
var box
var box2

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
    }
    init(data){
    }
    preload(){
    this.load.image('tuile', 'assets/tuile1.png');
    this.load.tilemapTiledJSON('map', 'map1.json')
        
    // Background
        
    this.load.image('fond', 'assets/background.png');
    this.load.image('village', 'background/fond1.png');
    this.load.image('foret', 'background/1.png');
    this.load.image('foretd', 'background/2.png');
    this.load.image('montagne', 'background/3.png');
    this.load.image('montagned', 'background/4.png');

    this.load.image('backgroundmaison', 'assets/backgroundmaison.png');
    this.load.image('coeur', 'assets/coeur.png');
    this.load.image('coeurvide', 'assets/coeurvide.png')
    this.load.image('dudedos', 'assets/statiquedos.png');
        
    this.load.image('cendre', 'assets/cendre.png');
    
    this.load.audio("sceneonemusic","audio/sceneone.mp3");
        
    this.load.spritesheet('dudemarchea', 'assets/marcheavant.png',{ frameWidth: 135, frameHeight: 87 });
    this.load.spritesheet('dudemarcheg', 'assets/marcheg.png',{ frameWidth: 135, frameHeight: 87 });
    this.load.spritesheet('dudecoursed', 'assets/coursed.png',{ frameWidth: 149, frameHeight: 87 });
    this.load.spritesheet('dudecourseg', 'assets/courseg.png',{ frameWidth: 149, frameHeight: 87 });
    this.load.spritesheet('dudestatique', 'assets/statique.png',{ frameWidth: 122, frameHeight: 80 });
    this.load.spritesheet('dudesautd', 'assets/sautloupd.png',{ frameWidth: 149, frameHeight: 87 });
    this.load.spritesheet('dudesautg', 'assets/sautloupg.png',{ frameWidth: 149, frameHeight: 87 });
   
    this.load.spritesheet('fillemarched', 'assets/fillemarched.png',{ frameWidth: 49, frameHeight: 65 });
    this.load.spritesheet('fillemarcheg', 'assets/fillemarcheg.png',{ frameWidth: 49, frameHeight: 65 });
    this.load.spritesheet('fillestatique', 'assets/fillestatique.png',{ frameWidth: 49, frameHeight: 65 });
        
    this.load.spritesheet('attaque', 'assets/attaqueloup.png',{ frameWidth: 149, frameHeight: 87 });
    this.load.spritesheet('griffe', 'assets/attaquefx.png',{ frameWidth: 85, frameHeight: 85 });
        
    this.load.spritesheet("rage", "assets/rage.png", {
        frameHeight: 448,
        frameWidth: 896
    
    });
    
    
    this.load.spritesheet('tortue', 'assets/patrouille.png',{ frameWidth: 200, frameHeight: 87 });
        
    this.load.spritesheet('chaire', 'assets/chaire.png',{ frameWidth: 60, frameHeight: 40 });
        
    this.load.image('dudemarched', 'assets/marchedos.png');
    this.load.image('ascenseur', 'assets/ascenseur.png');
    this.load.image('murhaut', 'assets/murhaut.png');
    this.load.image('attaque', 'assets/attaque.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('grasse', 'assets/grass.png');
    this.load.image('box', 'assets/box.png');
}

    create(){
        
        //background
        this.add.image(0, 0, 'fond').setOrigin(0);
        
        /*
         this.add.image(0, 0, 'montagned', [
        {
            frequency: 100,
            lifespan: 30000,
            speedX: { min: 80, max: 120 },
        }]);
        
        this.add.image(0, 0, 'montagne', [
        {
            lifespan: 30000,
            speedX: { min: 140, max: 300 },
        }]);
        */
        
        
            // musique
        sceneonemusic = this.sound.add("sceneonemusic");
        
            // rage
        rage=this.physics.add.sprite(447,223,'rage').setScrollFactor(0).setAlpha(0);
        rage.setCollideWorldBounds(false);
        rage.body.setAllowGravity(false);
        
        // chaire
        chaires=this.physics.add.group ();
        chaire1=chaires.create(1550,340,'chaire');
        chaire2=chaires.create(4285,770,'chaire');
        chaire3=chaires.create(11864,574,'chaire');
        
        // chaire1
        chaire1.setCollideWorldBounds(false);
        chaire1.body.setAllowGravity(false);
        
        // chaire2
        chaire2.setCollideWorldBounds(false);
        chaire2.body.setAllowGravity(false);
        
        // chaire3
        chaire3.setCollideWorldBounds(false);
        chaire3.body.setAllowGravity(false);
        
        // box
        box=this.physics.add.sprite(9115,900,'box');
        box.setCollideWorldBounds(false);
        box.body.setAllowGravity(false);
        
        // box
        box2=this.physics.add.sprite(12394,1380,'box');
        box2.setCollideWorldBounds(false);
        box2.body.setAllowGravity(false);
    
        //tortue
        
        //real map
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('tuile1', 'tuile');
        const nocolid = map.createLayer('nocolid', tileset, 0, 0);
        
        // joueur
        player = this.physics.add.sprite(272,350, 'fillestatique');
        player.setCollideWorldBounds(false);
        player.setScale(0.7);
            
        // tortue
        tortue=this.physics.add.sprite(6000,770,'tortue');
        tortue.setCollideWorldBounds(false);
        tortue.body.setAllowGravity(false);
        
        // tortue2
        tortue2=this.physics.add.sprite(2846,404,'tortue');
        tortue2.setCollideWorldBounds(false);
        tortue2.body.setAllowGravity(false);
        
        
        // sans collision
        const terrain = map.createLayer('map1', tileset, 0, 0);
        const grasse = map.createLayer('grasse', tileset, 0, 0);
        
         terrain.setCollisionByExclusion(-1, true);
         nocolid.setCollisionByExclusion(-1, true);
        

        this.cursors = this.input.keyboard.createCursorKeys();
        
        
        platforms = this.physics.add.staticGroup();
        griffe = this.physics.add.group({allowGravity:false, immovable:true});
        
        
 
    //  Now let's create some ledges
   // platforms.create(650, 425, 'platform');
   // this.add.image(650,410, 'grass')
        
        
        tortue.setPushable(true);
        tortue2.setPushable(true);
    
        // camera
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0,0, 100000, 10000);
        this.physics.world.setBounds(0,0, 100000, 10000);
        
    
    //vie
    coeur1= this.add.sprite(30,40,'coeur').setScrollFactor(0).setAlpha(1);
    coeur2= this.add.sprite(80,40,'coeur').setScrollFactor(0).setAlpha(1);
    coeur3= this.add.sprite(130,40,'coeur').setScrollFactor(0).setAlpha(1);
    coeurv1= this.add.sprite(52,20,'coeur').setScrollFactor(0).setAlpha(0);
    coeurv2= this.add.sprite(52,20,'coeur').setScrollFactor(0).setAlpha(0);
    coeurv3= this.add.sprite(52,20,'coeur').setScrollFactor(0).setAlpha(0);
        
                // rage
        rage=this.physics.add.sprite(447,223,'rage').setScrollFactor(0).setAlpha(0);
        rage.setCollideWorldBounds(false);
        rage.body.setAllowGravity(false);
        
   particles_cendre = this.add.particles('cendre');
        emitter_particles_cendre = particles_cendre.createEmitter({
            x:0,
            y:0,
            speed: 35,
            lifespan: 1700,
            frequency: 300,
            quantity: 3,
            scale: { start: 1, end: 0.2 },
            blendMode: 'ADD',
        });
        
        
    // Animations Joueur
    
     this.anims.create({
        key: 'space',
        frames: this.anims.generateFrameNumbers('griffe', { start: 0, end: 5 }),
        frameRate: 30,
        repeat: 0
    });
        
        this.anims.create({
        key: 'attaqued',
        frames: this.anims.generateFrameNumbers('attaque', { start: 0, end: 11 }),
        frameRate: 25,
        repeat: 0
    });
        
    this.anims.create({
        key: 'attaqueg',
        frames: this.anims.generateFrameNumbers('attaque', { start: 12, end: 24 }),
        frameRate: 25,
        repeat: 0
    }); 
        
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dudemarchea', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });
        
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dudemarcheg', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });
        
    this.anims.create({
        key: 'coursed',
        frames: this.anims.generateFrameNumbers('dudecoursed', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });
        
    this.anims.create({
        key: 'courseg',
        frames: this.anims.generateFrameNumbers('dudecourseg', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });
        
    this.anims.create({
        key: 'sautd',
        frames: this.anims.generateFrameNumbers('dudesautd', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });
        
    this.anims.create({
        key: 'sautg',
        frames: this.anims.generateFrameNumbers('dudesautg', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });
        
        
    this.anims.create({
        key: 'statique',
        frames: this.anims.generateFrameNumbers('dudestatique', { start: 0, end: 13 }),
        frameRate: 6,
        repeat: -1
    });
        
        //
    this.anims.create({
        key: 'tortue',
        frames: this.anims.generateFrameNumbers('tortue', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });
        
    this.anims.create({
        key: 'chaire',
        frames: this.anims.generateFrameNumbers('chaire', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    });
        
    // grimper animation
        
    this.anims.create({
        key: 'grimped',
        frames: this.anims.generateFrameNumbers('dudegrimped', { start: 0, end: 2 }),
        frameRate: 8,
        repeat: -1
    });
        
    this.anims.create({
        key: 'grimpeg',
        frames: this.anims.generateFrameNumbers('dudegrimpeg', { start: 0, end: 2 }),
        frameRate: 8,
        repeat: -1
    });
    
        // tortue1  
    this.tweens.add({
        targets: tortue,
        props: {
            x:{value: 5860,duration:2400},
        },
        yoyo:true,
        repeat:-1
    });
        
     // tortue2  
    this.tweens.add({
        targets: tortue2,
        props: {
            x:{value: 2483,duration:3200},
        },
        yoyo:true,
        repeat:-1
    });
        
        // rage
    this.anims.create({
        key: 'rage',
        frames: this.anims.generateFrameNumbers('rage', { start: 0, end: 29 }),
        frameRate: 0.8,
        repeat: 0
    });
    
  
        
        
    //fillette animation

    this.anims.create({
        key: 'fright',
        frames: this.anims.generateFrameNumbers('fillemarched', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: 0
    });
        
    this.anims.create({
        key: 'fleft',
        frames: this.anims.generateFrameNumbers('fillemarcheg', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: 0
    });
    
    this.anims.create({
        key: 'fstatique',
        frames: this.anims.generateFrameNumbers('fillestatique', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });
    

    

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(tortue, platforms);
    this.physics.add.collider(player,tortue,hitballe,null,this);
    this.physics.add.collider(player,tortue2,hitballe,null,this);
    this.physics.add.overlap(griffe, tortue, hitgriffe,null,this);
    this.physics.add.overlap(griffe, tortue2, hitgriffe,null,this);
    this.physics.add.collider(player, terrain);    
    this.physics.add.overlap(player, chaire1, loup, null,this);    
    this.physics.add.overlap(player, chaire2, loup, null,this);    
    this.physics.add.overlap(player, chaire3, loup, null,this);    
    this.physics.add.overlap(player, box, instantkill, null,this);    
    this.physics.add.overlap(player, box2, instantkill, null,this);    
        
        function hitballe(player,tortue,tortue2) {
        if (invincible==false){
            pdv-=1;
       
            
            if (pdv==2){
                coeur3.setVisible(false);
                coeurv3.setVisible(true);
            }
            if (pdv==1){
                coeur2.setVisible(false);
                coeurv2.setVisible(true);
            }
            if (pdv==0){
                coeur1.setVisible(false);
                coeurv1.setVisible(true);
                this.physics.pause();
                player.setTint(0xff0000);
                this.add.text(200, 280, 'YOU DIED', { font: "40px Arial Black", fill: "#000" }).setScrollFactor(0);
            }
            
        invincible=true;
        setTimeout(function(){invincible=false},3000);
    }
}
        
        function instantkill(player,box,box2) {
        if (invincible==false){
            pdv-=1;
       
            
            if (pdv==2){
                coeur3.setVisible(false);
                coeurv3.setVisible(true);
                 coeur2.setVisible(false);
                coeurv2.setVisible(true);
                coeur1.setVisible(false);
                coeurv1.setVisible(true);
                this.physics.pause();
                player.setTint(0xff0000);
                this.add.text(200, 280, 'YOU DIED', { font: "40px Arial Black", fill: "#000" }).setScrollFactor(0);
                
            }
            if (pdv==1){
                coeur3.setVisible(false);
                coeurv3.setVisible(true);
                 coeur2.setVisible(false);
                coeurv2.setVisible(true);
                coeur1.setVisible(false);
                coeurv1.setVisible(true);
                this.physics.pause();
                player.setTint(0xff0000);
                this.add.text(200, 280, 'YOU DIED', { font: "40px Arial Black", fill: "#000" }).setScrollFactor(0);
            }
            if (pdv==0){
                coeur3.setVisible(false);
                coeurv3.setVisible(true);
                 coeur2.setVisible(false);
                coeurv2.setVisible(true);
                coeur1.setVisible(false);
                coeurv1.setVisible(true);
                this.physics.pause();
                player.setTint(0xff0000);
                this.add.text(200, 280, 'YOU DIED', { font: "40px Arial Black", fill: "#000" }).setScrollFactor(0);
            }
            
        invincible=true;
        setTimeout(function(){invincible=false},3000);
    }
}
}
    
    
    
    update(){        
         if (formeBestiale ==false){
        player.setSize(20,40);
        console.log("ok");
    }
        
     if (invincible == true) {
        comptinv--;
        if (comptinv==0){
            comptinv=500;
            invincible==false;
        }
    }
        if (vietortue == true){
        tortue.anims.play('tortue', true);
        tortue2.anims.play('tortue', true);
    }
        else {
            tortue.destroy(true,true)
            tortue2.destroy(true,true)
        }
        
        if (viande == true){
        chaire1.anims.play('chaire', true);
        chaire2.anims.play('chaire', true);
        chaire3.anims.play('chaire', true);
        }

        
        
        
        // music 
    if (debutsceneonemusic){
    sceneonemusic.play();
    debutsceneonemusic=false;
}
        
         

        
// HUMAINE-------------------------------------------------------
    if(formeBestiale==false){
                //course gauche
        emitter_particles_cendre.stopFollow(player);
                // gauche
                if (cursors.left.isDown && canAttack == true && grimper == true)
                {
                    player.setVelocityX(-150);
                    player.anims.play('fleft', true);
                }

                // droite
                if (cursors.right.isDown && canAttack == true && grimper == true)
                {
                    player.setVelocityX(150);
                    player.anims.play('fright', true);
                }    
                else if (canAttack == true && player.body.blocked.down && cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && cursors.down.isUp)

                {
                    player.setVelocityX(0);
                    player.anims.play('fstatique', true);
                }

                if (cursors.up.isDown && player.body.blocked.down && canAttack == true)
                {
                    player.setVelocityY(-200);
                }

                if (cursors.up.isDown && cursors.right.isDown && cursors.down.isDown && player.body.blocked.down && canAttack == true)
                {
                    player.setVelocityY(-100);
                    player.setVelocityX(1000);
                }

                if (cursors.up.isDown && cursors.left.isDown && cursors.down.isDown && player.body.blocked.down && canAttack == true)
                {
                    player.setVelocityY(-100);
                    player.setVelocityX(-1000);
                }
                  }
        
        // ------------------------------------------------------        
        

// LOUP-GAROU-------------------------------------------------------
    if(formeBestiale==true){
        
        emitter_particles_cendre.startFollow(player);
        
                        if (Phaser.Input.Keyboard.JustDown(cursors.up) && player.body.blocked.down && canAttack == true)
                {
                    player.anims.play('sautd', true);
                    player.setVelocityY(-250);
                }
        
        else if (cursors.right.isDown){
                   if (cursors.up.isDown && cursors.right.isDown && canAttack == true)
                    {
                        player.anims.play('sautd', true);
                    }

                   else if (cursors.up.isDown && cursors.right.isDown && cursors.down.isDown && player.body.blocked.down && canAttack == true)
                    {
                        player.anims.play('sautd', true);
                        player.setVelocityY(-380);
                        player.setVelocityX(1000);
                    }
                else if (cursors.right.isDown && cursors.down.isDown && player.body.blocked.down && canAttack == true)
                {
                    player.setVelocityX(400);
                    player.anims.play('coursed', true);
                }
                // droite
                 else if (cursors.right.isDown && canAttack == true && grimper == true)
                {
                    player.setVelocityX(180);
                    player.anims.play('right', true);
                }   

        }
        
        else if (cursors.left.isDown){

                    if (cursors.up.isDown && cursors.left.isDown && canAttack == true)
                    {
                        player.anims.play('sautg', true);
                    }

                    else if (cursors.up.isDown && cursors.left.isDown && cursors.down.isDown && player.body.blocked.down && canAttack == true)
                    {
                        player.anims.play('sautg', true);
                        player.setVelocityY(-380);
                        player.setVelocityX(-1000);
                    }
                                     else if (cursors.left.isDown && cursors.down.isDown && player.body.blocked.down && canAttack == true)
                {
                    player.setVelocityX(-400);
                    player.anims.play('courseg', true);
                }
                // gauche
                 else if (cursors.left.isDown && canAttack == true && grimper == true)
                {
                    player.setVelocityX(-180);
                    player.anims.play('left', true);
                }
                
        }


                // attaque 
                if(cursors.space.isDown && cursors.right.isDown && canAttack == true){
                    canAttack = false;
                    attaquegriffe(130,0);
                    player.anims.play('attaqued', true);
                    newgriffe.anims.play('space', true);
                    setTimeout(function(){newgriffe.destroy()}, 600);
                    setTimeout(function(){canAttack = true}, 600);
                }

               else if(cursors.space.isDown && cursors.left.isDown && canAttack == true){
                    canAttack = false;
                    attaquegriffe(-130,0);
                    player.anims.play('attaqueg', true);
                    newgriffe.anims.play('space', true);
                    setTimeout(function(){newgriffe.destroy()}, 600);
                    setTimeout(function(){canAttack = true}, 600);
                }

                // pose statique
                else if (canAttack == true && player.body.blocked.down && cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && cursors.down.isUp)

                {
                    player.setVelocityX(0);
                    player.anims.play('statique', true);
                    emitter_particles_cendre.stopFollow(player);
                }
                  }
        
        // ------------------------------------------------------

                if (player.y==463&&player.x>827&&player.x<975){
                    this.scene.start("sceneTrois");
                    changementZone3 = true;
                }
                    if (pdv==2){
                            coeur3.setVisible(false);
                            coeurv3.setVisible(true);
                        }
                        if (pdv==1){
                            coeur2.setVisible(false);
                            coeurv2.setVisible(true);
                        }
                        if (pdv==0){
                            coeur1.setVisible(false);
                            coeurv1.setVisible(true);
                            this.physics.pause();
                            player.setTint(0xff0000);
                            this.add.text(200, 280, 'You died, press F5 to try again !', { font: "20px Arial Black", fill: "#000" }).setScrollFactor(0);
                        }
            }
}

function attaquegriffe(x,y){
    newgriffe = griffe.create(player.x + x, player.y + y, 'griffe')

}

function loup(){
    formeBestiale = true
    
    if (formeBestiale == true){
        rage.anims.play('rage', true).setScrollFactor(0).setAlpha(1);
        setTimeout(function(){formeBestiale=false},30000)
        player.setSize(120,50);
    }
    
}

function killinstant(){
    pdv=0
}

function hitgriffe() {

            if (pdvt==4){
                pdvt-=1
            }
            if (pdvt==3){
                pdvt-=1
            }
            if (pdvt==2){
                pdvt-=1
            }
            if (pdvt==1){
                pdvt-=1
            }
            if (pdvt==0){
                vietortue=false
            }
        }