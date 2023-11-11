import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setError} from '../../store/action.ts';
import {clearErrorAction} from '../../store/api-actions.ts';
import styles from './error-screen.module.css';

function ErrorMessage() {
  const errorMessage = useAppSelector((state) => state.data.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setError(errorMessage));
    dispatch(clearErrorAction());
  });

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
