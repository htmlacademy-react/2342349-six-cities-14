import {NameSpace} from '../../const.ts';
import {State} from '../state.ts';

export const getSelectedCity = (state: State) => state[NameSpace.SessionState].selectedCity;
export const getCities = (state: State) => state[NameSpace.SessionState].cities;
export const getCurrentSortType = (state: State) => state[NameSpace.SessionState].currentSortType;
