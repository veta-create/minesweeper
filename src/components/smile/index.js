import cn from 'classnames';
import styles from './styles.module.css';

const Smile = (props) => {

    if(props.gameState === 3) {
        props.changeSmileState(5);
    };

    if(props.gameState === 4) {
        props.changeSmileState(6);
    };

    if(props.smileState === 1) {
        return(
            <div className={cn(styles.smile, styles.funnySmile)} onMouseDown={() => {
                props.changeSmileState(2);
            }} onMouseUp={() => {
                props.changeSmileState(1);
            }}>
            </div>
        )
    };

    if(props.smileState === 2) {
        return(
            <div className={cn(styles.smile, styles.funnySmileClamped)}>
            </div>
        )
    };

    if(props.smileState === 3) {
        return(
            <div className={cn(styles.smile, styles.surprisedSmile)}>
            </div>
        )
    };

    if(props.smileState === 4) {
        return(
            <div className={cn(styles.smile, styles.steepSmile)}>
            </div>
        )
    };

    if(props.smileState === 5) {
        return(
            <div className={cn(styles.smile, styles.deadSmile)}>
            </div>
        )
    };
}

export default Smile;