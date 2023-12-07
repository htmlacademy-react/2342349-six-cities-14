import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import PrivateRoute from './private-route.tsx';

describe('Component: PrivateRoute', () => {
  it('should render children for authorized users', () => {
    render(
      <MemoryRouter>
        <PrivateRoute
          authorizationStatus={AuthorizationStatus.Auth}
          requiredAuthorizationStatus={AuthorizationStatus.Auth}
          declinedElement={AppRoute.Login}
        >
          <div>Private Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('should redirect to declinedElement for unauthorized users', () => {
    render(
      <MemoryRouter>
        <PrivateRoute
          authorizationStatus={AuthorizationStatus.NoAuth}
          requiredAuthorizationStatus={AuthorizationStatus.Auth}
          declinedElement={AppRoute.Login}
        >
          <div>Private Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
  });
});
