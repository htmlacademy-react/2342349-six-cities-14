import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {makeFakeReview} from '../../utils/mocks.ts';
import ReviewComment from './review-comment.tsx';

describe('Component: ReviewComment', () => {
  it('should render review data correctly', () => {
    const fakeReview = makeFakeReview();
    const dataOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long'
    };

    render(<ReviewComment review={fakeReview} dataOptions={dataOptions} />);

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toHaveAttribute('src', fakeReview.user.avatarUrl);
    expect(screen.getByText(fakeReview.user.name)).toBeInTheDocument();

    const rating = screen.getByText('Rating');
    expect(rating).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();

    const date = new Date(fakeReview.date);
    const formattedDate = date.toLocaleDateString('en', dataOptions);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
