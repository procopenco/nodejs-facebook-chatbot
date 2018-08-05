import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/webhook", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

router.post("/webhook", (req: Request, res: Response) => {
  let { name } = req.params;

  res.send(`Hello, ${name}`);
});

export const FacebookController: Router = router;
