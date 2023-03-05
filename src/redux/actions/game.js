import { INIT_GAME, RESET_GAME, OPEN_CELL, DEMINE_CLICK, CHANGE_TIMER_ACTIVE, CHANGE_SMILE_STATE } from '../constants';

export const initGame = (coords, isRestart) => ({
  type: INIT_GAME,
  coords,
  isRestart,
});

export const resetGame = () => ({
  type: RESET_GAME,
});

export const openCell = (coords) => ({
  type: OPEN_CELL,
  coords,
});

export const demineClick = (coords) => ({
  type: DEMINE_CLICK,
  coords,
});

export const changeTimerActive = (timerActive) => ({
  type: CHANGE_TIMER_ACTIVE,
  timerActive,
});

export const changeSmileState = (smileState) => ({
  type: CHANGE_SMILE_STATE,
  smileState,
});