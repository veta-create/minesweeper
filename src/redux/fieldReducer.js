import lodash from 'lodash';
const CREATE_EMPTY_FIELD = 'CREATE_EMPTY_FIELD';
const FILL_FIELD = 'FILL_FIELD';

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
                max = Math.floor(15);
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


