import Smile from '../smile';
import TimerContainer from '../timer/container';
import styles from './styles.module.css';

const TopPanel = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.topPanel}>
                {/* счетчик мин */}
                <div className={styles.minesCounter}></div>
                <Smile />
                {/* таймер */}
                <TimerContainer />
            </div>
        </div>
    )
};

export default TopPanel;