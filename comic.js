window.addEventListener(
    "touchmove",
    function (event) {
      if (event.scale !== 1) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    { passive: false }
  );
var game;
window.onload = function() {
    var config = {
        type:Phaser.AUTO,
        parent:'wrap',
        width:1850, height:1080,
        backgroundColor: '#000000', 
        autoMobilePipline:true,
        disableContextMenu:true,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene:[load,mainmenu,frame0,frame1,pchall,coffeehall,coffeehall1,kitchen,pc,videogame,ev0,sleephall,noodleshall,evkitchen,noodleshall1,evbedroom,dlg,transition,ui]
    }
    game = new Phaser.Game(config);
}
class load extends Phaser.Scene {
    constructor(){super('LOAD')}
    preload(){
        let box = this.add.graphics();
        box.fillStyle(0x333333, 0.8);
        box.fillRect(250,432,1350,216);
        let bar = this.add.graphics();
        this.load.font('determination','fonts/determinationmonorusbylyajk.otf','opentype')
        this.load.image('takenoodles','assets/takenoodles.png');
        this.load.image('takeseeds','assets/takeseeds.png');
        this.load.image('turnoff','assets/turnoff.png');
        this.load.image('wait','assets/wait.png');
        this.load.image('watercrops','assets/watercrops.png');
        this.load.image('workgame','assets/workgame.png');
        this.load.spritesheet('alarm0','assets/alarm0.png',{
            frameWidth:800,
            frameHeight:800
        });
        this.load.spritesheet('alarm1','assets/alarm1.png',{
            frameWidth:800,
            frameHeight:800
        });
        this.load.image('boil','assets/boil.png');
        this.load.image('carrot','assets/carrot.png');
        // this.load.image('chicken0','assets/chicken0.png');
        // this.load.image('chicken1','assets/chicken1.png');
        // this.load.image('chicken2','assets/chicken2.gif');
        this.load.image('choice0','assets/choice0.png');
        this.load.image('choice1','assets/choice1.png');
        this.load.image('coffeehall','assets/coffeehall.png');
        this.load.image('cup1','assets/cup1.png');
        this.load.image('cup2','assets/cup2.png');
        this.load.image('cup3','assets/cup3.png');
        this.load.image('cup4','assets/cup4.png');
        this.load.image('cup5','assets/cup5.png');
        this.load.image('cup6','assets/cup6.png');
        this.load.image('cup7','assets/cup7.png');
        this.load.image('desktop0','assets/desktop0.png');
        this.load.image('desktop1','assets/desktop1.png');
        this.load.image('desktop2','assets/desktop2.png');
        this.load.image('dialogbox','assets/dialogbox.png');
        this.load.image('drinkcoffee','assets/drinkcoffee.png');
        this.load.image('eatnoodles','assets/eatnoodles.png');
        this.load.image('emptycup','assets/emptycup.png');
        this.load.image('evbed','assets/evbed.png');
        this.load.image('evbed1','assets/evbed1.png');
        this.load.image('evbed2','assets/evbed2.png');
        this.load.image('evhall0','assets/evhall0.png');
        this.load.image('evhall1','assets/evhall1.png');
        this.load.image('evhall2','assets/evhall2.png');
        this.load.image('evhall3','assets/evhall3.png');
        this.load.image('evhall4','assets/evhall4.png');
        this.load.image('evhallbedroom','assets/evhallbedroom.png');
        this.load.image('evhallkitchen','assets/evhallkitchen.png');
        this.load.image('evkitchen0','assets/evkitchen0.png');
        this.load.image('evkitchen1','assets/evkitchen1.png');
        this.load.image('evpc0','assets/evpc0.png');
        this.load.image('evpc1','assets/evpc1.png');
        this.load.image('evpc2','assets/evpc2.png');
        this.load.image('evpc3','assets/evpc3.png');
        this.load.image('farm0','assets/farm0.png');
        this.load.image('farm1','assets/farm1.png');
        this.load.image('farm2','assets/farm2.png');
        this.load.image('farm3','assets/farm3.png');
        this.load.image('farm4','assets/farm4.png');
        this.load.spritesheet('frame0','assets/frame0.png',{
            frameWidth:600,
            frameHeight:480
        });
        this.load.image('frame1','assets/frame1.jpg');
        this.load.image('frame2','assets/frame2.jpg');
        this.load.image('frame3','assets/frame3.jpg');
        this.load.image('game','assets/game.png');
        this.load.image('gamestart','assets/gamestart.png');
        this.load.image('gotosleep','assets/gotosleep.png');
        this.load.image('hall0','assets/hall0.jpg');
        this.load.image('hall1','assets/hall1.jpg');
        this.load.image('hall2','assets/hall2.jpg');
        this.load.image('hall3','assets/hall3.jpg');
        this.load.image('hall4','assets/hall4.jpg');
        this.load.image('kettle0','assets/kettle0.png');
        this.load.image('kettle1','assets/kettle1.png');
        // this.load.image('kickpet','assets/kickpet.png');
        this.load.image('kitchen0','assets/kitchen0.png');
        this.load.image('kitchen1','assets/kitchen1.png');
        this.load.spritesheet('load','assets/load.png',{
            frameWidth:800,
            frameHeight:640
        }); 
        this.load.image('makecoffee','assets/makecoffee.png');
        this.load.image('makenoodles','assets/makenoodles.png');
        this.load.image('mix','assets/mix.png');
        this.load.image('noodles0','assets/noodles0.png');
        this.load.image('noodles1','assets/noodles1.png');
        this.load.image('noodles2','assets/noodles2.png');
        this.load.image('noodles3','assets/noodles3.png');
        this.load.image('noodles4','assets/noodles4.png');
        this.load.image('noodles5','assets/noodles5.png');
        this.load.image('overlay','assets/overlay.png');
        this.load.spritesheet('pc','assets/pc.png',{
            frameWidth:800,
            frameHeight:800
        });
        this.load.image('pc0','assets/pc0.png');
        this.load.image('pc1','assets/pc1.png');
        this.load.image('pc2','assets/pc2.png');
        this.load.image('pc3','assets/pc3.png');
        this.load.image('pchall','assets/pchall.jpg');
        this.load.image('phone0','assets/phone0.png');
        this.load.image('phone1','assets/phone1.png');
        this.load.image('phone2','assets/phone2.png');
        this.load.image('phone3','assets/phone3.png');
        this.load.image('plantseeds','assets/plantseeds.png');
        this.load.image('pot0','assets/pot0.png');
        this.load.image('pot1','assets/pot1.png');
        this.load.image('poweroff','assets/poweroff.png');
        this.load.image('poweron','assets/poweron.png');
        this.load.image('seed0','assets/seed0.png');
        this.load.image('seed1','assets/seed1.png');
        this.load.image('seed2','assets/seed2.png');
        this.load.image('seed3','assets/seed3.png');
        this.load.image('seed4','assets/seed4.png');
        this.load.image('sleepnoodles','assets/sleepnoodles.png');
        this.load.image('mainmenu','assets/mainmenu.png');
        this.load.image('fullscreen','assets/fullscreen.png');
        this.load.on('progress', function (value) {
            console.log(value);
            bar.clear();
            bar.fillStyle(0x999999,1);
            bar.fillRect(275,447,1300*value,186);
        });
        this.load.on('complete',function(){
            console.log('done');
        })
    }
    create(){
        this.anims.create({
            key: 'frame0gif',
            frames: 'frame0',
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'pcgif',
            frames: 'pc',
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'loadgif',
            frames: 'load',
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'alarm6gif',
            frames: 'alarm1',
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'alarm',
            frames: 'alarm0',
            frameRate: 1,
            repeat: 0
        });
        // this.scene.launch('ui0');
        this.scene.switch('mainmenu');
    }
}