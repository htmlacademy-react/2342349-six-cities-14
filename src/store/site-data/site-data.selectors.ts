import {SortOptionsType} from '../../components/sort-list/sort-offers.ts';
import {NameSpace} from '../../const.ts';
import {City} from '../../types/city.ts';
import {State} from '../../types/state.ts';

export const getSelectedCity = (state: State): City => state[NameSpace.Data].selectedCity;
export const getCities = (state: State): City[] => state[NameSpace.Data].cities;
export const getCurrentSortType = (state: State): SortOptionsType => state[NameSpace.Data].currentSortType;
