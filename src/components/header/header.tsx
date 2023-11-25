import {useAppSelector} from '../../hooks';
import {getFavorites} from '../../store/api-communication/api-communication.selectors.ts';
import {
  getAuthorizationStatus,
  getUserAvatarUrl,
  getUserLogin
} from '../../store/user-preferences/user-preferences.selectors.ts';
import Logo from '../logo/logo.tsx';
import NavigationMenu from '../navigation-menu/navigation-menu.tsx';

function Header() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userLogin = useAppSelector(getUserLogin);
  const userAvatarUrl = useAppSelector(getUserAvatarUrl);
  const favorites = useAppSelector(getFavorites);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo/>
          <NavigationMenu
            authorizationStatus={authorizationStatus}
            userLogin={userLogin}
            userAvatarUrl={userAvatarUrl}
            favorites={favorites}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
