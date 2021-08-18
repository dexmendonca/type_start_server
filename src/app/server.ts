import dotenvSafe from 'dotenv-safe';
import fs from 'fs';
import path from 'path';
import http from 'http';
import http2 from 'http2';
import chalk from 'chalk';
import finalhandler from 'finalhandler';
import proxy from 'http2-proxy';
import dayjs from 'dayjs';

import app from './app';
import { version, name } from '../package.json';

import preBootScript from './scripts/preBoot';

dotenvSafe.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const portHttp = parseInt(process.env.PORT_HTTP) || 3001;
const portHttps = parseInt(process.env.PORT_HTTPS) || 3000;
const serverMode = process.env.SERVER_MODE || 'HTTPS';

const main = async () => {
	console.log(`🎛️ ⚡️    ${name} v${version}     🖥️`);
	console.log('==================');
	console.log();
	await preBootScript.run();

	console.log(`online since: ${dayjs().format('DD/MM/YYYY HH:mm:ss [TZ] Z')}`);
	console.log();
	try {
		const expressServer = http.createServer(app);
		await expressServer.listen(portHttp);
		console.log(chalk(`Serving http/1.1 server on http://localhost:${portHttp}`));
	} catch (error) {
		console.error('Erro ao ligar servidor HTTP');
		console.error(error);
	}

	if (serverMode === 'HTTPS') {
		const port = portHttp;
		const httpsKey = process.env.HTTPS_KEY;
		const httpsCert = process.env.HTTPS_CERT;

		const defaultWebHandler = (err: any, req: any, res:any) => {
			if (err) {
				console.error('proxy error', err);
				finalhandler(req, res)(err);
			}
		};

		const sslOptions = {
			key: fs.readFileSync(path.resolve(__dirname, httpsKey)),
			cert: fs.readFileSync(path.resolve(__dirname, httpsCert)),
			allowHTTP1: true
		};

		const http2server = http2.createSecureServer(sslOptions);

		http2server.on('request', (req, res) => {
			proxy.web(req, res, {
				hostname: 'localhost',
				port,
				onReq: (_req:any, { headers }) => {
					if (_req.headers.host) {
						headers['x-forwarded-for'] = _req.socket.remoteAddress;
						headers['x-forwarded-proto'] = _req.socket.encrypted ? 'https' : 'http';
						headers['x-forwarded-host'] = _req.headers.host;
					}
					return null;
				}
			}, defaultWebHandler);
		});

		await http2server.listen(portHttps);
		console.log(chalk(`Serve http/2 server on https://localhost:${portHttps}`));

		console.log();
		if (nodeEnv === 'development') {
			console.log('TIPS:');
			console.log(chalk('Don\'t forget to allow insecure localhost chrome://flags/#allow-insecure-localhost'));
			console.log(chalk('Mac OS trust instructions http://www.robpeck.com/2010/10/google-chrome-mac-os-x-and-self-signed-ssl-certificates/#.XD7yJM8zaDc', '\n'));
		}
	}
};

main();

//= ⚡️[server]:
