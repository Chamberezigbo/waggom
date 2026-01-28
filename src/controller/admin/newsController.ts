import type { Request, Response, NextFunction } from 'express';
import {
  createNews,
  getNews,
  listNews,
  updateNews,
  deleteNews,
} from '../../service/admin/newsService.js';
import type { NewsCreateDto,NewsUpdateDto } from '../../dto/AdminLoginDto.js';

export const createNewsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body as NewsCreateDto;
    const result = await createNews(dto);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const listNewsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await listNews();
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const getNewsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const result = await getNews(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const updateNewsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const dto = req.body as NewsUpdateDto;
    const result = await updateNews(id, dto);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};

export const deleteNewsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const result = await deleteNews(id);
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};