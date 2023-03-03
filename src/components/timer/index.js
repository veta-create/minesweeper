import React from "react";
import styles from './styles.module.css';

const Timer = (props) => {
    const [seconds, setSeconds] = React.useState(0);

    if(props.timerActive) {
        setTimeout(() => {
            setSeconds(seconds + 1)
        }, 1000)
    }

    let timeDisplay = ''

    if(String(seconds).length === 1) {
        timeDisplay = '0' + '0' + seconds;
    }

    if(String(seconds).length === 2) {
        timeDisplay = '0' + seconds;
    }

    if(String(seconds).length === 3) {
        timeDisplay = seconds;
    }

    return (
        <div className={styles.timer}>
            {timeDisplay}
        </div>
    )
};

export default Timer;