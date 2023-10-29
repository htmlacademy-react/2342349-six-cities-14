import {Helmet} from 'react-helmet-async';
import FavoriteList from '../../components/favorite-list/favorite-list.tsx';
import Footer from '../../components/footer/footer.tsx';
import Logo from '../../components/logo/logo.tsx';
import NavigationMenu from '../../components/navigation-menu/navigation-menu.tsx';
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
            <Logo/>
            <NavigationMenu/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <FavoriteList offers={offers} />
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritePage;
