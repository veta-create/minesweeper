import { useState } from 'react';
import { getObjectKeyByValue, CELL_TYPE, GAME_STATE, SMILE_STATE } from '../../redux/reducers';
import styles from './styles.module.css';
import cn from 'classnames';

export const Cell = ({
  cell,
  gameState,
  changeSmileState,
  currentMinesCount,
  demineClick,
  initGame,
  changeTimerActive,
  openCell,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const mapSpriteToCellType = {
    HIDDEN: styles.hidden,
    EMPTY: styles.empty,
    MINE: styles.mine,
    MINE_EXPLOSION: styles.mine_explosion,
    MINE_DEMINED: styles.mine_demined,
    DEMINED: styles.demined,
    FLAGGED: styles.flagged,
    UNKNOWN: styles.unknown,
    UNKNOWN_EMPTY: styles.unknown_empty,
    HAS_NEIGHBOR_1: styles.has_neighor_1,
    HAS_NEIGHBOR_2: styles.has_neighor_2,
    HAS_NEIGHBOR_3: styles.has_neighor_3,
    HAS_NEIGHBOR_4: styles.has_neighor_4,
    HAS_NEIGHBOR_5: styles.has_neighor_5,
    HAS_NEIGHBOR_6: styles.has_neighor_6,
    HAS_NEIGHBOR_7: styles.has_neighor_7,
    HAS_NEIGHBOR_8: styles.has_neighor_8,
  };

  const getCellStyle = (cell) => {
    if (isHovered) {
      return cn(styles.cell, mapSpriteToCellType['EMPTY']);
    }

    // Если клетка не вскрыта
    if (!cell.isOpened) {
      if (cell.type === CELL_TYPE['MINE']) {
        return cn(styles.cell, mapSpriteToCellType['HIDDEN']);
      }

      if (gameState === GAME_STATE['IDLE'] || gameState === GAME_STATE['STARTED'] || gameState === GAME_STATE['LOST']) {
        if (cell.type === CELL_TYPE['EMPTY'] || cell.type >= CELL_TYPE['HAS_NEIGHBOR_1']) {
          return cn(styles.cell, mapSpriteToCellType['HIDDEN']);
        }
      }

      return cn(styles.cell, mapSpriteToCellType[getObjectKeyByValue(CELL_TYPE, cell.type)]);
    }

    return cn(styles.cell, mapSpriteToCellType[getObjectKeyByValue(CELL_TYPE, cell.type)]);
  };

  const handleMouseUp = (event) => {
    if (event.button === 2) {
      return;
    }

    if (gameState === GAME_STATE['IDLE']) {
      initGame(cell.coords);
      changeTimerActive(true);
      changeSmileState(SMILE_STATE['SMILE']);
      openCell(cell.coords);
    } else if (gameState === GAME_STATE['STARTED']) {
      changeSmileState(SMILE_STATE['SMILE']);
      openCell(cell.coords);
    }

    setIsHovered(false);
  };

  const handleMouseDown = (event) => {
    if (event.button === 2) {
      return;
    }

    changeSmileState(SMILE_STATE['SCARED']);
    setIsHovered(true);
  };

  const handleRightClick = (event) => {
    event.preventDefault();

    if (gameState === GAME_STATE['IDLE']) {
      alert('Вы не можете ставить флажки пока не открыли ни одной клетки.');
    }

    if (gameState === GAME_STATE['STARTED']) {
      if (currentMinesCount === 0) {
        alert('У вас закончились флажки. Попробуйте убрать флажки которые возможно поставлены неправильно.');
      } else {
        demineClick(cell.coords);
      }
    }
  };

  if (!cell.isOpened) {
    return (
      <div
        className={getCellStyle(cell)}
        onContextMenu={handleRightClick}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
      />
    );
  }

  if (cell.isOpened) {
    return <div className={getCellStyle(cell)} />;
  }
};