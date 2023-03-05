import {
  countNeighborMines,
  demineRecursive,
  checkWin,
  revealMines,
  insertMinesInField,
  CELL_TYPE,
} from './redux/reducers';

describe('countNeighborMines', () => {
  const field = [
    [
      { type: 0 },
      { type: CELL_TYPE['MINE'] },
      { type: CELL_TYPE['MINE'] },
      { type: CELL_TYPE['MINE'] },
      { type: CELL_TYPE['MINE'] },
      { type: 0 },
      { type: 0 },
      { type: 0 },
    ],
    [
      { type: CELL_TYPE['MINE'] },
      { type: CELL_TYPE['MINE'] },
      { type: CELL_TYPE['MINE'] },
      { type: 0 },
      { type: CELL_TYPE['MINE'] },
      { type: 0 },
      { type: CELL_TYPE['MINE'] },
      { type: 0 },
    ],
    [
      { type: 0 },
      { type: 0 },
      { type: CELL_TYPE['MINE'] },
      { type: CELL_TYPE['MINE'] },
      { type: CELL_TYPE['MINE'] },
      { type: 0 },
      { type: 0 },
      { type: 0 },
    ],
    [{ type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }],
    [{ type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }],
    [{ type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }, { type: 0 }],
    [
      { type: 0 },
      { type: 0 },
      { type: 0 },
      { type: 0 },
      { type: 0 },
      { type: 0 },
      { type: 0 },
      { type: CELL_TYPE['MINE'] },
    ],
    [
      { type: 0 },
      { type: 0 },
      { type: 0 },
      { type: 0 },
      { type: 0 },
      { type: 0 },
      { type: CELL_TYPE['MINE'] },
      { type: 0 },
    ],
  ];

  it('Считает соседние мины для угловых клеток', () => {
    const topLeft = 3;
    const topLeftResult = countNeighborMines(field, 0, 0, CELL_TYPE['MINE']);

    const topRight = 1;
    const topRightResult = countNeighborMines(field, 0, field[0].length - 1, CELL_TYPE['MINE']);

    const bototmLeft = 0;
    const bottomLeftResult = countNeighborMines(field, field.length - 1, 0, CELL_TYPE['MINE']);

    const bottomRight = 2;
    const bottomRightResult = countNeighborMines(field, field.length - 1, field[0].length - 1, CELL_TYPE['MINE']);

    expect(topLeft).toBe(topLeftResult);
    expect(topRight).toBe(topRightResult);
    expect(bototmLeft).toBe(bottomLeftResult);
    expect(bottomRight).toBe(bottomRightResult);
  });

  it('Считает соседние мины для клеток внутри поля', () => {
    const expected = 8;
    const result = countNeighborMines(field, 1, 3, CELL_TYPE['MINE']);

    expect(expected).toBe(result);
  });
});

describe('demineRecursive', () => {
  it('Разминирует поле до тех пор пока не находит клетки с минами рядом', () => {
    const field = [
      [
        { type: CELL_TYPE['EMPTY'], isOpened: false },
        { type: CELL_TYPE['EMPTY'], isOpened: false },
        { type: CELL_TYPE['HAS_NEIGHBOR_2'], isOpened: false },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: CELL_TYPE['EMPTY'], isOpened: false },
        { type: CELL_TYPE['EMPTY'], isOpened: false },
        { type: CELL_TYPE['HAS_NEIGHBOR_2'], isOpened: false },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: CELL_TYPE['HAS_NEIGHBOR_2'], isOpened: false },
        { type: CELL_TYPE['HAS_NEIGHBOR_3'], isOpened: false },
        { type: CELL_TYPE['HAS_NEIGHBOR_2'], isOpened: false },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
    ];

    const expectedField = [
      [
        { type: CELL_TYPE['EMPTY'], isOpened: true },
        { type: CELL_TYPE['EMPTY'], isOpened: true },
        { type: CELL_TYPE['HAS_NEIGHBOR_2'], isOpened: true },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: CELL_TYPE['EMPTY'], isOpened: true },
        { type: CELL_TYPE['EMPTY'], isOpened: true },
        { type: CELL_TYPE['HAS_NEIGHBOR_2'], isOpened: true },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: CELL_TYPE['HAS_NEIGHBOR_2'], isOpened: true },
        { type: CELL_TYPE['HAS_NEIGHBOR_3'], isOpened: true },
        { type: CELL_TYPE['HAS_NEIGHBOR_2'], isOpened: true },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
      [
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
        { type: 0, isOpened: false },
      ],
    ];

    const deminedField = demineRecursive(field, CELL_TYPE, [0, 0]);

    expect(deminedField).toEqual(expectedField);
  });
});

describe('checkWin', () => {
  it('Возвращает true если условие победы соблюдено', () => {
    const field = [
      [
        { type: CELL_TYPE['FLAGGED'] },
        { type: CELL_TYPE['FLAGGED'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
      ],
      [
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
      ],
      [
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
      ],
      [
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
      ],
    ];

    const mineCoords = [
      [0, 0],
      [0, 1],
    ];

    const isWin = checkWin(field, mineCoords);

    expect(isWin).toBe(true);
  });

  it('Возвращает false если условие победы нарушено', () => {
    const field = [
      [
        { type: CELL_TYPE['FLAGGED'] },
        { type: CELL_TYPE['FLAGGED'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
      ],
      [
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
      ],
      [
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
      ],
      [
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
        { type: CELL_TYPE['EMPTY'] },
      ],
    ];

    const mineCoords = [
      [0, 0],
      [0, 2],
    ];

    const isWin = checkWin(field, mineCoords);

    expect(isWin).toBe(false);
  });
});

describe('revealMines', () => {
  it('Раскрывает поле', () => {
    const field = [
      [
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: CELL_TYPE['MINE'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
      ],
      [
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
      ],
      [
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
      ],
      [
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
        { type: CELL_TYPE['HIDDEN'], isOpened: false },
      ],
    ];

    const expectedField = [
      [
        { type: CELL_TYPE['MINE'], isOpened: true },
        { type: CELL_TYPE['MINE'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
      ],
      [
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
      ],
      [
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
      ],
      [
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
        { type: CELL_TYPE['HIDDEN'], isOpened: true },
      ],
    ];

    const mineCoords = [
      [0, 0],
      [0, 1],
    ];

    const revealedField = revealMines(field, CELL_TYPE, mineCoords);

    expect(expectedField).toEqual(revealedField);
  });
});

describe('insertMinesInField', () => {
  it('Вставляет мины в поле', () => {
    const field = [
      [
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
      ],
      [
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
      ],
      [
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
      ],
      [
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
      ],
    ];

    const expectedField = [
      [
        { type: CELL_TYPE['MINE'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
      ],
      [
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
      ],
      [
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
      ],
      [
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['HIDDEN'] },
        { type: CELL_TYPE['MINE'] },
      ],
    ];

    const mineCoords = [
      [0, 0],
      [field.length - 1, field[0].length - 1],
    ];

    const fieldWithMines = insertMinesInField(field, mineCoords);

    expect(expectedField).toEqual(fieldWithMines);
  });
});
