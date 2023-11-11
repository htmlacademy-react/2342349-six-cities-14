import {AUTH_TOKEN_KEY_NAME} from '../const.ts';

function getToken(){
  return localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
}

function saveToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
}

function dropToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
}

export {getToken, saveToken, dropToken};
