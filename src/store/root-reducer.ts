import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const.ts';
import siteData from './site-data/site-data.slice.ts';
import siteProcess from './site-process/site-process.slice.ts';
import userProcess from './user-process/user-process.slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Data]: siteData.reducer,
  [NameSpace.Site]: siteProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
