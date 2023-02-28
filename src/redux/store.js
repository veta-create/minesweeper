import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { fieldReducer } from './fieldReducer';
import { topPanelReducer } from './topPanelReducer';

const reducers = combineReducers({
    fieldPage: fieldReducer,
    topPanelPage: topPanelReducer
});

const store = configureStore({reducer: reducers});

window.store = store;

export default store;