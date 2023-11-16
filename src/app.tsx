import {useEffect} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from './components/private-route/private-route.tsx';
import {AppRoute, AuthorizationStatus, CITY_BY_DEFAULT} from './const.ts';
import {useAppDispatch, useAppSelector} from './hooks';
import FavoritePage from './pages/favorite-page/favorite-page.tsx';
import LoginPage from './pages/login-page/login-page.tsx';
import MainPage from './pages/main-page/main-page.tsx';
import NotFoundPage from './pages/not-found-page/not-found-page.tsx';
import OfferPage from './pages/offer-page/offer-page.tsx';
import {selectCity, setCities} from './store/action.ts';
import {checkAuthAction, fetchOffersAction} from './store/api-actions.ts';
import {City} from './types/city.ts';

function App() {
  const offers = useAppSelector((state) => state.data.offers);
  const authorizationStatus = useAppSelector((state) => state.data.authorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  }, [dispatch]);

  useEffect(() => {
    if (offers.length > 0) {
      const cities = offers.reduce((unique, offer) => {
        if (!unique.some((city) => city.name === offer.city.name)) {
          unique.push(offer.city);
        }
        return unique;
      }, [] as City[]);

      dispatch(setCities(cities));
      const cityByDefault = offers
        .find((offer) => offer.city.name === CITY_BY_DEFAULT)?.city ?? offers[0].city;
      dispatch(selectCity(cityByDefault));
    }
  }, [dispatch, offers]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}
            element={
              <MainPage/>
            }
          />
          <Route path={AppRoute.Login}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
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
                authorizationStatus={authorizationStatus}
                requiredAuthorizationStatus={AuthorizationStatus.Auth}
                declinedElement={AppRoute.Login}
              >
                <FavoritePage/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.OfferId}
            element={
              <OfferPage nearbyOffers={offers}/>
            }
          />
          <Route path="*"
            element={
              <NotFoundPage/>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
