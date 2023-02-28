const CREATE_EMPTY_FIELD = 'CREATE_EMPTY_FIELD';

let initialState = {
    field: [[]],
    minesCount: 40,
    fieldSize: [16, 16],
    // состояние игры: 1 - только началась, 2 - игра идет, 3 - поражение, 4 - победа
    gameState: 1
};

export const fieldReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_EMPTY_FIELD:
            let newField = [];
            let row = [];
            let key = 1
            for (let i = 0; i < state.fieldHeight; i++) {
                for (let j = 0; j < state.fieldWidth; j++) {
                    // ключ type: 1 - пустая ячейка, 2 - цифра, обозначающая кол-во ячеек рядом, 3 - мина
                    // ключ coors - координаты ячейки
                    row.push({key: '0' + key, coors: [i, j], type: 1, close: true })
                    key++
                };
                newField.push(row);
                row = [];
            };
            return { ...state, field: newField };
        default:
            return state;
    }
};


