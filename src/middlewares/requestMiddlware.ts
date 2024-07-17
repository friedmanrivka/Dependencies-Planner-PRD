import { Request, Response, NextFunction } from 'express';

const normalizeDate = (dateString: string): Date => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
};
const checkSubmissionPeriod = (req: Request, res: Response, next: NextFunction) => {
    const today = normalizeDate(new Date().toISOString());
    const submissionStart = normalizeDate("2024-07-15");
    const submissionEnd = normalizeDate("2024-07-20");
    if (today >= submissionStart && today <= submissionEnd) {
        next(); 
    } else {
        res.status(403).json({ error: 'Submission period is closed' });
    }
};

export default checkSubmissionPeriod;
