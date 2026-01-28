import express from 'express';
import { loginAdmin } from '../../service/admin/adminAuthService.js';
import type { AdminLoginDto } from '../../dto/AdminLoginDto.js';
import { UnauthorizedError } from '../../utils/AppError.js';


export const adminController =  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
            const { email, password } = req.body as AdminLoginDto;

    if (!email || !password) {
        throw new UnauthorizedError('Email and password are required');
    }

    const result = await loginAdmin(email, password);

    if (!result) {
        throw new UnauthorizedError('Invalid email or password');
    }

    return res.json({
        message: 'Login successful',
        data: result,
        success: true,
    });
    } catch (error) {
        next(error);
    }
};