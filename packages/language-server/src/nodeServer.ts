import {
	createConnection,
	createServer,
	createTypeScriptProjectProviderFactory,
	loadTsdkByPath,
} from '@volar/language-server/node';
import { createServerOptions } from './languageServerPlugin.js';

const connection = createConnection();
const server = createServer(connection);

connection.listen();

connection.onInitialize((params) => {
	const tsdk = loadTsdkByPath(params.initializationOptions.typescript.tsdk, params.locale);
	return server.initialize(
		params,
		createTypeScriptProjectProviderFactory(tsdk.typescript, tsdk.diagnosticMessages),
		createServerOptions(tsdk.typescript, connection)
	);
});

connection.onInitialized(() => {
	server.initialized();
});
