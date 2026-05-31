import {
	AUTH_SECRET,
	AWS_BUCKET_NAME,
	AWS_BUCKET_REGION,
	AWS_ID,
	AWS_SECRET,
	GOOGLE_ID,
	GOOGLE_SECRET,
	WIKI_MONGO_URI
} from '$env/static/private';
import { env as publicEnv } from '$env/dynamic/public';

function requireEnv(name: string, value: string | undefined): string {
	if (!value) {
		throw new Error(`${name} is required.`);
	}

	return value;
}

function requireBooleanEnv(name: string, value: string | undefined): boolean {
	if (value !== 'true' && value !== 'false') {
		throw new Error(`${name} must be "true" or "false".`);
	}

	return value === 'true';
}

export const serverEnv = {
	authSecret: requireEnv('AUTH_SECRET', AUTH_SECRET),
	awsBucketName: requireEnv('AWS_BUCKET_NAME', AWS_BUCKET_NAME),
	awsBucketRegion: requireEnv('AWS_BUCKET_REGION', AWS_BUCKET_REGION),
	awsId: requireEnv('AWS_ID', AWS_ID),
	awsSecret: requireEnv('AWS_SECRET', AWS_SECRET),
	googleId: requireEnv('GOOGLE_ID', GOOGLE_ID),
	googleSecret: requireEnv('GOOGLE_SECRET', GOOGLE_SECRET),
	requireLogin: requireBooleanEnv('PUBLIC_REQUIRE_LOGIN', publicEnv.PUBLIC_REQUIRE_LOGIN),
	wikiMongoUri: requireEnv('WIKI_MONGO_URI', WIKI_MONGO_URI)
};
