import express from 'express';

import routes from './routes/_routes';
const app = express();

app.use('/', routes);

const port = 3000;
app.listen(port, () => {
	console.log(`Test Running in port ${port}`);
});
