import styles from './styles.module.css';
import Cell from '../cell';

const Field = (props) => {
    return (
        <div className={styles.field}>
            {/* генерируем поле 16*16 - <div className="ряд">дивы ячеек(cell)</div> */}
            {/* {props.field.map((r, iR) => {
                    let rows = [];
                    let row = <div key={"r" + iR} className={styles.row}>{r.map((cell) =>
                        <Cell key={cell.key} type={cell.type} close={cell.close} />
                    )}
                    </div>
                    rows.push(row);
                    return rows;
                })} */}
        </div>
    )
};

export default Field;