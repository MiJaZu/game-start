import Phaser from 'phaser';
import { TestScene } from './GameScenes/TutorialScenes/TestScene';

export class GamePhaser {
  private game: Phaser.Game;
  private config: Phaser.Types.Core.GameConfig;
  private TutorialScenes: (typeof Phaser.Scene)[] = [TestScene];
  private Gravity = { x: 0, y: 300 };

  constructor(containerId: string) {
    this.config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: this.Gravity,
          debug: true,
        },
      },
      parent: containerId,
      scene: [...this.TutorialScenes],
    };
    this.game = new Phaser.Game(this.config);
  }

  start() {
    if (!this.game) {
      this.game = new Phaser.Game(this.config);
      this.game.scene.start('TestScene');
    }
  }

  stop() {
    if (this.game) {
      this.game.destroy(true);
    }
  }

  getGame() {
    return this.game;
  }
}
