import { Router as router } from 'express';

import testController from '../controllers/testController';
const Router = router();

Router.get('/', testController.helloWorld);

export = Router
