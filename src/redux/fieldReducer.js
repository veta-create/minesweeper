import lodash from 'lodash';
const CREATE_EMPTY_FIELD = 'CREATE_EMPTY_FIELD';
const FILL_FIELD = 'FILL_FIELD';
const MARK_MINES_NEARBY = 'MARK_MINES_NEARBY';

let initialState = {
    emptyField: [],
    field: [],
    minesCount: 40,
    minesCoors: [],
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
                    // ключ type: 1 - пустая ячейка; 2 - цифра, обозначающая кол-во ячеек рядом; 3 - мина
                    // ключ coors - координаты ячейки
                    row.push({key: '0' + key, coors: [i, j], type: 1, close: true })
                    key++;
                };
                newField.push(row);
                row = [];
            };
            return { ...state, emptyField: newField };
        case FILL_FIELD:
            let minesCoors = [];
            let usedCoors = [];

            function getRandomMineCoors() {
                min = Math.ceil(0);
                max = Math.floor(state.fieldSize[0] - 1);
                let i = 0;
                let j = 0;
                i = Math.floor(Math.random() * (max - min + 1)) + min;
                j = Math.floor(Math.random() * (max - min + 1)) + min;
                let coors = `${i} ${j}`;
                if(usedCoors.includes(coors)) {
                    getRandomMineCoors();
                } else {
                    usedCoors.push(coors);
                    return [i, j];
                };
              };

              let fillField = lodash.cloneDeep(state).emptyField;

              for(let i = 0; i < state.minesCount; i++) {
                let coors = minesCoors.push(getRandomMineCoors());
                minesCoors.push(coors);
                fillField[minesCoors[0]][minesCoors[1]].type = 3;
              };
              return { ...state, field: fillField, minesCoors: minesCoors };
        case MARK_MINES_NEARBY:
            let markField = lodash.cloneDeep(state).field;
            for(let i = 0; i < markField.length; i++) {
                for(let j = 0; j < markField[i].length; j++) {
                    let numberMinesNearby = 0;
                    if(markField[i][j].type === 1) {
                        if(i === 0 && j === 0) {
                            markField[i][j + 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j + 1].type === 3 ? numberMinesNearby++ : '';
                        } else if(i === 0 && j === state.fieldSize[0] - 1) {
                            markField[i][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j - 1].type === 3 ? numberMinesNearby++ : '';
                        } else if(i === state.fieldSize[0] - 1 && j === 0) {
                            markField[i][j + 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j + 1].type === 3 ? numberMinesNearby++ : '';
                        } else if(i === state.fieldSize[0] - 1 && j === state.fieldSize[0] - 1) {
                            markField[i][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j - 1].type === 3 ? numberMinesNearby++ : '';
                        } else if(i === 0) {
                            markField[i][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i][j + 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j + 1].type === 3 ? numberMinesNearby++ : '';
                        } else if(i === state.fieldSize[0] - 1) {
                            markField[i][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i][j + 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j + 1].type === 3 ? numberMinesNearby++ : '';
                        } else if(j === 0) {
                            markField[i][j + 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j + 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j + 1].type === 3 ? numberMinesNearby++ : '';
                        } else if(j === state.fieldSize[0] - 1) {
                            markField[i][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j].type === 3 ? numberMinesNearby++ : '';
                        } else {
                            markField[i][j + 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i - 1][j + 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j - 1].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j].type === 3 ? numberMinesNearby++ : '';
                            markField[i + 1][j + 1].type === 3 ? numberMinesNearby++ : '';
                        }
                        markField[i][j].type = 2;
                        markField[i][j].numberMines = numberMinesNearby;
                    };
                }
            }
        default:
            return state;
    }
};

export const createEmptyField = () => ({
    type: CREATE_EMPTY_FIELD
});

export const fillField = () => ({
    type: FILL_FIELD
});

export const markMinesNearby = () => ({
    type: MARK_MINES_NEARBY
});

