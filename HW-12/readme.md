# Week 13 Response
## Date 4-11-20
## MART441.50, Julia Ballas


## Overview

This week was an Introduction to Phaser 3

## Projects

- Pickup Game

## Assignment Details

Modify the Phaser 3 tutorial from the weekly lesson.

## Weekly Report

This week we focus on the javascript library known as Phaser, version 3. It aids in creating HTML5 based webgames. We followed a tutorial in class in order to create the basic game elements, movement and animation. Now we have to figure out how to modify the code to change up the gameplay.

### Jump
Changing the jump method required changing the `function update()`. Phaser 3 works by preloading elements of the game, then creating those elements and lastly updating them as the game is played.

In order to make sure I was updating with the correct terminology, I began by researching Phaser 3's documentation, but their search method wasn't giving me any answers. Instead, I googled 'createCursorKeys() phaser 3' and got my information.

Player movement used a variable called `cursors`, which is assigned keyboard cursors. Instead of referncing the `.up` key, we had make it `cusors.space.isDown`.

### Gravity

The next task was create gravity. I began by reviewing the code to find the star's gravity inside the `function create()`. We had the stars bouncing, but where was the gravity. After revewing a Phaser example of different gravity, I found we had a gravity set in our `config` settings. (https://phaser.io/examples/v2/arcade-physics/gravity) Then realized I only needed to update the gravityY setting at the same place as the bounce. So I added this line of code.
```JS
// This gives each star less gravity, so the bounce will last longer on some of them
child.setGravityY(Phaser.Math.FloatBetween(.05,10));
```

### Sprite spritesheet

In order to change the sprite, I had to find a new one in the assets folder. I found a cute panda, 32 x 32, with a completely different grid layout. The panda had 3 x 4 grid and could essentially walk in 3 dimensions, but I only needed to have a forward facing, a walking left and walking right.

I added the new image to my `preload()` with the new dimensions of 32 x 32. I was concerned because of the layout, but after reviewing some examples, it didn't matter as long as I selected the correct frame.(https://phaser.io/examples/v3/view/animation/single-sprite-sheet)

### Spiky saw
I preloaded a new image called saw, then added as a sprite to the game world. At first I could only get it to land on top of the platform, but my goal was to have it rotate and move back and forth along the bottom.

Before I tackled the saw's location and movement, I set up collision between player and saw, and a new animation and game over sequence.

Next, I researched how to fix the sprite's location. I needed an object that rotated. So I updated the `saw.angle`. (https://phaser.io/examples/v3/view/game-objects/sprites/sprite-rotation) Then I needed to move it. So i updated the `saw.x`, but it just flew off the screen. Could I make it collide against the world boundary

I found an option to make the object wrap around.(https://rexrainbow.github.io/phaser3-rex-notes/docs/site/arcade-world/)
 I added ` this.physics.world.wrap(saw, 0.2);` which looks great, only my collisions don't work anymore.

 So I tried a couple of things. When I create it as
 `saw = this.physics.add.sprite( 600, 550, 'saw');` and it collides, but the gravity still effects it, so it falls from the sky.

So I tried:`  saw.body.setAllowGravity(false);` and the saw moved correctly, but I could also make the panda push it around. When the panda jumped on it, the saw fell through the ground, because it didn't have gravity, and because it wraps when it hits the boundary of the world, it came falling from the sky and hit the panda on the head and 'game over'. So collisions worked, as long as the panda wasn't moving.

Next, I added a collision between the saw and the platform, and changed the Y value so it appears above the platform, instead of half way inside and now it is a giant rotating death trap, forcing the player to move quickly in the beginning to avoid it.

Then I realized I had 2 collisions and they were perhaps interfering with each other. I removed `this.physics.add.collider(player, saw);` and kept the gravity from before, fixed my y position. With only one collision: `this.physics.add.collider(player, saw, hitSaw, null, this);` it seems to work like I wanted. It immediately made the game harder to test.

### New Level

I added some more variables called `level` and `levelText`, and then used a % equation so that if the score is divisible by 120, then the player has reached a new level.


## Specific questions/concerns for next week
None. I'm going to continue researching the game physics and options available to me in Phaser, since I was planning to make my final a phaser game.

## Conclusion

Phaser 3 is a fascinating game engine. I love that makes collisions easier, but you also have to use the code correctly to make it work. I had so much more fun experimenting with the logic within Phaser 3 than with vanilla javascript. I loved seeing strange things happen that I was no expecting. The tricky part with be getting familiar with the game engine enough to make my own game.
