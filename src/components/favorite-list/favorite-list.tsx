import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer.ts';
import {CardCss} from '../card/card-css.ts';
import Card from '../card/card.tsx';

interface FavoriteListProps {
  offers: Offer[];
}

const cardCss: CardCss = {
  className: 'favorites',
  imgWidth: 150,
  imgHeight: 110
};

function FavoriteList({offers}: FavoriteListProps) {

  const cityOffersMap = offers
    .filter((offer) => offer.isFavorite)
    .reduce((acc, offer) => {
      acc.set(offer.city.name, [...(acc.get(offer.city.name) ?? []), offer]);
      return acc;
    }, new Map<string, Offer[]>());

  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {Array.from(cityOffersMap).map(([cityName, cityOffers]) => (
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
                    cardCss={cardCss}
                    id={offer.id}
                    price={offer.price}
                    rating={offer.rating}
                    title={offer.title}
                    type={offer.type}
                    isFavorite={offer.isFavorite}
                    isPremium={offer.isPremium}
                    previewImage={offer.previewImage}
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
