import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import HeaderLeft from '../../components/HeaderLeft/HeaderLeft.tsx';
import HeaderNav from '../../components/HeaderNav/HeaderNav.tsx';
import {AppRoute} from '../../const.ts';

import styles from './not-found-page.module.css';
console.log(styles);

function NotFoundPage() {
  return (
    <div className="page">
      <Helmet>
        <title>6 Sites - 404</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLeft/>
            <HeaderNav/>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className={styles.general}>
          <h1 className={styles.h1}>
            Oops!
            <br/>
            <small className={styles.small}>Something went wrong</small>
          </h1>
          <Link to={AppRoute.Main} className={styles.a}>Return Home</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
