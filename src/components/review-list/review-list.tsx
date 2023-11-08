import {Review} from '../../types/review.ts';
import ReviewComment from '../review-comment/review-comment.tsx';

const dataOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long'
};

interface ReviewPageProps {
    reviews: Review[];
}

function ReviewList({reviews}: Readonly<ReviewPageProps>) {
  const commentList = reviews.map(({id, user, rating, comment, date}) => (
    <ReviewComment
      key={id}
      userAvatarUrl={user.avatarUrl}
      userName={user.name}
      rating={rating}
      comment={comment}
      date={new Date(date)}
      dataOptions={dataOptions}
    />
  ));

  return (
    <>
      <h2 className="reviews__title">
            Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {commentList}
      </ul>
    </>
  );
}

export default ReviewList;
