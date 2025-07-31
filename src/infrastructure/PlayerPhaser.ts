import { Player } from '../domain/Player';
import { GAME_ASSETS } from './assets/TutorialAssets/AssetsConfig';

const { DUDE } = GAME_ASSETS;

export class PlayerPhaser {
  // Player properties
  private player: Player;

  // Player sprite
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private readonly GravityY = 300;
  private readonly KEY = DUDE.key;
  private readonly LEFT_ANIM = 'left';
  private readonly RIGHT_ANIM = 'right';
  private readonly TURN_ANIM = 'turn';

  //Movement properties
  readonly groundDeceleration = 5;
  readonly airDeceleration = 2;

  constructor(scene: Phaser.Scene, x: number, y: number, id: string) {
    this.player = new Player(id, x, y);
    this.sprite = scene.physics.add.sprite(x, y, this.KEY);

    this.sprite.setBounce(0.2);
    this.sprite.setCollideWorldBounds(true);

    scene.anims.create({
      key: this.LEFT_ANIM,
      frames: scene.anims.generateFrameNumbers(DUDE.key, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: this.TURN_ANIM,
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    scene.anims.create({
      key: this.RIGHT_ANIM,
      frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.sprite.body.setGravityY(this.GravityY);
  }

  addColiders(
    scene: Phaser.Scene,
    environment:
      | Phaser.Physics.Arcade.Sprite
      | Phaser.Physics.Arcade.StaticGroup
      | undefined
  ) {
    if (!environment) throw new Error('Environment is not defined');
    scene.physics.add.collider(this.sprite, environment);
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
      this.sprite.anims.play(this.LEFT_ANIM, true);
    } else if (cursors.right.isDown) {
      this.sprite.setVelocityX(160);
      this.sprite.anims.play(this.RIGHT_ANIM, true);
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
        this.sprite.anims.play(this.TURN_ANIM);
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
