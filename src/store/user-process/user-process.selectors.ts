import {AuthorizationStatusType, NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatusType => state[NameSpace.User].authorizationStatus;
