import { Request } from 'express';
import { TokenPayloadInterface } from './token-payload-interface';

export interface AuthenticatedInterface extends Request {
  user?: TokenPayloadInterface;
}
