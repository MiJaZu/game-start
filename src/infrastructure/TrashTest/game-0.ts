import Phaser from 'phaser';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createPlayer, movePlayer } from './player-0';
// import Socket from './socket';

let game: Phaser.Game | null = null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let platforms: Phaser.Physics.Arcade.StaticGroup;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined = undefined;

// let otherPlayers = new Map<string, Phaser.Types.Physics.Arcade.SpriteWithDynamicBody>();

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 280,
        x: 0,
      },
      debug: false,
    },
  },
  parent: 'main-game',
  scene: {
    preload,
    create,
    update,
  },
};

const SKY = {
  key: 'sky',
  url: 'src/assets/sky.png',
};
const GROUND = {
  key: 'ground',
  url: 'src/assets/platform.png',
};
const STAR = {
  key: 'star',
  url: 'src/assets/star.png',
};
const BOMB = {
  key: 'bomb',
  url: 'src/assets/bomb.png',
};
const DUDE = {
  key: 'dude',
  url: 'src/assets/dude.png',
  frame: {
    frameWidth: 32,
    frameHeight: 48,
  },
};

function preload(this: Phaser.Scene) {
  this.load.image(SKY.key, SKY.url);
  this.load.image(GROUND.key, GROUND.url);
  this.load.image(STAR.key, STAR.url);
  this.load.image(BOMB.key, BOMB.url);
  this.load.spritesheet(DUDE.key, DUDE.url, DUDE.frame);
}

function create(this: Phaser.Scene) {
  // ADD IMAGES in the scene
  this.add.image(400, 300, SKY.key);

  const scene = this as Phaser.Scene;
  cursors = this.input.keyboard?.createCursorKeys();

  // SET STATIS GROUPS
  platforms = generatePlatforms(scene);

  // Listen for socket events
  // setupSocketEvents(scene, platforms);

  // When I connect to the server
  // if(Socket.connected) {
  //   createMyPlayer(scene);
  //   // Socket.emit('addPlayer', { id: Socket.id, player: myPlayer });
  // } else {
  //   Socket.on('connect', () => {
  //     createMyPlayer(scene);
  //   });
  // }
}

function update(this: Phaser.Scene) {
  if (cursors) {
    movePlayer(cursors as Phaser.Types.Input.Keyboard.CursorKeys);
  }
}

// function createMyPlayer(scene: Phaser.Scene) {
// if(!myPlayer) {
//   myPlayer = createPlayer(scene);
//   scene.physics.add.collider(myPlayer, platforms);

// Notify the server about the new player
// Socket.emit('addPlayer', {
//   x: myPlayer.x,
//   y: myPlayer.y
// });
// }
// }

// function createOtherPlayer(id: string, playerData: PlayerData, scene: Phaser.Scene) {
//   if(!otherPlayers.has(id)) {
//     const otherPlayer = createPlayer(scene);
//     otherPlayer.setPosition(playerData.x, playerData.y);
//     scene.physics.add.collider(otherPlayer, platforms);
//     otherPlayers.set(id, otherPlayer);
//   }
// }

function generatePlatforms(scene: Phaser.Scene) {
  const platforms = scene.physics.add.staticGroup();
  platforms.create(400, 568, GROUND.key).setScale(2).refreshBody();
  platforms.create(600, 400, GROUND.key);
  platforms.create(50, 250, GROUND.key);
  platforms.create(750, 220, GROUND.key);
  return platforms;
}

// function setupSocketEvents(scene: Phaser.Scene, platforms: Phaser.Physics.Arcade.StaticGroup) {
//   Socket.on('existingPlayers', (existingPlayers: Map<string, PlayerData>) => {
//     console.log('Existing players:', existingPlayers);
//     existingPlayers.forEach((playerData: PlayerData) => {
//       if(playerData.id !== Socket.id && !otherPlayers.has(playerData.id)) {
//         const newPlayer = createPlayer(scene);
//         scene.physics.add.collider(newPlayer, platforms);
//         otherPlayers.set(playerData.id, newPlayer);
//       }
//     });
//   });

//   Socket.on('playerAdded', (newPlayerData: PlayerData) => {
//     if(newPlayerData.id !== Socket.id && !otherPlayers.has(newPlayerData.id)) {
//       console.log('New player added:', newPlayerData);
//       const newPlayer = createPlayer(scene);
//       scene.physics.add.collider(newPlayer, platforms);
//       otherPlayers.set(newPlayerData.id, newPlayer);
//     }
//   });
// }

export default function startGame() {
  if (!game) {
    game = new Phaser.Game(config);
  }
}
