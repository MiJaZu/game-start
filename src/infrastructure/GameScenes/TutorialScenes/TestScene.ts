import { GAME_ASSETS } from '../../assets/TutorialAssets/AssetsConfig';
import { PlayerPhaser } from '../../PlayerPhaser';

const { SKY, GROUND, DUDE } = GAME_ASSETS;

export class TestScene extends Phaser.Scene {
  readonly config;
  private myPlayer: PlayerPhaser | undefined;
  readonly players: PlayerPhaser[] = [];
  private platforms: Phaser.Physics.Arcade.StaticGroup | undefined;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined =
    undefined;

  constructor() {
    const config = { key: 'TestScene' };
    super(config);
    this.config = config;
  }

  preload() {
    // Load assets here
    // Follow order of loading matters
    this.load.image(SKY.key, SKY.url);
    this.load.image(GROUND.key, GROUND.url);
    this.load.spritesheet(DUDE.key, DUDE.url, DUDE.frame);
  }

  create() {
    // Create background
    this.add.image(400, 300, SKY.key);
    // Set up input
    this.cursors = this.input.keyboard?.createCursorKeys();

    // Create platforms
    this.generatePlatforms();

    // Create player
    this.myPlayer = new PlayerPhaser(this, 100, 450, DUDE.key);
    this.myPlayer.addColiders(this, this.platforms);
  }

  update(): void {
    if (this.myPlayer) {
      this.myPlayer.movePlayer(this.cursors);
    }
  }

  generatePlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, GROUND.key).setScale(2).refreshBody();
    this.platforms.create(600, 400, GROUND.key);
    this.platforms.create(50, 250, GROUND.key);
    this.platforms.create(750, 220, GROUND.key);
  }

  getPlatforms(): Phaser.Physics.Arcade.StaticGroup | undefined {
    return this.platforms;
  }
}
