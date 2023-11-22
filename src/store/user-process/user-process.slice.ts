import {createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, AuthorizationStatusType, NameSpace} from '../../const.ts';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions.ts';

interface UserProcess {
  authorizationStatus: AuthorizationStatusType;
}

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export default userProcess;
