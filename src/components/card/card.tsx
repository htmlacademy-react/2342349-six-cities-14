import {useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {CardCss} from './card-css.ts';

import styles from './card.module.css';

interface CardProps {
  cardCss: CardCss;
  id: number;
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  price: number;
  previewImage: string;
}

function Card({cardCss, id, title, isFavorite, isPremium, rating, type, price, previewImage}: CardProps) {
  const offerLink = `${AppRoute.Offer}/${id}`;
  const [, setActiveCardId] = useState(0);

  const handleMouseOver = (hoveredCardId: number) => {
    setActiveCardId(hoveredCardId);
  };

  return (
    <article
      className={`${cardCss.className}__card place-card`}
      onMouseOver={() => handleMouseOver(id)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardCss.className}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerLink}>
          <img className="place-card__image"
            src={previewImage}
            width={cardCss.imgWidth}
            height={cardCss.imgHeight}
            alt={title}
          >
          </img>
        </Link>
      </div>
      <div className={`${cardCss.className}__card-info place-card__info`}>
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
        <p className={`place-card__type ${styles.card__type}`}>{type}</p>
      </div>
    </article>
  );
}

export default Card;
