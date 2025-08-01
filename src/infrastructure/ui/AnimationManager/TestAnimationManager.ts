import PLAYER from '../assets/TutorialAssets/PlayerAssets';

export class TestAnimationManager {
  private static animationCreated = false;

  static createPlayerAnimations(scene: Phaser.Scene): void {
    if (this.animationCreated) return;
    
    scene.anims.create({
      key: PLAYER.animations.left,
      frames: scene.anims.generateFrameNumbers(PLAYER.key, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: PLAYER.animations.right,
      frames: scene.anims.generateFrameNumbers(PLAYER.key, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: PLAYER.animations.turn,
      frames: [{ key: PLAYER.key, frame: 4 }],
      frameRate: 20,
    });

    this.animationCreated = true;
  }

}