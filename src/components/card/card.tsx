import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {BriefOffer} from '../../types/brief-offer.ts';
import styles from './card.module.css';

const cardConfigurations = {
  cities: {
    name: 'cities',
    imgWidth: 260,
    imgHeight: 200
  },
  favorite: {
    name: 'favorites',
    imgWidth: 150,
    imgHeight: 110
  }
};

type CardOffer = Pick<
  BriefOffer, 'id' | 'title' | 'isFavorite' | 'isPremium' | 'rating' | 'type' | 'price' | 'previewImage'>;

interface CardProps {
  cardType: 'cities' | 'favorite';
  offer: CardOffer;
  onCardInteraction?: (cardId: BriefOffer['id']) => void;
}

function Card({cardType, offer, onCardInteraction}: Readonly<CardProps>) {
  const {id, title, isFavorite, isPremium,
    rating, type, price, previewImage} = offer;
  const {name, imgWidth, imgHeight} = cardConfigurations[cardType];

  const offerLink = `${AppRoute.Offer}/${id}`;
  const handleCardInteraction = onCardInteraction ? () => onCardInteraction(id) : undefined;

  return (
    <article
      className={`${name}__card place-card`}
      onMouseOver={handleCardInteraction}
      onFocus={handleCardInteraction}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${name}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerLink}>
          <img className="place-card__image"
            src={previewImage}
            width={imgWidth}
            height={imgHeight}
            alt={title}
          >
          </img>
        </Link>
      </div>
      <div className={`${name}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={classNames('button', 'place-card__bookmark-button', {'place-card__bookmark-button--active': isFavorite})}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 100 / 5}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>{title}</Link>
        </h2>
        <p className={`place-card__type ${styles.type}`}>{type}</p>
      </div>
    </article>
  );
}

export default Card;
