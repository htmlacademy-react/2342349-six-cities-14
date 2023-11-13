import styles from './loading-screen.module.css';

function LoadingScreen() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
}

export default LoadingScreen;
