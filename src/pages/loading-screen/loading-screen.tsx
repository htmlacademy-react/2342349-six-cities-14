import {useAppSelector} from '../../hooks';
import {getLoadingInProgress} from '../../store/site-process/site-process.selectors.ts';
import styles from './loading-screen.module.css';

function LoadingScreen() {
  const loadingInProgress = useAppSelector(getLoadingInProgress);

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
