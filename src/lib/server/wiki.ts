import { activateWiki } from '@nemowiki/core';
import { serverEnv } from './env.js';

const globalForWiki = globalThis as typeof globalThis & {
	__nemowikiActivatePromise?: Promise<boolean>;
};

export function activateServerWiki(): Promise<boolean> {
	globalForWiki.__nemowikiActivatePromise ??= activateWiki(
		serverEnv.wikiMongoUri,
		serverEnv.awsBucketName,
		serverEnv.awsBucketRegion,
		serverEnv.awsId,
		serverEnv.awsSecret
	);

	return globalForWiki.__nemowikiActivatePromise;
}
