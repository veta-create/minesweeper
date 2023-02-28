import styles from './styles.module.css';
import cn from 'classnames';

const Cell = (props) => {
    //пустая ячейка
    if(props.type === 1 && props.close) {
        return (
            <div className={cn(styles.cell, props.close ? styles.close : styles.open)}></div>
        )
    }
};

export default Cell;