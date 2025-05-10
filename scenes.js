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
        this.randomizer=[-1,-1,-1];
    }
    create(){
        this.registry.set('clicks', this.clicks);
        this.registry.set('days', this.days);
        this.registry.set('rand',this.randomizer);
        this.add.image(925,540,'mainmenu');
        let btnsprite = this.add.sprite(1057,116,'startbutton').setOrigin(0,0);
        let btn = this.add.zone(1139,118,351,83).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerover',()=>{
            btnsprite.setFrame(1);
        });
        btn.on('pointerout',()=>{
            btnsprite.setFrame(0);
        });
        btn.on('pointerup',()=>{
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
        let frm = this.add.sprite(925,540,'frame0').setInteractive({useHandCursor: true});
        frm.scale = 2.25;
        frm.play('frame0gif',true);
        frm.once(
            'pointerup',
            ()=>{
                frm.removeInteractive();
                this.add.image(925,540,'overlay');
                this.add.image(925,540,'choice0');
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
        let frm = this.add.image(925,540,'bedroom').setInteractive({useHandCursor: true});
        //let char = this.add.sprite(858,436,'char');
        let ov = this.add.image(925,540,'overlay');
        this.scene.launch('dlg',[dlg[i],'0']);
        let frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true});
        frmb.on('pointerup',()=>{
                ++i;
                if (i >= dlg.length){
                    this.scene.stop('dlg');
                    frmb.destroy();
                    let chc = this.add.image(925,540,'choice1');
                    let left =this.add.zone(498,623,345,92).setOrigin(0,0);
                    left.setInteractive({useHandCursor: true}); 
                    let right =this.add.zone(1051,623,345,92).setOrigin(0,0);
                    right.setInteractive({useHandCursor: true});
                    left.on('pointerup',()=>{
                        left.destroy();
                        right.destroy();
                        ov.destroy();
                        chc.destroy();
                        console.log(chc);
                        this.iteration(true);
                    },this);
                    right.on('pointerup',()=>{
                        left.destroy();
                        right.destroy();
                        ov.destroy();
                        chc.destroy();
                        this.iteration(false);
                    },this);
                }
                else{
                    this.scene.stop('dlg');
                    this.scene.launch('dlg',[dlg[i],'0']);
                }
            }, this)
    }
    iteration(flag){
        let positions = [[858,436],[1347,444]]; let i = 0;
        let char = this.add.sprite(positions[i][0],positions[i][1],'char').setOrigin(0,0);
        char.scale = 0.58;
        let frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<positions.length){
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else {
                if (flag) {
                    this.scene.start('coffeehall');
                }
                else{
                    this.scene.start('pchall');
                }
            }
        },this)
    }
}
class pchall extends Phaser.Scene {
    constructor(){
        super('pchall')
    }
    create(){
        let positions = [[97,439],[376,473],[680,507],[1137,473],[1504,500]];
        let i=0;
        let frm = this.add.image(925,540,'hall');
        let char = this.add.sprite(positions[0][0],positions[0][1],'char').setOrigin(0,0);
        char.setVisible(false);
        char.scale = 0.38;
        this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            if (i<positions.length){
                char.setVisible(true);
                char.setFrame(i);
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else{
                this.scene.start('pc');
            }
            ++i;
        },this);
    }
}
class coffeehall extends Phaser.Scene {
    constructor(){
        super('coffeehall')
    }
    create(){
        let positions = [[97,439],[376,473],[680,507],[854,441]];
        let i=0;
        let frm = this.add.image(925,540,'hall');
        let char = this.add.sprite(positions[0][0],positions[0][1],'char').setOrigin(0,0);
        char.setVisible(false);
        char.scale = 0.38;
        this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            if (i<positions.length-1){
                char.setVisible(true);
                char.setFrame(i);
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else if (i == positions.length-1){
                char.setFrame(0);
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else{
                this.scene.start('kitchen');
            }
            ++i;
        },this);
    }
}
class kitchen extends Phaser.Scene {
    constructor(){
        super('kitchen')
    }
    create(){
        let positions = [[406,436]]; let i = 0;
        let sqrs = ['emptycup','cup1','cup2','cup3','cup4','cup5','cup6','cup7']; let s = 0;
        let frm = this.add.image(925,540,'kitchen');
        let char = this.add.sprite(positions[0][0],positions[0][1],'char').setOrigin(0,0);
        char.setVisible(false);
        let sqr; let ok; let okb; let ov;
        let sqrb = this.add.zone(925,540,1024,1024);
        let frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            if (i<positions.length){
                char.setVisible(true);
                char.setPosition(positions[i][0],positions[i][1]);
                 ++i;
            }
            else{
                frmb.destroy();
                ov = this.add.image(925,540,'overlay');
                ok = this.add.image(925,540,'makecoffee');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(925,540,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
        },this)
        sqrb.on('pointerup',()=>{
            ++s;
            if (s == 2){
                sqrb.disableInteractive();
                ok =this.add.image(925,540,'mix');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(925,540,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
            else if (s==8){
                sqrb.destroy();
                ok =this.add.image(925,540,'drinkcoffee');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    okb.destroy();
                    ok.destroy();
                    sqr = this.add.image(925,540,sqrs[0]);
                    sqr.scale = 0.5;
                    sqrb = this.add.zone(925,540,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                        sqrb.destroy();
                        sqr.destroy();
                        ov.destroy();
                        --i;
                        frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                            --i;
                            if (i>=0){
                                char.setVisible(true);
                                char.setPosition(positions[i][0],positions[i][1]);
                            }
                            else{
                                char.destroy();
                                frmb.destroy();
                                frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                    this.scene.start('coffeehall1');
                                },this);
                            }
                        },this)
                    },this)
                },this);
            }
            else{
                sqr.destroy();
                sqr =  this.add.image(925,540,sqrs[s]);
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
        let positions = [[854,441],[1137,473],[1504,500]];
        let i=1;
        let frm = this.add.image(925,540,'hall');
        let char = this.add.sprite(positions[0][0],positions[0][1],'char').setOrigin(0,0);
        char.scale = 0.38;
        this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            if (i<positions.length){
                char.setVisible(true);
                char.setFrame(i+2);
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else{
                this.scene.start('pc');
            }
            ++i;
        },this);
    }
}
class pc extends Phaser.Scene {
    constructor(){
        super('pc')
    }
    create(){
        let positions =[[373,394],[828,394],[1259,392]]; let i=0;
        let sqrs = ['desktop0','desktop1','desktop2']; let s = 0;
        let frm = this.add.image(925,540,'pcbg');
        let char = this.add.sprite(positions[0][0],positions[0][1],'char').setOrigin(0,0);
        char.setVisible(false);
        char.scale = 0.64;
        let sqr; let ok; let okb; let ov;
        let sqrb = this.add.zone(925,540,1024,1024);
        let frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            if (i<positions.length){
                char.setVisible(true);
                char.setPosition(positions[i][0],positions[i][1]);
                 ++i;
            }
            else{
                frmb.destroy();
                ov = this.add.image(925,540,'overlay');
                let chc = this.add.image(925,540,'workgame');
                let left =this.add.zone(498,623,345,92).setOrigin(0,0);
                left.setInteractive({useHandCursor: true});
                let right =this.add.zone(1051,623,345,92).setOrigin(0,0);
                right.setInteractive({useHandCursor: true});
                left.once('pointerup',()=>{
                    left.removeInteractive();
                    chc.destroy();
                    right.disableInteractive();
                    this.scene.launch('dlg',['Не... Не хочу.','0']);
                    frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                        frmb.destroy();
                        this.scene.stop('dlg');
                        chc = this.add.image(925,540,'game');
                        right.setInteractive({useHandCursor: true});
                    },this)
                },this);
                right.once('pointerup',()=>{
                    left.destroy();
                    right.destroy();
                    chc.destroy();
                    sqr = this.add.sprite(925,540,'pc');
                    sqr.play('pcgif', true);
                    sqr.scale = 1.28;
                    sqrb.setInteractive({useHandCursor: true});
                });        
            }
        },this)
        sqrb.on('pointerup',()=>{
            if (s<sqrs.length){
                sqr.destroy();
                sqr =  this.add.image(925,540,sqrs[s])
                sqr.scale = 0.5;
            }
            else{
                sqrb.destroy();
                ok = this.add.image(925,540,'gamestart');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    ov.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr.destroy();
                    frm.destroy();
                    frm = this.add.sprite(925,540,'load');
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
        let variations = [['carrot','cabbage','potato'],['farm3','farm3cabbage','farm3potato']]
        let day = this.registry.get('days')-1;
        if (day > variations[0].length){
            var rnd = Phaser.Math.RND;
            let mem = this.registry.get('rand');
            do{
                day = rnd.between(0,variations[0].length);
            } while (day == mem[0]);
            mem[0] = day;
            this.registry.set(mem,'rand');
        }
        let i=0; let s= 0;
        let frm = this.add.image(925,540,'farm0');
        let ov = this.add.image(925,540,'overlay').setVisible(false);
        let frmb; let sqr; let sqrb;
        let gb; let gbb;
        let left = this.add.zone(1322,71,261,124).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            left.disableInteractive();
            right.disableInteractive();
            ov.setVisible(true);
            this.scene.launch('dlg',['Не... Не хочу.','1']);
                    frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
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
            frm = this.add.image(925,540,'farm1');
            frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                frmb.destroy();
                ov = this.add.image(925,540,'overlay');
                gb = this.add.image(925,540,'takeseeds');
                gb.scale = 0.53;
                if (day != variations[0].length){
                    gbb = this.add.zone(925,540,678,328).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                            gb.destroy();
                            gbb.destroy();
                            sqr = this.add.image(925,540,variations[0][day]);
                            sqr.scale = 0.5;
                            sqrb = this.add.zone(925,540,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                sqr.destroy();
                                sqrb.destroy();
                                gb = this.add.image(925,540,'plantseeds');
                                gb.scale = 0.53;
                                gbb = this.add.zone(925,540,678,328).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                    gb.destroy();
                                    gbb.destroy();
                                    let sqrs = ['seed0','seed1','seed2','seed3','seed4']; let s = 0;
                                    sqr = this.add.image(925,540,sqrs[s]);
                                    sqr.scale = 0.5;
                                    sqrb = this.add.zone(925,540,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                        ++s;
                                        if (s < sqrs.length){
                                            sqr.destroy();
                                            sqr = this.add.image(925,540,sqrs[s]);
                                            sqr.scale = 0.5;
                                        }
                                        else{
                                            sqr.destroy();
                                            sqrb.destroy();
                                            frm.destroy();
                                            ov.destroy();
                                            frm = this.add.image(925,540,'farm2');
                                            frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                                frmb.destroy();
                                                ov = this.add.image(925,540,'overlay');
                                                gb = this.add.image(925,540,'watercrops');
                                                gb.scale = 0.53;
                                                gbb = this.add.zone(925,540,678,328).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                                    gb.destroy();
                                                    gbb.destroy();
                                                    let sqrs = ['pot0','pot1']; let s = 0;
                                                    sqr = this.add.image(925,540,sqrs[s]);
                                                    sqr.scale = 0.5;
                                                    sqrb = this.add.zone(925,540,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                                        ++s;
                                                        if (s < sqrs.length){
                                                            sqr.destroy();
                                                            sqr = this.add.image(925,540,sqrs[s]);
                                                            sqr.scale = 0.5;
                                                        }
                                                        else{
                                                            sqr.destroy();
                                                            sqrb.destroy();
                                                            frm.destroy();
                                                            ov.destroy();
                                                            frm = this.add.image(925,540,variations[1][day]);
                                                            frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                                                frm.destroy();
                                                                frmb.destroy();
                                                                frm = this.add.image(925,540,'farm4');
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
                }
                else{
                    gbb = this.add.zone(925,540,678,328).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                        gb.destroy();
                        gbb.destroy();
                        this.scene.launch('dlg',['Семена пропали. На их месте сидит цыпленок. Видимо, это он их съел.','2']);
                        frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                            this.scene.stop('dlg');
                            frmb.destroy();
                            sqr = this.add.image(925,540,'chicken0');
                            sqr.scale = 0.5;
                            sqrb = this.add.zone(925,540,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                sqr.destroy();
                                sqrb.destroy();
                                let left = this.add.image(925,245,'pet').setOrigin(0.5,0);
                                left.scale = 0.45;
                                let right = this.add.image(925,554,'kick').setOrigin(0.5,0);
                                right.scale =0.45;
                                let leftb = this.add.zone(925,245,573,277).setOrigin(0.5,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                    left.destroy();
                                    leftb.destroy();
                                    right.destroy();
                                    rightb.destroy();
                                    sqr = this.add.sprite(925,540,'chicken0');
                                    sqr.scale = 1.28;
                                    sqr.play('chicken2gif')
                                    sqrb = this.add.zone(925,540,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                        sqr.destroy();
                                        sqrb.destroy();
                                        ov.destroy();
                                        frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                            this.scene.start('ev0');
                                        },this);
                                    },this);
                                },this);
                                let rightb = this.add.zone(925,554,573,277).setOrigin(0.5,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                    left.destroy();
                                    leftb.destroy();
                                    right.destroy();
                                    rightb.destroy();
                                    sqr = this.add.image(925,540,'chicken1');
                                    sqr.scale = 0.5;
                                    sqrb = this.add.zone(925,540,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                        sqr.destroy();
                                        sqrb.destroy();
                                        ov.destroy();
                                        frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                                            this.scene.start('ev0');
                                        },this);
                                    },this);
                                },this);
                            },this);
                        },this);
                    },this);
                }
            },this)
        },this);
    }
}
class ev0 extends Phaser.Scene {
    constructor(){
        super('ev0')
    }
    create(){
        let sqrs = ['desktop2','desktop1','poweron','poweroff']; let s=0;
        let frm = this.add.image(925,540,'pcbg');
        let char = this.add.sprite(1259,392,'char').setOrigin(0,0);
        char.scale = 0.64;
        this.add.image(925,540,'evlightpc');
        let ov = this.add.image(925,540,'overlay');
        let frmb = this.add.zone(925,540,1350,1080);
        let sqr = this.add.image(925,540,sqrs[s]);
        sqr.scale = 0.5;
        let sqrb = this.add.zone(925,540,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++s;
            if (s == 2){
                sqrb.disableInteractive();
                let ok =this.add.image(925,540,'turnoff');
                ok.scale = 0.68;
                let okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(925,540,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
            else if (s <sqrs.length){
                sqr.destroy();
                sqr = this.add.image(925,540,sqrs[s]);
                sqr.scale = 0.5;
            }
            else{
                sqr.destroy();
                sqrb.destroy();
                ov.destroy();
                frmb.setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    frmb.destroy();
                    ov = this.add.image(925,540,'overlay');
                    let chc = this.add.image(925,540,'sleepnoodles');
                    let left =this.add.zone(498,623,345,92).setOrigin(0,0);
                    left.setInteractive({useHandCursor: true}); 
                    let right =this.add.zone(1051,623,345,92).setOrigin(0,0);
                    right.setInteractive({useHandCursor: true});
                    left.on('pointerup',()=>{
                        ov.destroy();
                        chc.destroy();
                        left.destroy();
                        right.destroy();
                        this.iteration(false,char);
                    },this);
                    right.on('pointerup',()=>{
                        ov.destroy();
                        chc.destroy();
                        left.destroy();
                        right.destroy();
                        this.iteration(true,char);
                    },this);
            },this);
            }
        },this);
    }
    iteration(flag,char){
        let positions =[[1259,392],[785,396],[293,401]]; let i=0;
        let frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            ++i;
            if (i<positions.length){
                char.setVisible(true);
                char.setPosition(positions[i][0],positions[i][1]);
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
        let positions = [[1515,511],[1133,479],[671,502],[374,470],[97,439]];
        let i=0;
        let frm = this.add.image(925,540,'hall');
        let char = this.add.sprite(positions[0][0],positions[0][1],'char').setOrigin(0,0);
        char.setFlipX(true);
        char.setVisible(false);
        char.scale = 0.38;
        let light = this.add.image(925,540,'evlighthall');
        this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            if(i==0){
                char.setVisible(true);
                char.setFrame(4);
            }
            else if (i==4){
                char.setVisible(true);
                char.setFrame(0);
                char.setFlipX(false);
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else if (i<positions.length){
                char.setVisible(true);
                char.setFrame(i);
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else{
                this.scene.start('evbedroom');
            }
            ++i;
        },this);
    }
}
class noodleshall extends Phaser.Scene {
    constructor(){
        super('noodleshall')
    }
    create(){
        let positions = [[1515,511],[1133,479],[854,441]];
        let i=0;
        let frm = this.add.image(925,540,'hall');
        let char = this.add.sprite(positions[0][0],positions[0][1],'char').setOrigin(0,0);
        char.setFlipX(true);
        char.setVisible(false);
        char.scale = 0.38;
        let light = this.add.image(925,540,'evlighthall');
        this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
             if(i==0){
                char.setVisible(true);
                char.setFrame(4);
            }
            else if (i==positions.length-1){
                char.setVisible(true);
                char.setFrame(0);
                char.setFlipX(false);
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else if (i<positions.length){
                char.setVisible(true);
                char.setFrame(i);
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else{
                this.scene.start('evkitchen');
            }
            ++i;
        },this);
    }
}
class evkitchen extends Phaser.Scene {
    constructor(){
        super('evkitchen')
    }
    create(){
        let positions = [[406,436]]; let i = 0;
        let sqrs = ['kettle0','kettle1','noodles0','noodles1','noodles2','noodles3','noodles4','noodles5']; let s = 0;
        let frm = this.add.image(925,540,'evkitchen');;
        let char = this.add.sprite(positions[0][0],positions[0][1],'char').setOrigin(0,0);
        char.setVisible(false);
        let light = this.add.image(925,540,'evlightkitchen')
        let sqr; let ok; let okb; let ov;
        let sqrb = this.add.zone(925,540,1024,1024);
        let frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
           if (i<positions.length){
                char.setVisible(true);
                char.setPosition(positions[i][0],positions[i][1]);
                 ++i;
            }
            else{
                frmb.destroy();
                ov = this.add.image(925,540,'overlay');
                ok = this.add.image(925,540,'boil');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(925,540,sqrs[s]);
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
                ok =this.add.image(925,540,'takenoodles');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(925,540,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
            else if (s==3){
                sqrb.disableInteractive();
                ok =this.add.image(925,540,'makenoodles');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(925,540,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
            else if (s==6){
                sqrb.disableInteractive();
                ok =this.add.image(925,540,'wait');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.sprite(925,540,'alarm0');
                    sqr.scale = 1.28;
                    sqr.play('alarm',true);
                    var timer = this.time.delayedCall(5000, ()=>{
                        sqr.destroy();
                        sqr = this.add.sprite(925,540,'alarm1');
                        sqr.scale = 1.28;
                        sqr.play('alarm6gif',true);
                        let temp = this.add.zone(925,540,1024,1024).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                            temp.destroy();
                            sqr.destroy();
                            sqr = this.add.image(925,540,sqrs[s]);
                            sqr.scale = 0.5;
                            sqrb.setInteractive({useHandCursor: true});
                        },this);
                    }, this); 
                },this);
            }
            else if (s==7){
                sqrb.disableInteractive();
                ok =this.add.image(925,540,'eatnoodles');
                ok.scale = 0.68;
                okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    sqr.destroy();
                    ok.destroy();
                    okb.destroy();
                    sqr = this.add.image(925,540,sqrs[s]);
                    sqr.scale = 0.5;
                    sqrb.setInteractive({useHandCursor: true});
                },this);
            }
            else if (s<sqrs.length){
                sqr.destroy();
                sqr =  this.add.image(925,540,sqrs[s]);
                sqr.scale = 0.5;
            }
            else{
                sqrb.destroy();
                sqr.destroy();
                ov.destroy();
                --i;
                frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    --i;
                    if (i>=0){
                        char.setVisible(true);
                        char.setPosition(positions[i][0],positions[i][1]);
                    }
                    else{
                        char.destroy();
                        frmb.destroy();
                        frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                            this.scene.start('noodleshall1');
                        },this);
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
        let positions = [[854,441],[671,502],[374,470],[97,439]];
        let i=1;
        let frm = this.add.image(925,540,'hall');
        let char = this.add.sprite(positions[0][0],positions[0][1],'char').setOrigin(0,0);
        char.scale = 0.38;
        let light = this.add.image(925,540,'evlighthall');
        this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            if(i==positions.length-1){
                char.setVisible(true);
                char.setFlipX(false);
                char.setFrame(0);
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else if (i<positions.length){
                char.setVisible(true);
                char.setFlipX(true);
                char.setFrame(i+1);
                char.setPosition(positions[i][0],positions[i][1]);
            }
            else{
                this.scene.start('evbedroom');
            }
            ++i;
        },this);
    }
}
class evbedroom extends Phaser.Scene {
    constructor(){
        super('evbedroom')
    }
    create(){
        let positions = [[1309,460],[887,454]]; let i = 0;
        let sqrs = ['phone0','phone1','phone2','phone3']; let s = 0;
        let txt0; let d = 0;
        let txt1 = 'Надеюсь ответит...';
        let day = this.registry.get('days')-1; let t;
        let txtvar = [['Хм...','Я давно не связывался со своей дочерью.','По-моему у нее скоро должен быть день рождения...','Надо бы ей написать...'],['Надо написать дочке.'],['Дочь всё ещё не отвечает...','Надо написать ещё раз.']];
        if (day < txtvar.length){
            txt0 = txtvar[day];
        }
        else{
            var rnd = Phaser.Math.RND;
            let mem = this.registry.get('rand');
            do{
                t = rnd.between(1,txtvar.length-1);
            } while (day == mem[1]);
            mem[1] = day;
            this.registry.set(mem,'rand');
            txt0 = txtvar[t];
        }
        if (day < 7){
            sqrs[3] += (day).toString();
        }
        else{
            var rnd = Phaser.Math.RND;
            let mem = this.registry.get('rand');
            do{
                t = rnd.between(1,6);
            } while (day == mem[2]);
            mem[2] = day;
            this.registry.set(mem,'rand');
            sqrs[3] += t.toString();
        }
        let sqrb = this.add.zone(925,540,1024,1024);
        let ok; let okb; let sqr; let ov;
        let frm = this.add.image(925,540,'evbedroom');
        let char = this.add.sprite(positions[i][0],positions[i][1],'char').setOrigin(0,0);
        char.scale = 0.58;
        char.setVisible(false);
        let light = this.add.image(925,540,'evlightbedroom');
        let frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
            if (i<positions.length){
                char.setVisible(true);
                char.setPosition(positions[i][0],positions[i][1]);
                ++i;
        }
            else if (d == 0){
                ov = this.add.image(925,540,'overlay');
                this.scene.launch('dlg',[txt0[d],'0']);
                ++d;
            }
            else if (d<txt0.length){
                this.scene.stop('dlg');
                this.scene.launch('dlg',[txt0[d],'0']);
                ++d;
            }
            else{
                this.scene.stop('dlg');
                frmb.destroy();
                sqr =  this.add.image(925,540,sqrs[s]);
                sqr.scale = 0.5;
                sqrb.setInteractive({useHandCursor: true});
            }
        },this);
        sqrb.on('pointerup',()=>{
            ++s;
            if (s<sqrs.length){
                sqr.destroy();
                sqr =  this.add.image(925,540,sqrs[s]);
                sqr.scale = 0.5;
            }
            else {
                sqrb.destroy();
                sqr.destroy();
                this.scene.launch('dlg',[txt1,'0']);
                frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                    this.scene.stop('dlg');
                    ov.destroy();
                    frmb.destroy();
                    frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                        frmb.destroy();
                        ov = this.add.image(925,540,'overlay');
                        ok =this.add.image(925,540,'gotosleep');
                        ok.scale = 0.68;
                        okb = this.add.zone(1107,667,273,74).setOrigin(0,0).setInteractive({useHandCursor: true}).on('pointerup',()=>{
                            ok.destroy();
                            okb.destroy();
                            ov.destroy();
                            frm.destroy();
                            frm = this.add.sprite(925,540,'frame0');
                            frm.scale = 2.25;
                            frm.play('frame0gif',true);
                            frmb = this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{this.scene.start('transition')},this);
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
        this.add.zone(925,540,1350,1080).setInteractive({useHandCursor: true}).on('pointerup',()=>{
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
        let cx; let cy; let clr; let scl; let wrp; let fsize;
        if (text[1] == '0'){
            cx = 580; cy = 860;
            clr = '#112993';
            scl = 1;
            wrp = 824;
            fsize = '48px';
        }
        else if (text[1] == '1'){
            cx= 591; cy = 814;
            clr = "brown";
            scl = 1;
            wrp = 824;
            fsize = '48px';
        }
        else if (text[1] == '2'){
            cx = 450; cy = 450;
            clr ="#ffffff"
            scl = 0.46;
            wrp = 1017;
            fsize = '60px';
        }
        this.add.image(925,540,'dialogbox'+text[1]).scale = scl;
        this.label = this.make.text({
            x:cx, y:cy,
            text:'',
            style: {
                fontFamily: 'determination',
                fontSize: fsize,
                color:clr,
                wordWrap: {width:wrp},
                add:true
            }
        })
        this.typewriteTextWrapped(text[0]);
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