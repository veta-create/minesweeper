const CHANGE_TIMER_ACTIVE = 'CHANGE_TIMER_ACTIVE';

let initialState = {
    currentMinesCount: 40,
    timerActive: false
};

export const topPanelReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_TIMER_ACTIVE:
            return {...state, timerActive: action.timerActive}
        default:
            return state;
    };
};

export const changeTimerActive = (timerActive) => ({
    type: CHANGE_TIMER_ACTIVE,
    timerActive
});