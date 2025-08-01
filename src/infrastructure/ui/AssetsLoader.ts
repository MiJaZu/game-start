import { GAME_ASSETS } from './assets/TutorialAssets/AssetsConfig';

export class AssetsLoader {
  static preloadAssets(scene: Phaser.Scene): void {
    Object.values(GAME_ASSETS).forEach(asset => {
      if (asset.frame) {
        scene.load.spritesheet(asset.key, asset.url, asset.frame);
      } else {
        scene.load.image(asset.key, asset.url);
      }
    });
  }
}
