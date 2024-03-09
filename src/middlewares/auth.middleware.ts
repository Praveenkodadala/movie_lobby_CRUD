import { Request, Response, NextFunction } from 'express';

const isAdmin: (req: Request, res: Response, next: NextFunction) => void = (req, res, next) => {
    try {
        const role = req.headers['role']; 
     
        const isAdminUser = role === 'admin';
    
        if (isAdminUser) {
            next(); 
        } else {
            res.status(403).json({ status: false, message: 'Unauthorized access. Admin role required.' });
        }
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

export default isAdmin;
