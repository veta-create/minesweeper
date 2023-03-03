import styles from './styles.module.css';
import cn from 'classnames';

const Cell = (props) => {

    //ячейка с флагом
    if (props.cell.icon === 2) {
        return (
            <div className={cn(styles.cell, styles.open, styles.flag)} onContextMenu={(event) => {
                event.preventDefault();
                props.rightClick(props.cell.coors);
                props.changeCurrentMinesCount(props.currentMinesCount + 1)
            }}></div>
        )
    };

    //ячейка с вопросительным знаком
    if (props.cell.icon === 3) {
        return (
            <div className={cn(styles.cell, styles.open)} onContextMenu={(event) => {
                event.preventDefault();
                props.rightClick(props.cell.coors);
            }
            }>?</div>
        )
    };

    if (props.cell.close && props.cell.icon === 1) {
        return (
            <div className={cn(styles.cell, styles.close)} onClick={() => {
                if (props.gameState === 1) {
                    props.fillField(props.cell.coors);
                    props.markMinesNearby();
                    props.openCell(props.cell.coors);
                    props.changeGameState(2);
                    props.changeTimerActive(true);
                } else if (props.gameState < 3) {
                    props.openCell(props.cell.coors);
                    props.checkDefeat(props.cell.coors);
                }
            }} onContextMenu={(event) => {
                event.preventDefault();
                props.rightClick(props.cell.coors);
                props.changeCurrentMinesCount(props.currentMinesCount - 1);
            }
            } onMouseDown={() => {
                props.changeSmileState(3);
            }} onMouseUp={() => {
                props.changeSmileState(1);
            }}></div>
        )
    }

    //пустая ячейка
    if (props.cell.close === false && props.cell.type === 1) {
        return (
            <div className={cn(styles.cell, styles.open)}></div>
        )
    }

    //ячейка с цифрой
    if (props.cell.type === 2 && !props.cell.close) {
        return (
            <div className={cn(styles.cell, styles.open)}>{props.cell.numberMines}</div>
        )
    }

    //ячейка с миной
    if (props.cell.type === 3 && !props.cell.close) {
        return (
            <div className={cn(styles.cell, styles.open)}>M</div>
        )
    }
};

export default Cell;