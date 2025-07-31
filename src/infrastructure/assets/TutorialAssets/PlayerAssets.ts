import type { AssetConfig } from './AssetsConfig';

export const PLAYER: Record<string, AssetConfig> = {
  DUDE: {
    key: 'dude',
    url: 'src/assets/dude.png',
    frame: {
      frameWidth: 32,
      frameHeight: 48,
    },
  },
} as const;
