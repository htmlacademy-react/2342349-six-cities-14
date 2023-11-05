import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CITY_BY_DEFAULT} from '../../const.ts';
import {useAppDispatch} from '../../hooks';
import FavoritePage from '../../pages/favorite-page/favorite-page.tsx';
import LoginPage from '../../pages/login-page/login-page.tsx';
import MainPage from '../../pages/main-page/main-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import {selectCity, updateCities, updateOffers, updateReviews} from '../../store/action.ts';
import {City} from '../../types/city.ts';
import {Offer} from '../../types/offer.ts';
import {Review} from '../../types/review.ts';
import PrivateRoute from '../private-route/private-route.tsx';

interface AppProps {
  offers: Offer[];
  reviews: Review[];
}

function App({ offers, reviews}: Readonly<AppProps>) {

  const dispatch = useAppDispatch();
  if (offers) {
    const cities = offers.reduce((unique, offer) => {
      if (!unique.some((city) => city.name === offer.city.name)) {
        unique.push(offer.city);
      }
      return unique;
    }, [] as City[]);

    dispatch(updateOffers(offers));
    dispatch(updateCities(cities));
    const cityByDefault = offers.find((offer) => offer.city.name === CITY_BY_DEFAULT)?.city;
    if (cityByDefault) {
      dispatch(selectCity(cityByDefault));
    } else {
      dispatch(selectCity(offers[0].city));
    }
  }
  dispatch(updateReviews(reviews));

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}
            element={
              <MainPage />
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
                <FavoritePage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.OfferId}
            element={
              <OfferPage nearbyOffers={offers} />
            }
          />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
