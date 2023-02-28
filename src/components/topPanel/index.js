import Smile from '../smile';
import Timer from '../timer';
import styles from './styles.module.css';

const TopPanel = (props) => {
    return (
        <div className={styles.main}>
            <div className={styles.topPanel}>
                {/* счетчик мин */}
                <div className={styles.minesCounter}></div>
                <Smile />
                {/* таймер */}
                <Timer />
            </div>
        </div>
    )
};

export default TopPanel;