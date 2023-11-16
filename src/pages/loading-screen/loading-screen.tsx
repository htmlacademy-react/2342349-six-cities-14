import {useAppSelector} from '../../hooks';
import styles from './loading-screen.module.css';

function LoadingScreen() {
  const loadingInProgress = useAppSelector((state) => state.data.loadingInProgress);

  if (!loadingInProgress) {
    return null;
  }

  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
