import styles from './styles.module.css';
import Cell from '../cell';

const Field = (props) => {
    if (props.field.length === 0) {
        props.createEmptyField();
    }

    let cells = [];

    for (let i = 0; i < props.field.length; i++) {
        for (let j = 0; j < props.field[i].length; j++) {
            cells.push(props.field[i][j])
        }
    }

    return (
        <div className={styles.field}>
            {cells.map(cell => <Cell cell={cell}
                gameState={props.gameState}
                fillField={props.fillField}
                markMinesNearby={props.markMinesNearby}
                changeGameState={props.changeGameState}
                changeTimerActive={props.changeTimerActive}
                openCell={props.openCell}
                checkDefeat={props.checkDefeat}
                rightClick={props.rightClick}
                currentMinesCount={props.currentMinesCount}
                changeCurrentMinesCount={props.changeCurrentMinesCount} />)}
        </div>
    )
};

export default Field;