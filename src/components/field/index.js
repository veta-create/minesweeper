import styles from './styles.module.css';
import Cell from '../cell';

const Field = (props) => {
    if(props.field.length === 0) {
        props.createEmptyField();
    }

    return (
        <div className={styles.field}>
            {/* генерируем поле 16*16 - <div className="ряд">дивы ячеек(cell)</div> */}
            {props.field.map((r, iR) => {
                let rows = [];
                let row = <div key={"r" + iR} className={styles.row}>{r.map((cell) =>
                    <Cell openCell={props.openCell}
                     fillField={props.fillField}
                     changeGameState={props.changeGameState}
                     markMinesNearby={props.markMinesNearby}
                     gameState={props.gameState}
                     key={cell.key}
                     type={cell.type}
                     close={cell.close}
                     coors={cell.coors}
                     numberMines={cell.type === 2 ? cell.numberMines : ''} />
                )}
                </div>
                rows.push(row);
                return rows;
            })}
        </div>
    )
};

export default Field;