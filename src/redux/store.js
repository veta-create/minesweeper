import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './reducers/game';

const reducers = combineReducers({
  game: gameReducer,
});

export const store = configureStore({ reducer: reducers });