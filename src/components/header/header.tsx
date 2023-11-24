import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-preferences/user-preferences.selectors.ts';
import Logo from '../logo/logo.tsx';
import NavigationMenu from '../navigation-menu/navigation-menu.tsx';

function Header() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo/>
          <NavigationMenu
            authorizationStatus={authorizationStatus}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
