import { ENVIRONMENT } from './EnvironmentAssets';
import { PLAYER } from './PlayerAssets';
export interface AssetConfig {
  key: string;
  url: string;
  frame?: {
    frameWidth: number;
    frameHeight: number;
  };
}

export const GAME_ASSETS: Record<string, AssetConfig> = {
  ...ENVIRONMENT,
  ...PLAYER,
} as const;
