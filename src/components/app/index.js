import { Game } from '../game';
import styles from './styles.module.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <h1>Тестовое Задание</h1>
      <p>На должность стажера Вконтакте</p>
      <Game />
      <div className={styles.persik} />
    </div>
  );
};