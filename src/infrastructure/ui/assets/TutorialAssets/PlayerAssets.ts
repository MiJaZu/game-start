const PLAYER = {
  key: 'dude',
  url: 'src/assets/dude.png',
  frame: {
    frameWidth: 32,
    frameHeight: 48,
  },
  animations: {
    left: 'left',
    right: 'right',
    turn: 'turn',
  }
} as const;

export default PLAYER;