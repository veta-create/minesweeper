const CHANGE_TIMER_ACTIVE = 'CHANGE_TIMER_ACTIVE';
const CHANGE_CURRENT_MINES_COUNT = 'CHANGE_CURRENT_MINES_COUNT';
const CHANGE_SMILE_STATE = 'CHANGE_SMILE_STATE';

let initialState = {
    currentMinesCount: 40,
    timerActive: false,
    // smile state: 1 - улыбающийся, 2 - зажат, улыбается, 3 - удивлен, 4 - в очках(выигрыш), 5 - в очках(выигрыш)
    smileState: 1
};

export const topPanelReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_TIMER_ACTIVE:
            return { ...state, timerActive: action.timerActive };
        case CHANGE_CURRENT_MINES_COUNT:
            return { ...state, currentMinesCount: action.currentMinesCount };
        case CHANGE_SMILE_STATE:
            return { ...state, smileState: action.smileState };
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

export const changeSmileState = (smileState) => ({
    type: CHANGE_SMILE_STATE,
    smileState
});
