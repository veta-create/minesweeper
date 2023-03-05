import styles from './styles.module.css';
import { TopPanelContainer } from '../topPanel/container';
import { FieldContainer } from '../field/container';

export const Game = () => {
  return (
    <div className={styles.game}>
      <TopPanelContainer />
      <FieldContainer />
    </div>
  );
};