import PLAYER from './assets/TutorialAssets/PlayerAssets'

const { key } = PLAYER;

export class PlayerSprite extends Phaser.Physics.Arcade.Sprite {

  private readonly GravityY = 300;

  //Movement properties
  private groundAceleration = 1;
  readonly groundDeceleration = 5;
  readonly airDeceleration = 2;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, key);

    // Add physics properties
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Configurar físicas
    this.setGravityY(this.GravityY);
    this.setCollideWorldBounds(true);
  }

  addColiders(
    scene: Phaser.Scene,
    environment:
      | Phaser.Physics.Arcade.Sprite
      | Phaser.Physics.Arcade.StaticGroup
      | undefined,
    players?: Map<string, PlayerSprite>
  ) {
    if (!environment) throw new Error('Environment is not defined');
    scene.physics.add.collider(this, environment);
    if (players) {
      players.forEach((player) => {
        scene.physics.add.collider(this, player);
      });
    }
  }

  movePlayer(cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined) {
    if (!cursors) {
      throw new Error('Cursors are not defined');
    }
    
    if (!this.body) {
      console.log('No body was created')
      return;
    }
    
    const currentDeceleration = this.body.touching.down
      ? this.groundDeceleration
      : this.airDeceleration * 2;

    if(cursors.shift.isDown && this.groundAceleration <= 2) {
      this.groundAceleration = this.groundAceleration + 0.1;
    } else {
      this.groundAceleration = 1;
    }

    if (cursors.left.isDown) {
      this.setVelocityX(-160 * this.groundAceleration);
      this.anims.play(PLAYER.animations.left, true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(160 * this.groundAceleration);
      this.anims.play(PLAYER.animations.right, true);
    } else {
      if (this.body.velocity.x > 0) {
        this.setVelocityX(this.body.velocity.x - currentDeceleration);
      } else if (this.body.velocity.x < 0) {
        this.setVelocityX(this.body.velocity.x + currentDeceleration);
      }
      if (this.body.velocity.x === 0 && this.body.touching.down) {
        this.anims.play(PLAYER.animations.turn);
      }
    }

    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-430);
    }
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
  
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }
}
