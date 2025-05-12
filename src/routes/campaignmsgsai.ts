import express, { Request, Response } from 'express';

const router = express.Router();

const generateMessages = (objective: string): string[] => {
  return [
    `Looks like engagement is low – let's turn things around with a campaign tailored to "${objective}".`,
    `Your customers with ${objective} are just one nudge away from reactivation. Let's reach out.`,
    `Targeting "${objective}" could be the key to boosting loyalty – try offering exclusive deals.`,
  ];
};

router.post('/', (req: Request, res: Response) => {
  const { objective } = req.body;

  if (!objective || typeof objective !== 'string') {
     res.status(400).json({ error: 'Invalid or missing objective' });
      return;
  }

  const messages = generateMessages(objective);
   res.status(200).json({ messages });
   return;
});

export default router;
