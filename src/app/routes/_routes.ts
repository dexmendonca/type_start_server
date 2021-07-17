import { Router as router } from 'express';

import helloWorldRoute from './helloWorldRoute';

const Router = router();

Router.use('/', helloWorldRoute);

export = Router
