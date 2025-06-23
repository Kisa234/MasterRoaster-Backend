import { JwtPayload } from '../../../domain/entities/jwt-payload.entity';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
