import { env } from '$env/dynamic/public';

export function getSentryDsn(): string | undefined {
	const dsn = env.PUBLIC_SENTRY_DSN?.trim();
	return dsn || undefined;
}
