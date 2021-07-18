import dotenvSafe from 'dotenv-safe';
import express from 'express';

import routes from './routes/_routes';

dotenvSafe.config();
const app = express();

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Test Running in port ${port}`);
});
