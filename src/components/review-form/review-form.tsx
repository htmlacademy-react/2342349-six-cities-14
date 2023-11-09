import {ChangeEvent, FormEvent, useState} from 'react';
import {REVIEW_RATING} from '../../const.ts';
import ReviewRating from '../review-rating/review-rating.tsx';

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
    <ReviewRating
      key={rating.value}
      value={rating.value}
      title={rating.title}
      onRatingChange={handleRatingSelect}
    />
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
