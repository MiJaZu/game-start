import { TestAnimationManager } from '../../AnimationManager/TestAnimationManager';
import { PlayerSprite } from '../../PlayerSprite';
import { ENVIRONMENT } from '../../assets/TutorialAssets/EnvironmentAssets';
import PLAYER from '../../assets/TutorialAssets/PlayerAssets';

const { SKY, GROUND, STAR, BOMB } = ENVIRONMENT;
export class TestScene extends Phaser.Scene {
  readonly config;
  private myPlayer: PlayerSprite | undefined;
  readonly players: Map<string, PlayerSprite> = new Map();
  private platforms: Phaser.Physics.Arcade.StaticGroup | undefined;
  private stars: Phaser.Physics.Arcade.Group | undefined;
  private bombs: Phaser.Physics.Arcade.Group | undefined;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined =
    undefined;

  private score = 0;
  private scoreText: Phaser.GameObjects.Text | undefined;
  private gameOver = false;

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
    this.load.image(STAR.key, STAR.url);
    this.load.image(BOMB.key, BOMB.url);
    this.load.spritesheet(PLAYER.key, PLAYER.url, PLAYER.frame);
  }

  create() {
    // Create background
    TestAnimationManager.createPlayerAnimations(this);
    this.add.image(400, 300, SKY.key);
    // Set up input
    this.cursors = this.input.keyboard?.createCursorKeys();

    // Create platforms
    this.generatePlatforms();
    this.generateStars();
    this.generateBombs();

    // Create Players
    this.updatePlayers('id-1', { x: 200, y: 450 });
    this.updatePlayers('id-2', { x: 600, y: 450 });

    // Create player
    this.myPlayer = new PlayerSprite(this, 100, 450);

    // Add score
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
    });

    // Create colisions
    this.addColliders();
  }

  update(): void {
    if (this.myPlayer) {
      this.myPlayer.movePlayer(this.cursors);
    }
  }

  updatePlayers(id: string, chords: { x: number; y: number }): void {
    if (this.players.has(id)) return;
    const newPlayer = new PlayerSprite(this, chords.x, chords.y);
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

  generateStars() {
    this.stars = this.physics.add.group({
      key: STAR.key,
      repeat: 11,
      setXY: {
        x: 12,
        y: 0,
        stepX: 70,
      },
    });
  }

  generateBombs() {
    this.bombs = this.physics.add.group();
  }

  addColliders() {
    if (this.myPlayer) {
      // Add colliders between stars and platforms and player
      if (this.stars && this.platforms) {
        this.physics.add.collider(this.stars, this.platforms);

        this.stars.children.iterate(child => {
          const sprite = child as Phaser.Physics.Arcade.Sprite;
          sprite.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
          return true;
        });

        this.physics.add.overlap(
          this.myPlayer,
          this.stars,
          (_, s) => {
            // callback when player overlaps with star
            const star = s as Phaser.Physics.Arcade.Sprite;
            star.disableBody(true, true);

            this.score += 10;
            this.scoreText?.setText(`Score: ${this.score}`);

            if (this.stars?.countActive(true) === 0) {
              this.stars.children.iterate(c => {
                const child = c as Phaser.Physics.Arcade.Sprite;
                child.enableBody(true, child.x, 0, true, true);
                return true;
              });

              if (this.myPlayer) {
                const x =
                  this.myPlayer.x < 400
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);
                
                const bomb = this.bombs?.create(x, 16, BOMB.key);
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
              }
            }
          },
          undefined,
          this
        );
      }
      // Add colliders between bombs and platforms and player
      if (this.bombs && this.platforms) {
        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(
          this.myPlayer,
          this.bombs,
          p => {
            // callback when player collides with bomb
            const player = p as Phaser.Physics.Arcade.Sprite;
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play(PLAYER.animations.turn);
            this.gameOver = true;
          },
          undefined,
          this
        );
      }
      this.myPlayer.addColiders(this, this.platforms, this.players);
    }
  }
}
