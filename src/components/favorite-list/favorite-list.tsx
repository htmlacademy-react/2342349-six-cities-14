import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer.ts';
import Card from '../card/card.tsx';

interface FavoriteListProps {
  offers: Offer[];
}

function FavoriteList({offers}: Readonly<FavoriteListProps>) {
  const cityOffersMap = offers
    .filter((offer) => offer.isFavorite)
    .reduce<Record<string, Offer[]>>((acc, offer) => {
      acc[offer.city.name] = [...(acc[offer.city.name] ?? []), offer];
      return acc;
    }, {});

  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {Object.entries(cityOffersMap).map(([cityName, cityOffers]) => (
            <li key={cityName} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link className="locations__item-link" to="#">
                    <span>{cityName}</span>
                  </Link>
                </div>
              </div>
              <div className="favorites__places">
                {cityOffers.map((offer) => (
                  <Card
                    key={offer.id}
                    cardType={'favorite'}
                    offer={offer}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default FavoriteList;
