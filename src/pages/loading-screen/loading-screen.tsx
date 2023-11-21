import {useAppSelector} from '../../hooks';
import styles from './loading-screen.module.css';

function LoadingScreen() {
  const loadingInProgress = useAppSelector((state) => state.data.loadingInProgress);

  return loadingInProgress ? (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  ) : null;
}

export default LoadingScreen;
