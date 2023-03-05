import cloneDeep from 'lodash/cloneDeep';
import { OPEN_CELL, DEMINE_CLICK, INIT_GAME, RESET_GAME, CHANGE_TIMER_ACTIVE, CHANGE_SMILE_STATE } from '../constants/game';

export const FIELD_SIZE = 16;

export const MINE_COUNT = 40;

export const SMILE_STATE = {
  SMILE: 1,
  SCARED: 2,
  IMPRESSED: 3,
  WIN: 4,
  DEAD: 5,
};

export const CELL_TYPE = {
  EMPTY: 0,
  HIDDEN: 1,
  FLAGGED: 2,
  UNKNOWN: 3,
  UNKNOWN_EMPTY: 4,
  MINE: 5,
  MINE_EXPLOSION: 6,
  MINE_DEMINED: 7,
  DEMINED: 8,

  HAS_NEIGHBOR_1: 9,
  HAS_NEIGHBOR_2: 10,
  HAS_NEIGHBOR_3: 11,
  HAS_NEIGHBOR_4: 12,
  HAS_NEIGHBOR_5: 13,
  HAS_NEIGHBOR_6: 14,
  HAS_NEIGHBOR_7: 15,
  HAS_NEIGHBOR_8: 16,
};

export const GAME_STATE = {
  IDLE: 1,
  STARTED: 2,
  LOST: 3,
  WIN: 4,
};

const initialState = {
  field: createDefaultField(FIELD_SIZE),
  gameState: GAME_STATE['IDLE'],
  smileState: SMILE_STATE['SMILE'],
  currentMinesCount: MINE_COUNT,
  timerActive: false,
  minesCoords: [],
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_GAME: {
      const field = createDefaultField(FIELD_SIZE);
      const minesCoords = getRandomMineCoords(FIELD_SIZE, MINE_COUNT, action.coords);
      const fieldWithMines = insertMinesInField(field, minesCoords);
      const fieldWithMinesAndNeihbors = insertNeighborCellsInField(fieldWithMines);

      return {
        ...state,
        field: fieldWithMinesAndNeihbors,
        timerActive: true,
        gameState: GAME_STATE['STARTED'],
        minesCoords: minesCoords,
        currentMinesCount: MINE_COUNT,
      };
    }
    case RESET_GAME: {
      const field = createDefaultField(FIELD_SIZE);
      const minesCoords = getRandomMineCoords(FIELD_SIZE, MINE_COUNT, action.coords);
      const fieldWithMines = insertMinesInField(field, minesCoords);
      const fieldWithMinesAndNeihbors = insertNeighborCellsInField(fieldWithMines);

      return {
        ...state,
        field: fieldWithMinesAndNeihbors,
        timerActive: true,
        gameState: GAME_STATE['IDLE'],
        minesCoords: minesCoords,
        currentMinesCount: MINE_COUNT,
      };
    }
    case OPEN_CELL: {
      const { field, minesCoords } = cloneDeep(state);
      const [row, col] = action.coords;

      // Проверяем поражение
      if (minesCoords.some((mine) => mine[0] === row && mine[1] === col)) {
        field[row][col].isOpened = true;
        field[row][col].type = CELL_TYPE['MINE_EXPLOSION'];

        return {
          ...state,
          field: revealMines(field, CELL_TYPE, minesCoords),
          timerActive: false,
          gameState: GAME_STATE['LOST'],
        };
      }

      // Проверяем победу
      const isWin = checkWin(field, minesCoords);

      if (isWin) {
        return {
          ...state,
          field: revealMines(field, CELL_TYPE, minesCoords),
          timerActive: false,
          currentMinesCount: 0,
          gameState: GAME_STATE['WIN'],
        };
      }

      // Раскрываем клетку у которой рядом мины
      if (field[row][col].type >= CELL_TYPE['HAS_NEIGHBOR_1']) {
        field[row][col].isOpened = true;

        return {
          ...state,
          field,
        };
      }

      // Раскрываем пустую клетку у которой рядом мины
      if (field[row][col].type === CELL_TYPE['EMPTY']) {
        return {
          ...state,
          field: demineRecursive(field, CELL_TYPE, [row, col]),
        };
      }

      return {
        ...state,
      };
    }
    case DEMINE_CLICK: {
      const { field, minesCoords } = cloneDeep(state);
      const cell = field[action.coords[0]][action.coords[1]];

      if (!cell.isOpened) {
        if (
          cell.type === CELL_TYPE['MINE'] ||
          cell.type === CELL_TYPE['HIDDEN'] ||
          cell.type === CELL_TYPE['EMPTY'] ||
          cell.type >= CELL_TYPE['HAS_NEIGHBOR_1']
        ) {
          cell.type = CELL_TYPE['FLAGGED'];

          const isWin = checkWin(field, minesCoords);

          if (isWin) {
            return {
              ...state,
              field: revealMines(field, CELL_TYPE, minesCoords),
              timerActive: false,
              currentMinesCount: 0,
              gameState: GAME_STATE['WIN'],
            };
          }

          return {
            ...state,
            field,
            currentMinesCount: state.currentMinesCount - 1,
          };
        }

        if (cell.type === CELL_TYPE['FLAGGED']) {
          cell.type = CELL_TYPE['UNKNOWN'];

          return {
            ...state,
            field,
            currentMinesCount: state.currentMinesCount + 1,
          };
        }

        if (cell.type === CELL_TYPE['UNKNOWN']) {
          cell.type = CELL_TYPE['HIDDEN'];

          return {
            ...state,
            field,
          };
        }
      }

      return { ...state, field };
    }
    case CHANGE_TIMER_ACTIVE: {
      return {
        ...state,
        timerActive: action.timerActive,
      };
    }
    case CHANGE_SMILE_STATE: {
      return {
        ...state,
        smileState: action.smileState,
      };
    }
    default: {
      return state;
    }
  }
};

/*
  Раскрываем поле в случае победы или поражения
*/
export function revealMines(field, cellType, mineCoords) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[0].length; j++) {
      const cell = field[i][j];

      const isMine = mineCoords.find((mine) => mine[0] === i && mine[1] === j);

      if (isMine && cell.type === cellType['FLAGGED']) {
        cell.type = cellType['DEMINED'];
      }

      if (
        cell.type === cellType['MINE'] ||
        cell.type === cellType['HIDDEN'] ||
        cell.type === cellType['MINE_EXPLOSION'] ||
        cell.type === cellType['MINE_DEMINED']
      ) {
        cell.isOpened = true;
      }
    }
  }

  return field;
}

/*
  Утилита для проверки победного условия
  В нашем случае, победой можно считать ситуацию, когда все мины помечены всеми флажками
*/
export function checkWin(field, minesCoords) {
  const mineSet = new Set();

  minesCoords.forEach((coords) => {
    mineSet.add(coords.join(''));
  });

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[0].length; j++) {
      const cell = field[i][j];

      if (cell.type === CELL_TYPE['FLAGGED']) {
        mineSet.delete(`${i}${j}`);
      }
    }
  }

  if (mineSet.size === 0) {
    return true;
  }

  return false;
}

/*
  Вставляем поле клетки-мины
*/
export function insertMinesInField(field, mineCoords) {
  mineCoords.forEach(([i, j]) => {
    field[i][j].type = CELL_TYPE['MINE'];
  });

  return field;
}

/*
  Вставляем поле клетки, которые соседствуют с минами
*/
export function insertNeighborCellsInField(field) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[0].length; j++) {
      const cell = field[i][j];

      if (cell.type !== CELL_TYPE['MINE']) {
        const mineCount = countNeighborMines(field, i, j, CELL_TYPE['MINE']);

        if (mineCount) {
          cell.type = CELL_TYPE[`HAS_NEIGHBOR_${mineCount}`];
        }
      }
    }
  }

  return field;
}

/*
  Для каждой пустой клеточки пытаемся рекурсивно разминировать по максимуму
  Наш базовый случай - когда текущая клетка содержит мину по соседству

  * * *   ↖↑↗
  * С *   ←С→
  * * *   ↙↓↘
*/
export function demineRecursive(field, cellType, coords) {
  function expand(field, cellType, coords) {
    const [row, col] = coords;

    if (row < 0 || row >= field.length || col < 0 || col >= field[0].length || field[row][col].isOpened) {
      return;
    }

    field[row][col].isOpened = true;

    if (field[row][col].type !== cellType.EMPTY || field[row][col].type >= cellType['HAS_NEIGHBOR_1']) {
      return;
    }

    // Recursively expand the neighboring cells
    expand(field, cellType, [row - 1, col - 1]); // top left
    expand(field, cellType, [row - 1, col]); // top
    expand(field, cellType, [row - 1, col + 1]); // top right
    expand(field, cellType, [row, col + 1]); // right
    expand(field, cellType, [row + 1, col + 1]); // bottom right
    expand(field, cellType, [row + 1, col]); // bottom
    expand(field, cellType, [row + 1, col - 1]); // bottom left
    expand(field, cellType, [row, col - 1]); // left
  }

  expand(field, cellType, coords);

  return field;
}

/*
  Вспомогательная утилита для получения ключа объекта по значению
*/
export function getObjectKeyByValue(object, value) {
  for (const objectKey in object) {
    if (object[objectKey] === value) {
      return objectKey;
    }
  }
}

/*
  Создаем поле по умолчанию с пустыми клетками
*/
export function createDefaultField(fieldSize) {
  const field = [];

  for (let i = 0; i < fieldSize; i++) {
    const row = [];

    for (let j = 0; j < fieldSize; j++) {
      const cell = {
        key: `${i}${j}`,
        type: CELL_TYPE['EMPTY'],
        coords: [i, j],
        isOpened: false,
      };

      row.push(cell);
    }

    field.push(row);
  }

  return field;
}

/*
  Рекурсивно генерируем случайные уникальные координаты для мин
*/
export function getRandomMineCoords(fieldSize, mineCount, initialCoords = []) {
  const visitedCoords = new Set();
  visitedCoords.add(initialCoords.join(''));

  const coords = [];

  function getCoords() {
    const min = 0;
    const max = fieldSize - 1;

    const i = Math.floor(Math.random() * (max - min + 1)) + min;
    const j = Math.floor(Math.random() * (max - min + 1)) + min;

    if (visitedCoords.has(`${i}${j}`)) {
      getCoords(fieldSize, mineCount);
    } else {
      coords.push([i, j]);
      visitedCoords.add(`${i}${j}`);

      if (coords.length < mineCount) {
        getCoords();
      }
    }
  }

  getCoords(mineCount);

  return coords;
}

/*
  Нам необходимо проверить всех соседей

  * * *   ↖↑↗
  * С M   ←С→
  * * *   ↙↓↘

  Для случая выше C будет 1
  Главное позаботиться о случаях когда проверяем угловые клетки / крайней ряды / колонки
*/
export function countNeighborMines(field, row, col, mineType) {
  let minesAround = 0;

  // ↖ Верх Слева
  if (field[row - 1] && field[row - 1][col - 1] && field[row - 1][col - 1].type === mineType) {
    minesAround++;
  }

  // ↑ Верх
  if (field[row - 1] && field[row - 1][col] && field[row - 1][col].type === mineType) {
    minesAround++;
  }

  // ↗ Верх Справа
  if (field[row - 1] && field[row - 1][col + 1] && field[row - 1][col + 1].type === mineType) {
    minesAround++;
  }

  // → Право
  if (field[row][col + 1] && field[row][col + 1].type === mineType) {
    minesAround++;
  }

  // ↘ Низ Справа
  if (field[row + 1] && field[row + 1][col + 1] && field[row + 1][col + 1].type === mineType) {
    minesAround++;
  }

  // ↓ Низ
  if (field[row + 1] && field[row + 1][col] && field[row + 1][col].type === mineType) {
    minesAround++;
  }

  // ↙ Низ Слева
  if (field[row + 1] && field[row + 1][col - 1] && field[row + 1][col - 1].type === mineType) {
    minesAround++;
  }

  // ← Слева
  if (field[row] && field[row][col - 1] && field[row][col - 1].type === mineType) {
    minesAround++;
  }

  return minesAround;
}