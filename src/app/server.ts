import dotenvSafe from 'dotenv-safe';
import dayjs from 'dayjs';
import app from './app';
import preBootScript from './scripts/preBoot';

dotenvSafe.config();

const port = process.env.PORT || 3000;
const main = async () => {
	console.log('🎛️    Servidor  🖥️');
	console.log('==================');
	await preBootScript.run();

	await app.listen(port);

	console.log(`port: ${port}`);
	console.log(`online since: ${dayjs().format('DD/MM/YYYY HH:mm:ss [TZ] Z')}`);
};

main();
