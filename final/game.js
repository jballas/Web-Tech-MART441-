// Setup game details
var config = {
    type: Phaser.AUTO,
    width: 1125,
    height: 2436,
    parent: "game-container",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// GLOBAL VARIABLES
var player;
var berries;
var cursors;
var health;
var hunger;
var game_over = false;
var menu;

const game = new Phaser.Game(config);

function preload(){
  //this.load.image('bus', 'assets/bus_background.png');
  this.load.image('tiles', 'assets/Forest_Tileset.png');
  this.load.tilemapTiledJSON('mtn_map', 'assets/mtn_map.json');
  this.load.spritesheet('rosie', 'assets/rosie.png', { frameWidth: 32, frameHeight: 32, endFrame: 11});
}

function create() {
  // displays the tilemap from the tileset
  var map = this.make.tilemap({ key: 'mtn_map', tileWidth: 32, tileHeight: 32});
  var tiles = map.addTilesetImage('Forest_Tileset', 'tiles')

  // my tilemap has 2 layers, these are both static images
  var bg_layer = map.createStaticLayer("background", tiles, 0,0);
  var tree_layer = map.createStaticLayer("trees", tiles, 0,0);


  // Creates Collisions with any tile that has been marked
  tree_layer.setCollisionByProperty({collision: true});

// displays player sprite
player = this.physics.add.sprite(100,800, 'rosie');

// Keeps player within world boundary
  player.setCollideWorldBounds(true);

// Player animations
this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('rosie', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'rosie', frame: 1 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('rosie', { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('rosie', { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1
});
this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('rosie', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
});

// Movement with keyboard Input
    cursors = this.input.keyboard.createCursorKeys();

// check if player and objects have collided
this.physics.add.collider(player, tree_layer);

// Camera

camera = this.cameras.main;

camera.startFollow(player);
camera.setBounds(0,0, map.widthInPixels, map.heightInPixels);
}

function update(){
/*      if (gameOver) {
          return;
      } */

      if (cursors.left.isDown)
      {
          player.setVelocityX(-160);

          player.anims.play('left', true);
      }
      else if (cursors.right.isDown)
      {
          player.setVelocityX(160);

          player.anims.play('right', true);
      }
      else if (cursors.up.isDown)
      {
          player.setVelocityY(-160);

          player.anims.play('up', true);
      }
      else if (cursors.down.isDown)
      {
          player.setVelocityY(160);

          player.anims.play('down', true);
      }

      else
      {
          player.setVelocityX(0);
          player.setVelocityY(0);

          player.anims.play('turn');
      }



}