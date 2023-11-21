import {useAppSelector} from '../../hooks';
import Logo from '../logo/logo.tsx';
import NavigationMenu from '../navigation-menu/navigation-menu.tsx';

function Header() {
  const authorizationStatus = useAppSelector((state) => state.data.authorizationStatus);

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
