import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {Offer} from '../../types/offer.ts';
import styles from './card.module.css';

const cardConfigurations = {
  cities: {
    className: 'cities',
    imgWidth: 260,
    imgHeight: 200
  },
  favorite: {
    className: 'favorites',
    imgWidth: 150,
    imgHeight: 110
  }
};

type CardOffer = Pick<
  Offer, 'id' | 'title' | 'isFavorite' | 'isPremium' | 'rating' | 'type' | 'price' | 'previewImage'>;

interface CardProps {
  cardType: 'cities' | 'favorite';
  offer: CardOffer;
  onMouseOver?: (cardId: number) => void;
}

function Card({cardType, offer, onMouseOver}: CardProps) {
  const {id, title, isFavorite, isPremium,
    rating, type, price, previewImage} = offer;
  const {className, imgWidth, imgHeight} = cardConfigurations[cardType];

  const offerLink = `${AppRoute.Offer}/${id}`;

  const handleMouseOver = (hoveredCardId: number) => {
    if (onMouseOver) {
      onMouseOver(hoveredCardId);
    }
  };
  const mouseOverHandler = onMouseOver ? () => handleMouseOver(id) : undefined;

  return (
    <article
      className={`${className}__card place-card`}
      onMouseOver={mouseOverHandler}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
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
      <div className={`${className}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
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
