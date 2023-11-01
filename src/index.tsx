import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {reviews} from './mocks/reviews.ts';
import {offers} from './mocks/offers.ts';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const COUNT_RENT_OFFER = 5;

root.render(
  <React.StrictMode>
    <App
      countRentOffer={COUNT_RENT_OFFER}
      offers={offers}
      reviews={reviews}
    />
  </React.StrictMode>
);
