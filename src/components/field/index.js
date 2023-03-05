import { Cell } from '../cell';
import styles from './styles.module.css';

export const Field = ({
    field,
    gameState,
    initGame,
    markMinesNearby,
    changeTimerActive,
    openCell,
    demineClick,
    changeSmileState,
    currentMinesCount,
}) => {
    return (
        <div className={styles.field}>
            {field.map((row, rowIndex) => {
                return row.map((col, colIndex) => (
                    <Cell
                        key={`${rowIndex}${colIndex}`}
                        cell={field[rowIndex][colIndex]}
                        gameState={gameState}
                        initGame={initGame}
                        currentMinesCount={currentMinesCount}
                        markMinesNearby={markMinesNearby}
                        changeTimerActive={changeTimerActive}
                        openCell={openCell}
                        demineClick={demineClick}
                        changeSmileState={changeSmileState}
                    />
                ));
            })}
        </div>
    );
};