// class ui0 extends Phaser.Scene {
//     constructor(){
//         super('ui0');
//     }
//     create(){
//         let b = this.add.image(1776,10,'fullscreen').setOrigin(0,0).setInteractive({useHandCursor:true}).on('pointerup',()=>{
//             scene.scale.setGameSize(width, height);
//             this.scale.toggleFullscreen();
//         },this);
//         b.scale = 0.125;
//     }
// }
class mainmenu extends Phaser.Scene{
    constructor() {
        super('mainmenu');
        this.clicks = 0;
        this.days = 1;
    }
    create(){
        this.registry.set('clicks', this.clicks);
        this.registry.set('days', this.days);
        this.add.image(this.scale.width/2,this.scale.height/2,'mainmenu');
        this.add.zone(1056,115,435,89).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            this.scene.launch('ui');
            this.scene.start('frame0');
        },this);
    }
}
class ui extends Phaser.Scene{
    constructor() {
        super('ui');
        this.scoreText;
    }
    create(){
        this.scoreText = this.make.text({
            style: {
                fontFamily:'determination',
                fontSize: '40px',
                color:'#ffffff',
                backgroundColor:"#000000",
                align:'left',
            },
            x:5,y:1000,
            wordWrap:{
                width:450
            },
            text: 'день: '+this.registry.get('days')+'\nкликов: '+this.registry.get('clicks'),
            add:true
        });
        this.registry.events.on('changedata', this.updateScore, this);
        this.input.on('pointerup',()=>{this.registry.set('clicks',this.registry.get('clicks')+1)},this);
        this.add
    }
    updateScore(parent,key,data){
        this.scoreText.setText('день: '+this.registry.get('days')+'\nкликов: '+this.registry.get('clicks'));
    }
}
class frame0 extends Phaser.Scene {
    constructor(){
        super('frame0')
    }
    init(){}
    create(){
        let frm = this.add.sprite(this.scale.width/2,this.scale.height/2,'frame0').setInteractive({useHandCursor: true});
        frm.scale = 2.25;
        frm.play('frame0gif',true);
        frm.once(
            'pointerup',
            ()=>{
                frm.removeInteractive();
                this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
                this.add.image(this.scale.width/2,this.scale.height/2,'choice0');
                let left =this.add.zone(498,623,345,92).setOrigin(0,0);
                left.setInteractive({useHandCursor: true});
                let right =this.add.zone(1051,623,345,92).setOrigin(0,0);
                right.setInteractive({useHandCursor: true});
                left.once('pointerup',()=>{this.scene.start("frame0");},this);
                right.once('pointerup',()=>{this.scene.start("frame1");});
            },this);
    }
}
class frame1 extends Phaser.Scene {
    constructor(){
        super('frame1')
    }
    create(){
        let dlg =["...", "Опять за полдень...","Чем заняться сегодня?"];
        let i = 0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,'frame1').setInteractive({useHandCursor: true});
        let ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
        this.scene.launch('dlg',dlg[i]);
        frm.on(
            'pointerup',
            ()=>{
                ++i;
                if (i >= dlg.length){
                    this.scene.stop('dlg');
                    frm.removeInteractive();
                    this.add.image(this.scale.width/2,this.scale.height/2,'choice1');
                    let left =this.add.zone(498,623,345,92).setOrigin(0,0);
                    left.setInteractive({useHandCursor: true}); 
                    let right =this.add.zone(1051,623,345,92).setOrigin(0,0);
                    right.setInteractive({useHandCursor: true});
                    left.once('pointerup',()=>{
                        left.destroy();
                        right.destroy();
                        frm.destroy();
                        ov.destroy();
                        this.iteration(true);
                    },this);
                    right.once('pointerup',()=>{
                        left.destroy();
                        right.destroy();
                        frm.destroy();
                        ov.destroy();
                        this.iteration(false);
                    },this);
                }
                else{
                    this.scene.stop('dlg');
                    this.scene.launch('dlg',dlg[i]);
                }
            }, this)
    }
    iteration(flag){
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,'frame2').setInteractive({useHandCursor: true}).on('pointerup',()=>{
            frm.destroy();
            frm = this.add.image(this.scale.width/2,this.scale.height/2,'frame3').setInteractive({useHandCursor: true}).on('pointerup',()=>{
                frm.destroy();
                frm = this.add.image(this.scale.width/2,this.scale.height/2,'frame1').setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    if (flag) {
                        this.scene.start('coffeehall');
                    }
                    else{
                        this.scene.start('pchall');
                    }
                });
            },this);
        },this)
    }
}
class pchall extends Phaser.Scene {
    constructor(){
        super('pchall')
    }
    create(){
        let frames = ['hall0','hall1','hall2','hall3','hall4','pchall'];
        let i=0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        frm.scale = 0.33
        this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
                frm.scale = 0.33;
            }
            else{
                this.scene.start('pc');
            }
        },this);
    }
}
class coffeehall extends Phaser.Scene {
    constructor(){
        super('coffeehall')
    }
    create(){
        let frames = ['hall0','hall1','hall2','hall3','coffeehall'];
        let i=0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        frm.scale = 0.33
        this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
                frm.scale = 0.33;
            }
            else{
                this.scene.start('kitchen');
            }
        },this);
    }
}
class kitchen extends Phaser.Scene {
    constructor(){
        super('kitchen')
    }
    create(){
        let frames = ['kitchen0','kitchen1']; let i=0;
        let sqrs = ['emptycup','cup1','cup2','cup3','cup4','cup5','cup6','cup7']; let s = 0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        let sqr; let ok; let okb; let ov;
        let sqrb = this.add.zone(this.scale.width/2,this.scale.height/2,1024,1024);
        let frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
            }
            else{
                frmb.destroy();
                ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
                ok = this.add.image(this.scale.width/2,this.scale.height/2,'makecoffee');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
        },this)
        sqrb.on('pointerup',()=>{
            ++s;
            if (s == 2){
                sqrb.disableInteractive();
                ok =this.add.image(this.scale.width/2,this.scale.height/2,'mix');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
            else if (s==8){
                sqrb.destroy();
                ok =this.add.image(this.scale.width/2,this.scale.height/2,'drinkcoffee');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    okb.destroy();
                    ok.destroy();
                    sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[0]);
                    sqr.scale = 0.5;
                    sqrb = this.add.zone(this.scale.width/2,this.scale.height/2,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                        sqrb.destroy();
                        sqr.destroy();
                        ov.destroy();
                        --i;
                        frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                            frm.destroy();
                            --i;
                            if (i>=0){
                                frm.destroy();
                                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
                            }
                            else{
                                this.scene.start('coffeehall1');
                            }
                        },this)
                    },this)
                },this);
            }
            else{
                sqr.destroy();
                sqr =  this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                sqr.scale = 0.5;
            }
        },this);
    }
}
class coffeehall1 extends Phaser.Scene {
    constructor(){
        super('coffeehall1')
    }
    create(){
        let frames = ['coffeehall','hall4','pchall'];
        let i=0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        frm.scale = 0.33
        this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
                frm.scale = 0.33;
            }
            else{
                this.scene.start('pc');
            }
        },this);
    }
}
class pc extends Phaser.Scene {
    constructor(){
        super('pc')
    }
    create(){
        let frames =['pc0','pc1','pc2','pc3']; let i=0;
        let sqrs = ['desktop0','desktop1','desktop2']; let s = 0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        let sqr; let ok; let okb; let ov;
        let sqrb = this.add.zone(this.scale.width/2,this.scale.height/2,1024,1024);
        let frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
            }
            else{
                frmb.destroy();
                ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
                let chc = this.add.image(this.scale.width/2,this.scale.height/2,'workgame');
                let left =this.add.zone(498,623,345,92).setOrigin(0,0);
                left.setInteractive({useHandCursor: true});
                let right =this.add.zone(1051,623,345,92).setOrigin(0,0);
                right.setInteractive({useHandCursor: true});
                left.once('pointerup',()=>{
                    left.removeInteractive();
                    chc.destroy();
                    right.disableInteractive();
                    this.scene.launch('dlg','Не... Не хочу');
                    frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                        frmb.destroy();
                        this.scene.stop('dlg');
                        chc = this.add.image(this.scale.width/2,this.scale.height/2,'game');
                        right.setInteractive({useHandCursor: true});
                    },this)
                },this);
                right.once('pointerup',()=>{
                    left.destroy();
                    right.destroy();
                    chc.destroy();
                    sqr = this.add.sprite(this.scale.width/2,this.scale.height/2,'pc');
                    sqr.play('pcgif', true);
                    sqr.scale = 1.28;
                    sqrb.setInteractive({useHandCursor: true});
                });        
            }
        },this)
        sqrb.on('pointerup',()=>{
            if (s<sqrs.length){
                sqr.destroy();
                sqr =  this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s])
                sqr.scale = 0.5;
            }
            else{
                sqrb.destroy();
                ok = this.add.image(this.scale.width/2,this.scale.height/2,'gamestart');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    ov.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr.destroy();
                    frm.destroy();
                    frm = this.add.sprite(this.scale.width/2,this.scale.height/2,'load');
                    frm.scale = 1.69;
                    frm.play('loadgif',true);
                    var timer = this.time.delayedCall(1700, ()=>{this.scene.start('videogame')}, this); 
                },this);
            }
            ++s;
        },this);
    }
}
class videogame extends Phaser.Scene {
    constructor(){
        super('videogame')
    }
    create(){
        let i=0; let s= 0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,'farm0');
        let ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay').setVisible(false);
        let frmb; let sqr; let sqrb;
        let gb; let gbb;
        let left = this.add.zone(1322,71,261,124).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            left.disableInteractive();
            right.disableInteractive();
            ov.setVisible(true);
            this.scene.launch('dlg','Не... Не хочу');
                    frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                        frmb.destroy();
                        ov.setVisible(false);
                        this.scene.stop('dlg');
                        left.setInteractive({useHandCursor: true});
                        right.setInteractive({useHandCursor: true});
                    },this)
        },this);
        let right = this.add.zone(1321,214,261,124).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            right.destroy();
            left.destroy();
            frm.destroy();
            ov.destroy();
            frm = this.add.image(this.scale.width/2,this.scale.height/2,'farm1');
            frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                frmb.destroy();
                ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
                gb = this.add.image(this.scale.width/2,this.scale.height/2,'takeseeds');
                gb.scale = 0.53;
                gbb = this.add.zone(this.scale.width/2,this.scale.height/2,678,328).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                        gb.destroy();
                        gbb.destroy();
                        sqr = this.add.image(this.scale.width/2,this.scale.height/2,'carrot');
                        sqr.scale = 0.5;
                        sqrb = this.add.zone(this.scale.width/2,this.scale.height/2,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                            sqr.destroy();
                            sqrb.destroy();
                            gb = this.add.image(this.scale.width/2,this.scale.height/2,'plantseeds');
                            gb.scale = 0.53;
                            gbb = this.add.zone(this.scale.width/2,this.scale.height/2,678,328).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                gb.destroy();
                                gbb.destroy();
                                let sqrs = ['seed0','seed1','seed2','seed3','seed4']; let s = 0;
                                sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                                sqr.scale = 0.5;
                                sqrb = this.add.zone(this.scale.width/2,this.scale.height/2,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                    ++s;
                                    if (s < sqrs.length){
                                        sqr.destroy();
                                        sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                                        sqr.scale = 0.5;
                                    }
                                    else{
                                        sqr.destroy();
                                        sqrb.destroy();
                                        frm.destroy();
                                        ov.destroy();
                                        frm = this.add.image(this.scale.width/2,this.scale.height/2,'farm2');
                                        frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                            frmb.destroy();
                                            ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
                                            gb = this.add.image(this.scale.width/2,this.scale.height/2,'watercrops');
                                            gb.scale = 0.53;
                                            gbb = this.add.zone(this.scale.width/2,this.scale.height/2,678,328).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                                gb.destroy();
                                                gbb.destroy();
                                                let sqrs = ['pot0','pot1']; let s = 0;
                                                sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                                                sqr.scale = 0.5;
                                                sqrb = this.add.zone(this.scale.width/2,this.scale.height/2,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                                    ++s;
                                                    if (s < sqrs.length){
                                                        sqr.destroy();
                                                        sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                                                        sqr.scale = 0.5;
                                                    }
                                                    else{
                                                        sqr.destroy();
                                                        sqrb.destroy();
                                                        frm.destroy();
                                                        ov.destroy();
                                                        frm = this.add.image(this.scale.width/2,this.scale.height/2,'farm3');
                                                        frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                                            frm.destroy();
                                                            frmb.destroy();
                                                            frm = this.add.image(this.scale.width/2,this.scale.height/2,'farm4');
                                                            left = this.add.zone(1322,71,261,124).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                                                this.scene.start('ev0');
                                                            },this);
                                                        },this);
                                                    }
                                                },this);
                                            },this);
                                        },this);
                                    }
                                },this);
                            },this);
                        },this);
                    },this);
            },this)
        },this);
    }
}
class ev0 extends Phaser.Scene {
    constructor(){
        super('ev0')
    }
    create(){
        let frames = ['evpc0','evpc1','evpc2','evpc3']; let i = 0;
        let sqrs = ['desktop2','desktop1','poweron','poweroff']; let s =0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        let ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
        let frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080);
        let sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
        sqr.scale = 0.5;
        let sqrb = this.add.zone(this.scale.width/2,this.scale.height/2,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++s;
            if (s == 2){
                sqrb.disableInteractive();
                let ok =this.add.image(this.scale.width/2,this.scale.height/2,'turnoff');
                ok.scale = 0.68;
                let okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
            else if (s <sqrs.length){
                sqr.destroy();
                sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                sqr.scale = 0.5;
            }
            else{
                sqr.destroy();
                sqrb.destroy();
                ov.destroy();
                frmb.setInteractive({useHandCursor: true})
            }
            frmb.on('pointerup',()=>{
                frmb.destroy();
                ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
                this.add.image(this.scale.width/2,this.scale.height/2,'sleepnoodles');
                let left =this.add.zone(498,623,345,92).setOrigin(0,0);
                left.setInteractive({useHandCursor: true}); 
                let right =this.add.zone(1051,623,345,92).setOrigin(0,0);
                right.setInteractive({useHandCursor: true});
                left.once('pointerup',()=>{
                    left.destroy();
                    right.destroy();
                    frm.destroy();
                    ov.destroy();
                    this.iteration(false,frames);
                },this);
                right.once('pointerup',()=>{
                    left.destroy();
                    right.destroy();
                    frm.destroy();
                    ov.destroy();
                    this.iteration(true,frames);
                },this);
            },this);
        },this);
    }
    iteration(flag,frames){
        let i = 0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        let frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
            }
            else{
                if (flag){
                    this.scene.start('noodleshall');
                }
                else{
                    this.scene.start('sleephall');
                }
            }    
        },this);
    }
}
class sleephall extends Phaser.Scene {
    constructor(){
        super('sleephall')
    }
    create(){
        let frames = ['evhall0','evhall1','evhall2','evhall3','evhall4','evhallbedroom'];
        let i=0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        frm.scale = 0.33
        this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
                frm.scale = 0.33;
            }
            else{
                this.scene.start('evbedroom');
            }
        },this);
    }
}
class noodleshall extends Phaser.Scene {
    constructor(){
        super('noodleshall')
    }
    create(){
        let frames = ['evhall0','evhall1','evhall2','evhallkitchen'];
        let i=0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        frm.scale = 0.33
        this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
                frm.scale = 0.33;
            }
            else{
                this.scene.start('evkitchen');
            }
        },this);
    }
}
class evkitchen extends Phaser.Scene {
    constructor(){
        super('evkitchen')
    }
    create(){
        let frames = ['evkitchen0','evkitchen1']; let i=0;
        let sqrs = ['kettle0','kettle1','noodles0','noodles1','noodles2','noodles3','noodles4','noodles5']; let s = 0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        let sqr; let ok; let okb; let ov;
        let sqrb = this.add.zone(this.scale.width/2,this.scale.height/2,1024,1024);
        let frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
            }
            else{
                frmb.destroy();
                ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
                ok = this.add.image(this.scale.width/2,this.scale.height/2,'boil');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
        },this);
        sqrb.on('pointerup',()=>{
            ++s;
            if (s == 2){
                sqrb.disableInteractive();
                sqr.destroy();
                ok =this.add.image(this.scale.width/2,this.scale.height/2,'takenoodles');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
            else if (s==3){
                sqrb.disableInteractive();
                ok =this.add.image(this.scale.width/2,this.scale.height/2,'makenoodles');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
            else if (s==6){
                sqrb.disableInteractive();
                ok =this.add.image(this.scale.width/2,this.scale.height/2,'wait');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.sprite(this.scale.width/2,this.scale.height/2,'alarm0');
                    sqr.scale = 1.28;
                    sqr.play('alarm',true);
                    var timer = this.time.delayedCall(5000, ()=>{
                        sqr.destroy();
                        sqr = this.add.sprite(this.scale.width/2,this.scale.height/2,'alarm1');
                        sqr.scale = 1.28;
                        sqr.play('alarm6gif',true);
                        let temp = this.add.zone(this.scale.width/2,this.scale.height/2,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                            temp.destroy();
                            sqr.destroy();
                            sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                            sqr.scale = 0.5;
                            sqrb.setInteractive({useHandCursor: true});
                        },this);
                    }, this); 
                },this);
            }
            else if (s==7){
                sqrb.disableInteractive();
                ok =this.add.image(this.scale.width/2,this.scale.height/2,'eatnoodles');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
            else if (s<sqrs.length){
                sqr.destroy();
                sqr =  this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                sqr.scale = 0.5;
            }
            else{
                sqrb.destroy();
                sqr.destroy();
                ov.destroy();
                --i;
                frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    frm.destroy();
                    --i;
                    if (i>=0){
                        frm.destroy();
                        frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
                    }
                    else{
                            this.scene.start('noodleshall1');
                    }
                },this)
            }
        },this);
    }
}
class noodleshall1 extends Phaser.Scene {
    constructor(){
        super('noodleshall1')
    }
    create(){
        let frames = ['evhallkitchen','evhall3','evhall4','evhallbedroom'];
        let i=0;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        frm.scale = 0.33
        this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
                frm.scale = 0.33;
            }
            else{
                this.scene.start('evbedroom');
            }
        },this);
    }
}
class evbedroom extends Phaser.Scene {
    constructor(){
        super('evbedroom')
    }
    create(){
        let frames = ['evbed','evbed1','evbed2']; let i = 0;
        let sqrs = ['phone0','phone1','phone2','phone3']; let s = 0;
        let txt0 = ['Хм...','Я давно не связывался со своей дочерью','По-моему у нее скоро должен быть день рождения...','Надо бы ей написать...']; let d = 0;
        let txt1 = 'Надеюсь ответит...';
        let sqrb = this.add.zone(this.scale.width/2,this.scale.height/2,1024,1024);
        let ok; let okb; let sqr; let ov;
        let frm = this.add.image(this.scale.width/2,this.scale.height/2,frames[i]);
        let frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<frames.length){
                frm.destroy();
                frm =  this.add.image(this.scale.width/2,this.scale.height/2,frames[i])
            }
            else if (d == 0){
                ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
                this.scene.launch('dlg',txt0[d]);
                ++d;
            }
            else if (d<txt0.length){
                this.scene.stop('dlg');
                this.scene.launch('dlg',txt0[d]);
                ++d;
            }
            else{
                this.scene.stop('dlg');
                frmb.destroy();
                sqr =  this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                sqr.scale = 0.5;
                sqrb.setInteractive({useHandCursor: true});
            }
        },this);
        sqrb.on('pointerup',()=>{
            ++s;
            if (s<sqrs.length){
                sqr.destroy();
                sqr =  this.add.image(this.scale.width/2,this.scale.height/2,sqrs[s]);
                sqr.scale = 0.5;
            }
            else {
                sqrb.destroy();
                sqr.destroy();
                this.scene.launch('dlg',txt1);
                frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    this.scene.stop('dlg');
                    ov.destroy();
                    frmb.destroy();
                    frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                        frmb.destroy();
                        ov = this.add.image(this.scale.width/2,this.scale.height/2,'overlay');
                        ok =this.add.image(this.scale.width/2,this.scale.height/2,'gotosleep');
                        ok.scale = 0.68;
                        okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                            ok.destroy();
                            okb.destroy();
                            ov.destroy();
                            frm.destroy();
                            frm = this.add.sprite(this.scale.width/2,this.scale.height/2,'frame0');
                            frm.scale = 2.25;
                            frm.play('frame0gif',true);
                            frmb = this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{this.scene.start('transition')},this);
                        },this);
                    },this);
                },this);
            }
        },this);
    }
}
class transition extends Phaser.Scene {
    constructor(){
        super('transition')
    }
    create(){
        let days = this.registry.get('days');
        ++days;
        this.registry.set('days',days);
        this.make.text({
            style: {
                fontFamily:'determination',
                fontSize: '250px',
                color:'#ffffff',
                backgroundColor:"#000000",
                align:'center',
            },
            x:this.scale.width/2,y:this.scale.height/2,
            wordWrap:{
                width:1200
            },
            text: "ДЕНЬ " + days,
            add:true
        }).setOrigin(0.5, 0.5)
        this.add.zone(this.scale.width/2,this.scale.height/2,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            this.scene.start('frame0');
        },this)
    }
}
class dlg extends Phaser.Scene{
    constructor(){
        super('dlg');
    }
    init(text){}
    create(text){
        this.add.image(287,836,'dialogbox').setOrigin(0,0);
        this.label = this.make.text({
            x:575, y:860,
            text:'',
            style: {
                fontFamily: 'determination',
                fontSize: '48px',
                color:'#112993',
                wordWrap: {width:824},
                add:true
            }
        })
        this.typewriteTextWrapped(text);
    }
    typewriteText(text){
        const length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.label.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
    typewriteTextWrapped(text){
        const lines = this.label.getWrappedText(text)
        const wrappedText = lines.join('\n')
        this.typewriteText(wrappedText)
    }
}