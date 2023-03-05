import cn from 'classnames';
import { useState } from 'react';
import { getObjectKeyByValue, GAME_STATE, SMILE_STATE } from '../../redux/reducers';
import styles from './styles.module.css';

export const Smile = ({ gameState, smileState, resetGame, changeSmileState }) => {
  const [isPressed, setIsPressed] = useState(false);

  const mapSpriteToCellType = {
    SMILE: styles.smile_default,
    PRESSED: styles.smile_pressed,
    SCARED: styles.scared,
    WIN: styles.win,
    DEAD: styles.dead,
  };

  const getSmileStyle = (gameState, smileState, isPressed) => {
    if (isPressed) {
      return cn(styles.smile, mapSpriteToCellType['PRESSED']);
    }

    if (gameState === GAME_STATE['LOST']) {
      return cn(styles.smile, mapSpriteToCellType['DEAD']);
    }

    if (gameState === GAME_STATE['WIN']) {
      return cn(styles.smile, mapSpriteToCellType['WIN']);
    }

    return cn(styles.smile, mapSpriteToCellType[getObjectKeyByValue(SMILE_STATE, smileState)]);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    resetGame();
    changeSmileState(SMILE_STATE['SMILE']);
    setIsPressed(false);
  };

  return (
    <div
      className={getSmileStyle(gameState, smileState, isPressed)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};