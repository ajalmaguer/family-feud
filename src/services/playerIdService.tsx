import { LocalStorageService } from './localStorageService';

function getPlayerId() {
  const PLAYER_ID_KEY = 'playerId';
  let playerId = LocalStorageService.getItem(PLAYER_ID_KEY);

  if (!playerId) {
    playerId = crypto.randomUUID();
    LocalStorageService.setItem(PLAYER_ID_KEY, playerId);
  }
  return playerId;
}

export const PlayerIdService = {
  getPlayerId,
};
