// auth.cookies.ts
import { CookieOptions, Response } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

export const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 120, // 2 horas en segundos
};

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 días en segundos
};

export const userIdCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 días en segundos
};

export const setAuthCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string,
    userId: string,
  ) => {
    res.cookie('userId', userId, userIdCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
  };