import {configureStore} from '@reduxjs/toolkit';
import {dataReducer} from './dataReducer.ts';

export const store = configureStore({reducer: dataReducer});
