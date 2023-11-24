import {NameSpace} from '../../const.ts';
import {State} from '../state.ts';

export const getAuthorizationStatus = (state: State) => state[NameSpace.UserPreferences].authorizationStatus;
export const getIsAuthLoading = (state: State) => state[NameSpace.UserPreferences].isAuthLoading;
export const getIsInvalidCredentialsEntered = (state: State) => state[NameSpace.UserPreferences].isInvalidCredentialsEntered;
