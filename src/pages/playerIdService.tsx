import { LocalStorageService } from '../services/localStorageService';

function getPlayerId() {
  const PLAYER_ID_KEY = 'playerId';
  let playerId = LocalStorageService.getItem(PLAYER_ID_KEY);
  console.log({ playerId });

  if (!playerId) {
    playerId = crypto.randomUUID();
    LocalStorageService.setItem(PLAYER_ID_KEY, playerId);
  }
  return playerId;
}

export const PlayerIdService = {
  getPlayerId,
};
