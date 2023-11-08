import classNames from 'classnames';
import {MapPoint} from '../../types/mapPoint.ts';
import {Offer} from '../../types/offer.ts';
import {Review} from '../../types/review.ts';
import LeafletMap from '../leaflet-map/leaflet-map.tsx';
import ReviewForm from '../review-form/review-form.tsx';
import ReviewList from '../review-list/review-list.tsx';
import styles from './single-offer.module.css';

interface SingleOfferProps {
  offer: Offer;
  reviews: Review[];
  city: MapPoint;
  points: MapPoint[];
  selectedPoint: MapPoint | undefined;
  minCommentLength: number;
  maxCommentLength: number;
}

function SingleOffer({offer, reviews, city, points,
  selectedPoint, minCommentLength, maxCommentLength}: Readonly<SingleOfferProps>) {
  const {title, isFavorite, isPremium, bedrooms, maxAdults, description,
    rating, type, price, images, goods, host} = offer;

  const imageList = images.slice(0, 6).map((image) => (
    <div key={image} className="offer__image-wrapper">
      <img className="offer__image" src={image} alt="Photo studio"></img>
    </div>
  ));

  const goodList = goods.map((good) => (
    <li key={good} className="offer__inside-item">
      {good}
    </li>
  ));

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {imageList}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{title}</h1>
            <button className="offer__bookmark-button button" type="button">
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{width: `${rating * 100 / 5}%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>

          <ul className="offer__features">
            <li className={`offer__feature offer__feature--entire ${styles.type}`}>
              {type}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {`${bedrooms} ${bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}`}
            </li>
            <li className="offer__feature offer__feature--adults">
              {`Max ${maxAdults} ${maxAdults > 1 ? 'adults' : 'adult'}`}
            </li>
          </ul>

          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {goodList}
            </ul>
          </div>

          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div
                className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper"
              >
                <img className="offer__avatar user__avatar" src={host.avatarUrl}
                  width="74" height="74" alt="Host avatar"
                >
                </img>
              </div>
              <span className="offer__user-name">{host.name}</span>
              <span className="offer__user-status">{classNames({'Pro': host.isPro})}</span>
            </div>
            <div className="offer__description">
              <p className="offer__text">
                {description}
              </p>
            </div>
          </div>

          <section className="offer__reviews reviews">
            <ReviewList reviews={reviews}/>
            <ReviewForm
              minCommentLength={minCommentLength}
              maxCommentLength={maxCommentLength}
            />
          </section>
        </div>
      </div>

      <LeafletMap block={'offer'} city={city} points={points} selectedPoint={selectedPoint}/>
    </section>
  );
}

export default SingleOffer;