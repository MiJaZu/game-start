// export let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

// const acceleration = 10;
let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null;
const groundDeceleration = 5;
const airDeceleration = 2;

export interface PlayerData {
  id: string;
  x: number;
  y: number;
}

export function createPlayer(scene: Phaser.Scene) {
  // Create the player sprite
  player = scene.physics.add.sprite(100, 450, 'dude');

  // Set player properties
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // Add animations
  scene.anims.create({
    key: 'left',
    frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  scene.anims.create({
    key: 'right',
    frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  player.body.setGravityY(300);
  return player;
}

// export function addPlayerCollisions(
//     scene: Phaser.Scene,
//     newPlayer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
//     players: Map<string, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>
// ) {
//     players.forEach((existingPlayer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
//         if(existingPlayer !== newPlayer) {
//             scene.physics.add.collider(existingPlayer, newPlayer);
//         }
//     });
// }

export function movePlayer(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
  if (!player) return;
  const currentDeceleration = player.body.touching.down
    ? groundDeceleration
    : airDeceleration * 2;

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    if (player.body.velocity.x > 0) {
      player.setVelocityX(player.body.velocity.x - currentDeceleration);
    } else if (player.body.velocity.x < 0) {
      player.setVelocityX(player.body.velocity.x + currentDeceleration);
    }
    // player.setVelocityX(0);
    if (player.body.velocity.x === 0 && player.body.touching.down) {
      player.anims.play('turn');
    }
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-430);
  }
}
