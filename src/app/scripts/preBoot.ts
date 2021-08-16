import database from '../database/database';

const checkDatabase = async () => {
	try {
		await database.raw('SELECT NOW()');
		console.log('DB: ON');
	} catch (error) {
		console.log('DB: OFF');
	}
};

const run = async () => {
	await checkDatabase();
};
export default {
	run
};
