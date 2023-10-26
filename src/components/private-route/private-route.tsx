import {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

interface PrivateRouteProps {
  requiredAuthorizationStatus: AuthorizationStatus;
  children: ReactElement;
  declinedElement: AppRoute;
}

function PrivateRoute({ requiredAuthorizationStatus, children, declinedElement }: PrivateRouteProps) {
  // const currentAuthorizationStatus = AuthorizationStatus.NoAuth;
  const currentAuthorizationStatus = AuthorizationStatus.Auth;

  return (
    requiredAuthorizationStatus === currentAuthorizationStatus
      ? children
      : <Navigate to={declinedElement}/>
  );
}

export default PrivateRoute;
