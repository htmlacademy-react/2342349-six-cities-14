import {getFavoritesCount} from '../store/api-communication/api-communication.selectors.ts';
import {
  getAuthorizationStatus,
  getUserAvatarUrl,
  getUserLogin
} from '../store/user-preferences/user-preferences.selectors.ts';
import {useAppSelector} from './index.ts';

const useUserData = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userLogin = useAppSelector(getUserLogin);
  const userAvatarUrl = useAppSelector(getUserAvatarUrl);
  const favoritesCount = useAppSelector(getFavoritesCount);

  return {
    authorizationStatus,
    userLogin,
    userAvatarUrl,
    favoritesCount,
  };
};

export default useUserData;
