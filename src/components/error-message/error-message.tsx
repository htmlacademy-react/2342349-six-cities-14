import {useEffect} from 'react';
import {TIMEOUT_SHOW_ERROR} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {clearErrorAction} from '../../store/action.ts';
import styles from './error-screen.module.css';

function ErrorMessage() {
  const errorMessage = useAppSelector((state) => state.data.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        dispatch(clearErrorAction());
      }, TIMEOUT_SHOW_ERROR);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, dispatch]);

  if (!errorMessage) {
    return null;
  }

  return (
    <div className={styles.errorOverlay}>
      <div className={styles.errorContainer}>
        <p className={styles.errorTitle}>An error has occurred!</p>
        <p className={styles.errorMessage}>{errorMessage}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
