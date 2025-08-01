import { TestAnimationManager } from '../../AnimationManager/TestAnimationManager';
import { PlayerPhaser } from '../../PlayerPhaser';
import { ENVIRONMENT } from '../../assets/TutorialAssets/EnvironmentAssets'
import PLAYER from '../../assets/TutorialAssets/PlayerAssets';

const { SKY, GROUND } = ENVIRONMENT;
export class TestScene extends Phaser.Scene {
  readonly config;
  private myPlayer: PlayerPhaser | undefined;
  readonly players: Map<string, PlayerPhaser> = new Map();
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
    this.load.spritesheet(PLAYER.key, PLAYER.url, PLAYER.frame);
  }

  create() {
    // Create background
    this.add.image(400, 300, SKY.key);
    // Set up input
    this.cursors = this.input.keyboard?.createCursorKeys();

    // Create platforms
    this.generatePlatforms();
    TestAnimationManager.createPlayerAnimations(this);

    // Create Players
    this.updatePlayers('id-1', { x: 200, y: 450 });
    this.updatePlayers('id-2', { x: 600, y: 450 });

    // Create player
    this.myPlayer = new PlayerPhaser(this, 100, 450, PLAYER.key);
    this.myPlayer.addColiders(this, this.platforms, this.players);

  }

  update(): void {
    if (this.myPlayer) {
      this.myPlayer.movePlayer(this.cursors);
    }
  }

  updatePlayers(id: string, chords: { x: number, y: number}): void {
    if(this.players.has(id)) return;
    const newPlayer = new PlayerPhaser(this, chords.x, chords.y, PLAYER.key);
    this.players.set(id, newPlayer);
    newPlayer.addColiders(this, this.platforms, this.players);
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
