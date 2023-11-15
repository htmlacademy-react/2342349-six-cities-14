import {ChangeEvent} from 'react';

interface ReviewRatingProps {
  value: number;
  title: string;
  onRatingChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ReviewRating({value, title, onRatingChange}: Readonly<ReviewRatingProps>) {
  return (
    <>
      <input onChange={onRatingChange}
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
      >
      </input>
      <label htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default ReviewRating;