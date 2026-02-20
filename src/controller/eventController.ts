import { listApprovedEvent } from "../service/eventService.js";

export const getEventController = async (req: any, res: any, next: any) => {
    try {
        const data = await listApprovedEvent();
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}