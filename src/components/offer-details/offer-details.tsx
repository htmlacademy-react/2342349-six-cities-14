import {useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, AuthorizationStatusType, MAX_OFFER_STARS} from '../../const.ts';
import {useAppDispatch} from '../../hooks';
import {updateFavoriteAction} from '../../store/api-actions/data-api-actions.ts';
import {FullOffer} from '../../types/full-offer.ts';
import styles from './offer-details.module.css';

interface OfferDetailsProps {
  offer: FullOffer;
  authorizationStatus: AuthorizationStatusType;
}

function OfferDetails({offer, authorizationStatus} : Readonly<OfferDetailsProps>) {
  const {id, isPremium, title, isFavorite, rating, type,
    bedrooms, maxAdults, price, host, description} = offer;
  const {avatarUrl, name, isPro} = host;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ratingRound = Math.round(rating) * 100 / MAX_OFFER_STARS;
  const goodList = offer.goods.map((good) => (
    <li key={good} className="offer__inside-item">
      {good}
    </li>
  ));

  const bookmarkText = isFavorite ? 'In bookmarks' : 'To bookmarks';
  const adultText = maxAdults > 1 ? 'adults' : 'adult';
  const bedroomText = bedrooms > 1 ? 'Bedrooms' : 'Bedroom';
  const textPro = isPro ? 'Pro' : '';
  const premiumText = isPremium ? (
    <div className="offer__mark">
      <span>Premium</span>
    </div>
  ) : '';

  function handleBookmarkClick() {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(updateFavoriteAction({
        id: id,
        status: +!isFavorite
      }));
    } else {
      navigate(AppRoute.Login);
    }
  }

  return (
    <>
      {premiumText}
      <div className="offer__name-wrapper">
        <h1 className="offer__name">{title}</h1>
        <button
          onClick={handleBookmarkClick}
          className="offer__bookmark-button button"
          type="button"
        >
          <svg className="offer__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{bookmarkText}</span>
        </button>
      </div>
      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{width: `${ratingRound}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{rating}</span>
      </div>

      <ul className="offer__features">
        <li className={`offer__feature offer__feature--entire ${styles.type}`}>
          {type}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {`${bedrooms} ${bedroomText}`}
        </li>
        <li className="offer__feature offer__feature--adults">
          {`Max ${maxAdults} ${adultText}`}
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
          <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
            <img className="offer__avatar user__avatar"
              src={avatarUrl}
              width="74"
              height="74"
              alt="Host avatar"
            >
            </img>
          </div>
          <span className="offer__user-name">{name}</span>
          <span className="offer__user-status">{textPro}</span>
        </div>
        <div className="offer__description">
          <p className="offer__text">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

export default OfferDetails;
