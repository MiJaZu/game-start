import { Player } from '../../domain/Player';
import PLAYER from './assets/TutorialAssets/PlayerAssets';


export class PlayerPhaser {
  // Player properties
  private player: Player;

  // Player sprite
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private readonly GravityY = 300;
  private readonly KEY = PLAYER.key;

  //Movement properties
  readonly groundDeceleration = 5;
  readonly airDeceleration = 2;

  constructor(scene: Phaser.Scene, x: number, y: number, id: string) {
    this.player = new Player(id, x, y);
    this.sprite = scene.physics.add.sprite(x, y, this.KEY);

    this.sprite.setBounce(0.2);
    this.sprite.setCollideWorldBounds(true);
    
    this.sprite.body.setGravityY(this.GravityY);
  }

  addColiders(
    scene: Phaser.Scene,
    environment:
      | Phaser.Physics.Arcade.Sprite
      | Phaser.Physics.Arcade.StaticGroup
      | undefined,
    players: Map<string, PlayerPhaser>
  ) {
    if (!environment) throw new Error('Environment is not defined');
    scene.physics.add.collider(this.sprite, environment);
    if (players) {
      players.forEach((player) => {
        scene.physics.add.collider(this.sprite, player.sprite);
      });
    }
  }

  movePlayer(cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
    if (!cursors) {
      throw new Error('Cursors are not defined');
    }
    const currentDeceleration = this.sprite.body.touching.down
      ? this.groundDeceleration
      : this.airDeceleration * 2;

    if (cursors.left.isDown) {
      this.sprite.setVelocityX(-160);
      this.sprite.anims.play(PLAYER.animations.left, true);
    } else if (cursors.right.isDown) {
      this.sprite.setVelocityX(160);
      this.sprite.anims.play(PLAYER.animations.right, true);
    } else {
      if (this.sprite.body.velocity.x > 0) {
        this.sprite.setVelocityX(
          this.sprite.body.velocity.x - currentDeceleration
        );
      } else if (this.sprite.body.velocity.x < 0) {
        this.sprite.setVelocityX(
          this.sprite.body.velocity.x + currentDeceleration
        );
      }
      if (this.sprite.body.velocity.x === 0 && this.sprite.body.touching.down) {
        this.sprite.anims.play(PLAYER.animations.turn);
      }
    }

    if (cursors.up.isDown && this.sprite.body.touching.down) {
      this.sprite.setVelocityY(-430);
    }
  }

  getPlayer() {
    return this.player;
  }
}
