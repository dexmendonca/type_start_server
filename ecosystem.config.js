// PM2 CONFIG
module.exports = {
	apps: [
		{
			name: 'type_start_server',
			script: 'dist/app/server.js',
			instances: 'max',
			exec_mode: 'cluster'
		}
	]
};
