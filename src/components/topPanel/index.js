import Smile from '../smile';
import TimerContainer from '../timer/container';
import styles from './styles.module.css';
import cn from 'classnames';

const TopPanel = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.topPanel}>
                <div className={styles.minesCounter}>{props.currentMinesCount}</div>
                <Smile smileState={props.smileState} changeSmileState={props.changeSmileState} gameState={props.gameState} />
                <TimerContainer />
            </div>
        </div>
    )
};

export default TopPanel;