import React, {ChangeEvent, FormEvent, useState} from 'react';
import {REVIEW_RATING} from '../../const.ts';

interface ReviewFormProps {
  minCommentLength: number;
  maxCommentLength: number;
}

function ReviewForm({minCommentLength = 0, maxCommentLength = 2500}: Readonly<ReviewFormProps>) {
  const [comment, setComment] = useState({
    rating: 0,
    text: ''
  });

  const handleRatingSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value))) {
      setComment({
        ...comment,
        rating: parseInt(value, 10)
      });
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment({
      ...comment,
      text: event.target.value
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const isSubmitDisabled =
      comment.text.length > maxCommentLength
      || comment.text.length < minCommentLength
      || comment.rating === 0;

  const ratingList = REVIEW_RATING.map((rating) => (
    <React.Fragment key={rating.value}>
      <input onChange={handleRatingSelect}
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating.value}
        id={`${rating.value}-stars`}
        type="radio"
      >
      </input>
      <label htmlFor={`${rating.value}-stars`}
        className="reviews__rating-label form__rating-label"
        title="perfect"
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </React.Fragment>
  ));

  return (
    <form onSubmit={handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {ratingList}
      </div>
      <textarea onChange={handleTextChange} className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe
                    your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
