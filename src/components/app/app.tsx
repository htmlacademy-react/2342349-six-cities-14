import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import FavoritePage from '../../pages/favorite-page/favorite-page.tsx';
import LoginPage from '../../pages/login-page/login-page.tsx';
import MainPage from '../../pages/main-page/main-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import {Offer} from '../../types/offer.ts';
import {Review} from '../../types/review.ts';
import PrivateRoute from '../private-route/private-route.tsx';

interface AppProps {
  countRentOffer: number;
  offers: Offer[];
  reviews: Review[];
}

function App({countRentOffer, offers, reviews}: AppProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}
            element={
              <MainPage
                countRentOffer={countRentOffer}
                offers={offers}
              />
            }
          />
          <Route path={AppRoute.Login}
            element={
              <PrivateRoute
                requiredAuthorizationStatus={AuthorizationStatus.NoAuth}
                declinedElement={AppRoute.Main}
              >
                <LoginPage/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Favorites}
            element={
              <PrivateRoute
                requiredAuthorizationStatus={AuthorizationStatus.Auth}
                declinedElement={AppRoute.Login}
              >
                <FavoritePage offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.OfferId}
            element={
              <OfferPage
                offers={offers}
                reviews={reviews}
                nearbyOffers={offers}
              />
            }
          />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
