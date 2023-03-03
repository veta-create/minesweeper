const CHANGE_TIMER_ACTIVE = 'CHANGE_TIMER_ACTIVE';
const CHANGE_CURRENT_MINES_COUNT = 'CHANGE_CURRENT_MINES_COUNT';

let initialState = {
    currentMinesCount: 40,
    timerActive: false
};

export const topPanelReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_TIMER_ACTIVE:
            return { ...state, timerActive: action.timerActive };
        case CHANGE_CURRENT_MINES_COUNT:
            return { ...state, currentMinesCount: action.currentMinesCount };
        default:
            return state;
    };
};

export const changeTimerActive = (timerActive) => ({
    type: CHANGE_TIMER_ACTIVE,
    timerActive
});

export const changeCurrentMinesCount = (currentMinesCount) => ({
    type: CHANGE_CURRENT_MINES_COUNT,
    currentMinesCount
});
