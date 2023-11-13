import { AUTH_TOKEN_KEY_NAME } from '../const.ts';

function getToken(): string {
  try {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${encodeURIComponent(AUTH_TOKEN_KEY_NAME)}=`))
      ?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : '';

  } catch (error) {
    throw new Error(`Error getting token. ${error instanceof Error ? error.message : ''}`);
  }
}

function saveToken(token: string = ''): void {
  try {
    document.cookie = `${encodeURIComponent(AUTH_TOKEN_KEY_NAME)}=${encodeURIComponent(token)}; path=/; max-age=86400`;
  } catch (error) {
    throw new Error(`Error getting token. ${error instanceof Error ? error.message : ''}`);
  }
}

function dropToken(): void {
  try {
    document.cookie = `${encodeURIComponent(AUTH_TOKEN_KEY_NAME)}=; path=/; max-age=0`;
  } catch (error) {
    throw new Error(`Error getting token. ${error instanceof Error ? error.message : ''}`);
  }
}

export { getToken, saveToken, dropToken };
