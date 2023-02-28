import styles from './styles.module.css';
import cn from 'classnames';

const Cell = (props) => {
    //закрытая ячейка
    if (props.close) {
        return (
            <div onClick={() => {
                if(props.gameState === 1) {
                    props.fillField(props.coors);
                    props.markMinesNearby();
                    props.changeGameState(2);
                    props.changeTimerActive(true);
                };
                props.openCell(props.coors);
            }} className={cn(styles.cell, styles.close)}></div>
        )
    }

    //пустая ячейка
    if (props.close === false && props.type === 1) {
        return (
            <div className={cn(styles.cell, styles.open)}></div>
        )
    }

    //ячейка с цифрой
    if (props.type === 2 && !props.close) {
        return (
            <div className={cn(styles.cell, styles.open)}>{props.numberMines}</div>
        )
    }

    //ячейка с миной
    if (props.type === 3 && !props.close) {
        return (
            <div className={cn(styles.cell, styles.open)}>M</div>
        )
    }
};

export default Cell;