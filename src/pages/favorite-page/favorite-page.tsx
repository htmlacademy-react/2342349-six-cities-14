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

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    navigate(AppRoute.Login);
  }

  const favoriteList = favorites.length > 0 ? (
    <FavoriteList offers={favorites}/>
  ) : (
    <div className="page__favorites-container container">
      <section className="favorites favorites--empty">
        <h1 className="visually-hidden">Favorites (empty)</h1>
        <div className="favorites__status-wrapper">
          <b className="favorites__status">Nothing yet saved.</b>
          <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
        </div>
      </section>
    </div>
  );

  return (
    <div className="page">
      <Helmet>
        <title>6 Sites - Favorite</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--favorites">
        {favoriteList}
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritePage;
