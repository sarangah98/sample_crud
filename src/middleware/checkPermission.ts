import { Request, Response, NextFunction } from 'express';


export const checkPermission = (action: string, resource: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(`Checking permission for ${action} on ${resource}`);
    next();
  };
};
