import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import LoginPage from '../../pages/login-page/login-page.tsx';
import FavoritePage from '../../pages/favorite-page/favorite-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import PrivateRoute from '../private-route/private-route.tsx';
import { HelmetProvider } from 'react-helmet-async';

interface AppProps {
    countRentOffer: number;
}

function App({countRentOffer}: AppProps) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}
            element={
              <MainPage countRentOffer={countRentOffer}/>
            }
          />
          <Route path={AppRoute.Login} element={<LoginPage/>}/>
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritePage/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Offer} element={<OfferPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
