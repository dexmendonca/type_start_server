import { Router as router, Request, Response } from 'express';

import { isLoggedMiddleware } from '../middlewares/isLoggedMiddleware';
import testController from '../controllers/testController';
const Router = router();

Router.get('/', testController.helloWorld);

Router.get('/secret', isLoggedMiddleware, (req:Request, res:Response) => {
	res.json({ msg: 'shhhhhhh' });
});
export = Router
