import {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRouteType, AuthorizationStatusType} from '../../const';
import {useAppSelector} from '../../hooks';

interface PrivateRouteProps {
  requiredAuthorizationStatus: AuthorizationStatusType;
  children: ReactElement;
  declinedElement: AppRouteType;
}

function PrivateRoute({ requiredAuthorizationStatus, children, declinedElement }: Readonly<PrivateRouteProps>) {
  const authorizationStatus = useAppSelector((state) => state.data.authorizationStatus);

  return (
    requiredAuthorizationStatus === authorizationStatus
      ? children
      : <Navigate to={declinedElement}/>
  );
}

export default PrivateRoute;
