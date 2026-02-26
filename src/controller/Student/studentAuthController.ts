import type { Request, Response, NextFunction } from 'express';
import { studentLogin } from '../../service/student/studentAuthService.js';

export const studentLoginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const result = await studentLogin(email);
    res.json({ 
      success: true, 
      message: 'Login successful',
      data: result 
    });
  } catch (err) {
    next(err);
  }
};