import {Helmet} from 'react-helmet-async';
import FavoriteList from '../../components/favorite-list/favorite-list.tsx';
import Footer from '../../components/footer/footer.tsx';
import Logo from '../../components/logo/logo.tsx';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.tsx';
import {useAppSelector} from '../../hooks';

function FavoritePage() {
  const offers = useAppSelector((state) => state.data.offers);
  const authorizationStatus = useAppSelector((state) => state.data.authorizationStatus);

  return (
    <div className="page">
      <Helmet>
        <title>6 Sites - Favorite</title>
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

      <main className="page__main page__main--favorites">
        {offers ? (
          <FavoriteList offers={offers}/>
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
        )}
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritePage;
