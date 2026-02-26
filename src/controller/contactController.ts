import type { Request, Response, NextFunction } from "express";
import { sendContactUsEmail } from "../service/contactUs.js";

export async function contactUsController(req: Request, res: Response, next: NextFunction) {
  try {
    const { fullName, email, message } = req.body;
    await sendContactUsEmail({ fullName, email, message });
    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    next(err);
  }
}