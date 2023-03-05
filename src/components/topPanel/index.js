import { Number } from '../number';
import { Smile } from '../smile';
import { Timer } from '../timer';
import styles from './styles.module.css';

export const TopPanel = ({ currentMinesCount, smileState, changeSmileState, timerActive, gameState, resetGame }) => {
    const minesCount = currentMinesCount
        .toString()
        .padStart(2, '0')
        .split('')
        .map((digit, index) => <Number key={index} digit={digit} />);

    return (
        <div className={styles.panel}>
            <div className={styles.mines}>{minesCount}</div>
            <Smile gameState={gameState} smileState={smileState} changeSmileState={changeSmileState} resetGame={resetGame} />
            <Timer isTimerActive={timerActive} />
        </div>
    )
};