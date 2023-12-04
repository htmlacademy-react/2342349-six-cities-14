import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from 'react-router-dom';
import FavoriteList from '../../components/favorite-list/favorite-list.tsx';
import Footer from '../../components/footer/footer.tsx';
import Header from '../../components/header/header.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import {getFavorites} from '../../store/api-communication/api-communication.selectors.ts';
import {getAuthorizationStatus} from '../../store/user-preferences/user-preferences.selectors.ts';

function FavoritePage() {
  const favorites = useAppSelector(getFavorites);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
  }, [authorizationStatus, navigate]);

  const favoriteList = favorites.length > 0 ? (
    <main className="page__main page__main--favorites">
      <FavoriteList offers={favorites}/>
    </main>
  ) : (
    <div className="page page--favorites-empty">
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your
                        future trips.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );

  return (
    <div className="page">
      <Helmet>
        <title>6 Sites - Favorite</title>
      </Helmet>
      <Header/>
      {favoriteList}
      <Footer/>
    </div>
  );
}

export default FavoritePage;
