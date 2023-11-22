import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SortOptionsType} from '../../components/sort-list/sort-offers.ts';
import {CITY_FOR_EMPTY_LIST, NameSpace} from '../../const.ts';
import {City} from '../../types/city.ts';

interface SiteData {
    selectedCity: City;
    cities: City[];
    currentSortType: SortOptionsType;
}

const initialState: SiteData = {
  selectedCity: CITY_FOR_EMPTY_LIST[0],
  cities: CITY_FOR_EMPTY_LIST,
  currentSortType: 'POPULAR',
};

const siteData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<City>) => {
      state.selectedCity = action.payload;
    },
    setCities: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortOptionsType>) => {
      state.currentSortType = action.payload;
    }
  }
});

export default siteData;
