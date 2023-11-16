import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo.tsx';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.tsx';
import {AppRoute} from '../../const.ts';
import {useAppSelector} from '../../hooks';

import styles from './not-found-page.module.css';

function NotFoundPage() {
  const authorizationStatus = useAppSelector((state) => state.data.authorizationStatus);

  return (
    <div className="page">
      <Helmet>
        <title>6 Sites - 404</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
            <NavigationMenu
              authorizationStatus={authorizationStatus}
            />
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className={styles.container}>
          <h1 className={styles.heading}>
            Oops!
            <br/>
            <small className={styles.text}>Something went wrong</small>
          </h1>
          <Link to={AppRoute.Main} className={styles.link}>Return Home</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
