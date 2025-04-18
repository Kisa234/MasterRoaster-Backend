import { Request, Response, NextFunction } from 'express';

export function setUserCookie(req: Request, res: Response, next: NextFunction) {
    
    const userId = '1daf2d7a-b829-4c0e-921b-95e36ceb8737';

    res.cookie('user_id', '1daf2d7a-b829-4c0e-921b-95e36ceb8737', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // cambia a true en producción con HTTPS
    });
    next();
}
