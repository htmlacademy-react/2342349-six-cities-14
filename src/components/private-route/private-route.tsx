import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {ReactElement} from 'react';

type PrivateRouteProps = {
    authorizationStatus: AuthorizationStatus;
    children: ReactElement;
}

function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps) {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
