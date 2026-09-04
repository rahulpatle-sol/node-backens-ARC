import { Router, Request, Response } from 'express';
import { validate, userSchema } from '../middleware/validate.js';

const router = Router();

const users: any[] = [];

router.get('/users', (req: Request, res: Response) => {
    res.status(200).json(users);
});

router.post('/users', validate(userSchema), (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = { id: Date.now(), name, email };
    users.push(user);
    res.status(201).json(user);
});

export default router;