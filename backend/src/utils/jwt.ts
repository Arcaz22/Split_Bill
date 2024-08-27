import JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import { BaseError } from './responses/base-error';
import { TokenPayloadInterface } from './interface/token-payload-interface';
import { env } from './env';

export const GenerateToken = (payload: TokenPayloadInterface): string => {
  return JWT.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRATION,
  });
};

export const FetchToken = (token: string): TokenPayloadInterface => {
  try {
    return JWT.verify(token, env.JWT_SECRET) as TokenPayloadInterface;
  } catch {
    throw new BaseError(StatusCodes.UNAUTHORIZED, 'Invalid token');
  }
};
