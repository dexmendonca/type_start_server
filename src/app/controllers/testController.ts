import { Request, Response } from 'express';

import testService from '../services/testService';

const helloWorld = (req: Request, res: Response) => {
	res.send({ msg: `MSG: ${testService.helloWorld()}` });
};

export default {
	helloWorld
};
