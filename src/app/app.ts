import path from 'path';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import favicon from 'serve-favicon';

import routes from './routes/_routes';

const app = express();

const httpMode = (process.env.HTTP_MODE || 'block').toUpperCase();
const portHttp = parseInt(process.env.PORT_HTTP) || 3001;
const portHttps = parseInt(process.env.PORT_HTTPS) || 3000;
const serverMode = process.env.SERVER_MODE || 'HTTPS';

app.use(favicon(path.resolve(__dirname, './public/favicon.ico')));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getProtocol = (header: any) => {
	let typ = 'http';
	if (header.forwarded) {
		typ = (header.forwarded).split(';');
		typ = typ[2];
		typ = (typ.split('='))[1];
	}
	return typ;
};

if (serverMode === 'HTTPS') {
	app.use((req: any, res: any, next: any) => {
		req.ptcl = getProtocol(req.headers);
		if (req.ptcl === 'https') {
			return next();
		} else {
			if (httpMode === 'REDIRECT') {
				res.redirect('https://' + (req.headers.host).replace(portHttp, portHttps) + req.url);
			} else {
				res.status(403).json({ msg: 'Por razões de segurança, sistema não funciona sem estar no protocolo HTTPS' });
			}
		}
	});
}

app.use('/', routes);

export default app;
