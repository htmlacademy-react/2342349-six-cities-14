import {Helmet} from 'react-helmet-async';
import FavoriteList from '../../components/favorite-list/favorite-list.tsx';
import FooterContainer from '../../components/footer-container/footer-container.tsx';
import HeaderLeft from '../../components/header-left/header-left.tsx';
import HeaderNav from '../../components/header-nav/header-nav.tsx';
import {Offer} from '../../types/offer.ts';

interface FavoritePageProps {
  offers: Offer[];
}

function FavoritePage({offers}: FavoritePageProps) {
  return (
    <div className="page">
      <Helmet>
        <title>6 Sites - Favorite</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLeft/>
            <HeaderNav/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <FavoriteList offers={offers} />
      </main>
      <FooterContainer/>
    </div>
  );
}

export default FavoritePage;
