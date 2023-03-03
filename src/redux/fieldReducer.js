import lodash from 'lodash';
const CREATE_EMPTY_FIELD = 'CREATE_EMPTY_FIELD';
const FILL_FIELD = 'FILL_FIELD';
const MARK_MINES_NEARBY = 'MARK_MINES_NEARBY';
const OPEN_CELL = 'OPEN_CELL';
const CHANGE_GAME_STATE = 'CHANGE_GAME_STATE';
const CHECK_DEFEAT = 'CHECK_DEFEAT';
const RIGHT_CLICK = 'RIGHT_CLICK';

let initialState = {
    emptyField: [],
    field: [],
    minesCount: 40,
    minesCoors: [],
    fieldSize: [16, 16],
    openCell: 0,
    // состояние игры: 1 - только началась, 2 - игра идет, 3 - поражение, 4 - победа
    gameState: 1
};

export const fieldReducer = (state = initialState, action) => {
    let stateCopy = lodash.cloneDeep(state);
    let emptyFieldCopy = stateCopy.emptyField;
    let fieldCopy = stateCopy.field;
    switch (action.type) {
        case CREATE_EMPTY_FIELD:
            let newField = [];
            let row = [];
            let key = 1
            for (let i = 0; i < state.fieldSize[0]; i++) {
                for (let j = 0; j < state.fieldSize[1]; j++) {
                    // ключ type: 1 - пустая ячейка; 2 - цифра, обозначающая кол-во ячеек рядом; 3 - мина
                    // ключ coors - координаты ячейки
                    // icon: 1 - без иконки, 2 - иконка флажок, 3 - иконка знак вопроса
                    row.push({ key: 'iR' + i + 'iC' + j, coors: [i, j], type: 1, close: true, icon: 1 })
                    key++;
                };
                newField.push(row);
                row = [];
            };
            return { ...state, emptyField: newField, field: newField };
        case FILL_FIELD:
            let minesCoors = [];
            let usedCoors = [];
            let currentCoors = `${action.coors[0]} ${action.coors[1]}`;
            let coorsNearby = [
                `${action.coors[0]} ${action.coors[1] - 1}`,
                `${action.coors[0]} ${action.coors[1] + 1}`,
                `${action.coors[0] - 1} ${action.coors[1] - 1}`,
                `${action.coors[0] - 1} ${action.coors[1]}`,
                `${action.coors[0] - 1} ${action.coors[1] + 1}`,
                `${action.coors[0] + 1} ${action.coors[1] - 1}`,
                `${action.coors[0] + 1} ${action.coors[1]}`,
                `${action.coors[0] + 1} ${action.coors[1] + 1}`
            ];

            function getRandomMineCoors() {
                let min = Math.ceil(0);
                let max = Math.floor(state.fieldSize[0] - 1);
                let i = 0;
                let j = 0;
                i = Math.floor(Math.random() * (max - min + 1)) + min;
                j = Math.floor(Math.random() * (max - min + 1)) + min;
                let coors = `${i} ${j}`;

                if (usedCoors.includes(coors) || coors === currentCoors || coorsNearby.includes(coors)) {
                    return getRandomMineCoors();
                } else {
                    usedCoors.push(coors);
                    return [i, j];
                };
            };

            let fillField = lodash.cloneDeep(state).emptyField;

            for (let i = 0; i < state.minesCount; i++) {
                let coors = getRandomMineCoors();
                minesCoors.push(coors);
                fillField[coors[0]][coors[1]].type = 3;
            };

            return { ...state, field: fillField, minesCoors: minesCoors };
        case MARK_MINES_NEARBY:
            let markField = stateCopy.field;
            for (let i = 0; i < markField.length; i++) {
                for (let j = 0; j < markField[i].length; j++) {
                    let numberMinesNearby = 0;
                    if (markField[i][j].type === 1) {
                        if (i === 0 && j === 0) {
                            numberMinesNearby = markField[i][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                        } else if (i === 0 && j === state.fieldSize[0] - 1) {
                            numberMinesNearby = markField[i][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                        } else if (i === state.fieldSize[0] - 1 && j === 0) {
                            numberMinesNearby = markField[i][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                        } else if (i === state.fieldSize[0] - 1 && j === state.fieldSize[0] - 1) {
                            numberMinesNearby = markField[i][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                        } else if (i === 0) {
                            numberMinesNearby = markField[i][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                        } else if (i === state.fieldSize[0] - 1) {
                            numberMinesNearby = markField[i][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                        } else if (j === 0) {
                            numberMinesNearby = markField[i][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                        } else if (j === state.fieldSize[0] - 1) {
                            numberMinesNearby = markField[i][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                        } else {
                            numberMinesNearby = markField[i][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i - 1][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j - 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                            numberMinesNearby = markField[i + 1][j + 1].type === 3 ? numberMinesNearby + 1 : numberMinesNearby;
                        }
                        if (numberMinesNearby > 0) {
                            markField[i][j].type = 2;
                            markField[i][j].numberMines = numberMinesNearby;
                        }
                    };
                }
            }
            return { ...state, field: markField };
        case OPEN_CELL:
            fieldCopy[action.coors[0]][action.coors[1]].close = false;
            let newOpenCell = stateCopy.openCell + 1;
            if(newOpenCell === stateCopy.fieldSize[0] * stateCopy.fieldSize[1] - stateCopy.minesCount) {
                stateCopy.gameState = 4;
            };
            return { ...state, gameState: stateCopy.gameState, field: fieldCopy, openCell: newOpenCell };
        case CHANGE_GAME_STATE:
            return { ...state, gameState: action.gameState };
        case CHECK_DEFEAT:
            if(fieldCopy[action.coors[0]][action.coors[1]].type === 3) {
                for(let i = 0; i < stateCopy.minesCoors.length; i++) {
                    fieldCopy[stateCopy.minesCoors[i][0]][stateCopy.minesCoors[i][1]].close = false;
                };
                return { ...state, gameState: 3, field: fieldCopy };
            };
        case RIGHT_CLICK:
            if(fieldCopy[action.coors[0]][action.coors[1]].close === true) {
                if(fieldCopy[action.coors[0]][action.coors[1]].icon === 1) {
                    fieldCopy[action.coors[0]][action.coors[1]].icon = 2;
                } else if(fieldCopy[action.coors[0]][action.coors[1]].icon === 2) {
                    fieldCopy[action.coors[0]][action.coors[1]].icon = 3;
                } else if(fieldCopy[action.coors[0]][action.coors[1]].icon === 3) {
                    fieldCopy[action.coors[0]][action.coors[1]].icon = 1;
                };
            };
            return { ...state, field: fieldCopy };
        default:
            return state;
    }
};

export const createEmptyField = () => ({
    type: CREATE_EMPTY_FIELD
});

export const fillField = (coors) => ({
    type: FILL_FIELD,
    coors
});

export const markMinesNearby = () => ({
    type: MARK_MINES_NEARBY
});

export const openCell = (coors) => ({
    type: OPEN_CELL,
    coors
});

export const changeGameState = (gameState) => ({
    type: CHANGE_GAME_STATE,
    gameState
});

export const checkDefeat = (coors) => ({
    type: CHECK_DEFEAT,
    coors
});

export const rightClick = (coors) => ({
    type: RIGHT_CLICK,
    coors
});