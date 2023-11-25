import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {AuthorizationStatus, AuthorizationStatusType, NameSpace} from '../../const.ts';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions/user-api-actions.ts';

interface UserPreferencesState {
  authorizationStatus: AuthorizationStatusType;
  isAuthLoading: boolean;
  isInvalidCredentialsEntered: boolean;
  userLogin: string;
  userAvatarUrl: string;
}

const initialState: UserPreferencesState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthLoading: false,
  isInvalidCredentialsEntered: false,
  userLogin: '',
  userAvatarUrl: '',
};

export const userPreferencesSlice = createSlice({
  name: NameSpace.UserPreferences,
  initialState,
  reducers: {
    setInvalidCredentialsEntered: (state, action: PayloadAction<boolean>) => {
      state.isInvalidCredentialsEntered = action.payload;
    },
    setUserLogin: (state, action: PayloadAction<string>) => {
      state.userLogin = action.payload;
    },
    setUserAvatarUrl: (state, action: PayloadAction<string>) => {
      state.userAvatarUrl = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isAuthLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.isAuthLoading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        toast.success('You have successfully logged in.');
      })

      .addCase(loginAction.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isInvalidCredentialsEntered = true;
        state.isAuthLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        if (typeof action.payload === 'string') {
          toast.warning(action.payload);
        } else {
          toast.error('An error occurred during the login process.');
        }
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isAuthLoading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        toast.success('You have successfully logged in.');
      })

      .addCase(logoutAction.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.isAuthLoading = false;
        if (typeof action.payload === 'string') {
          toast.warning(action.payload);
        } else {
          toast.error('An error occurred during the logout process.');
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isAuthLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        toast.success('You have been successfully logged out.');
      });
  }
});

export const {
  setInvalidCredentialsEntered,
  setUserLogin,
  setUserAvatarUrl
} = userPreferencesSlice.actions;
