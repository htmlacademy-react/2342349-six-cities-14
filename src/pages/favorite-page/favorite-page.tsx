import {Helmet} from 'react-helmet-async';
import FavoriteList from '../../components/favorite-list/favorite-list.tsx';
import Footer from '../../components/footer/footer.tsx';
import Header from '../../components/header/header.tsx';
import {useAppSelector} from '../../hooks';

function FavoritePage() {
  const offers = useAppSelector((state) => state.data.offers);

  return (
    <div className="page">
      <Helmet>
        <title>6 Sites - Favorite</title>
      </Helmet>
      <Header/>

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
