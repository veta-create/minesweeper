let initialState = {
    field: [],
    minesCount: 40,
    fieldSize: [16, 16],
    // состояние игры: 1 - только началась, 2 - игра идет, 3 - поражение, 4 - победа
    gameState: 1
};

export const fieldReducer = (state = initialState, action) => {
    return state;
};
