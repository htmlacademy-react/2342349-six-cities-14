import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import HeaderLeft from '../../components/HeaderLeft/HeaderLeft.tsx';
import HeaderNav from '../../components/HeaderNav/HeaderNav.tsx';
import './NotFoundPage.css';

function NotFound() {
  return (
    <div className="page">
      <Helmet>
        <title>6 Sites - 404</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLeft />
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="not-found-page">
          <h1>
        Oops!
            <br />
            <small>Something went wrong</small>
          </h1>
          <Link to="/">Return Home</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
