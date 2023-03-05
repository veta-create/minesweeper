import cn from 'classnames';
import styles from './styles.module.css';

export const Number = ({ digit }) => {
  const mapDigitToStyle = {
    0: styles.zero,
    1: styles.one,
    2: styles.two,
    3: styles.three,
    4: styles.four,
    5: styles.five,
    6: styles.six,
    7: styles.seven,
    8: styles.eight,
    9: styles.nine,
  };

  return <div className={cn(styles.number, mapDigitToStyle[digit])} />;
};
