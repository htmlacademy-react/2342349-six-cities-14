import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, AuthorizationStatusType} from '../../const.ts';
import {useAppDispatch} from '../../hooks';
import {logoutAction} from '../../store/api-actions.ts';

interface NavigationMenuProps {
  authorizationStatus: AuthorizationStatusType;
}

function NavigationMenu({authorizationStatus}: Readonly<NavigationMenuProps>) {
  const dispatch = useAppDispatch();

  const signOutClickHandler = () => {
    dispatch(logoutAction());
  };

  const keyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      signOutClickHandler();
    }
  };

  return (
    <nav className="header__nav">
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to="/favorites">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
              <span className="header__favorite-count">3</span>
            </Link>
          </li>
          <li
            className="header__nav-item"
            onClick={signOutClickHandler}
            onKeyDown={keyDownHandler}
          >
            <Link className="header__nav-link" to="#">
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link className="header__nav-link" to={AppRoute.Login}>
              <span className="header__signout">Sign in</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavigationMenu;
