import * as Sentry from '@sentry/sveltekit';
import { handleErrorWithSentry } from '@sentry/sveltekit';
import { handle as authenticationHandle } from './auth.js';
import { serverEnv } from '$lib/server/env.js';
import { activateServerWiki } from '$lib/server/wiki.js';
import { getSentryDsn } from '$lib/wiki/utils/sentry.js';
import { getAllFullTitles, getUserByIdOrNull } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import { DocPrefixes, Groups, UserStates, type User } from '@nemowiki/core/types';
import { redirect, type Handle, type ServerInit } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const HOME_PATH = `/r/${encodeFullTitle(`${DocPrefixes.Wiki}:대문`)}`;

const guestUser: User = {
	_id: '',
	name: '',
	state: UserStates.Active,
	contribCnt: 0,
	group: Groups.Guest
};

const readOnlyPrefixes = ['/r', '/h', '/b', '/c', '/u', '/s', '/api/files'];
const alwaysAllowedPrefixes = ['/auth', '/_app', '/fonts'];
const alwaysAllowedPaths = new Set(['/signin', '/blocked', '/favicon.png', '/favicon.ico']);

function isPathUnderPrefix(pathname: string, prefix: string): boolean {
	return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function isReadOnlyPath(pathname: string): boolean {
	return readOnlyPrefixes.some((prefix) => isPathUnderPrefix(pathname, prefix));
}

function isAlwaysAllowedPath(pathname: string): boolean {
	return (
		alwaysAllowedPaths.has(pathname) ||
		alwaysAllowedPrefixes.some((prefix) => isPathUnderPrefix(pathname, prefix))
	);
}

function redirectTo(path: string): never {
	throw redirect(303, path);
}

export const init: ServerInit = async () => {
	const sentryDsn = getSentryDsn();

	if (sentryDsn) {
		Sentry.init({
			dsn: sentryDsn,
			tracesSampleRate: 1.0
			// replaysSessionSampleRate: 0.1,
			// replaysOnErrorSampleRate: 1.0
		});
	}

	await activateServerWiki();
};

export const handle: Handle = sequence(authenticationHandle, async ({ event, resolve }) => {
	const session = await event.locals.auth();
	const sessionUser = session?.user as
		| {
				id?: string;
				email?: string;
				name?: string;
		  }
		| undefined;
	const userId = sessionUser?.id ?? sessionUser?.email ?? sessionUser?.name ?? null;
	const user = userId ? await getUserByIdOrNull(userId) : null;

	event.locals.user = user ?? guestUser;
	event.locals.fullTitles = await getAllFullTitles();

	const pathname = event.url.pathname;
	const isGuestUser = event.locals.user.group === Groups.Guest;
	const isBlockedUser =
		event.locals.user.group !== Groups.Guest && event.locals.user.state === UserStates.Blocked;

	if (pathname === '/') {
		if (isBlockedUser) redirectTo('/blocked');
		if (isGuestUser && serverEnv.requireLogin) redirectTo('/signin');
		redirectTo(HOME_PATH);
	}

	if (pathname === '/signin') {
		if (isBlockedUser) redirectTo('/blocked');
		if (!isGuestUser) redirectTo(HOME_PATH);
		return await resolve(event);
	}

	if (pathname === '/blocked') {
		if (isBlockedUser) return await resolve(event);
		if (isGuestUser && serverEnv.requireLogin) redirectTo('/signin');
		redirectTo(HOME_PATH);
	}

	if (isBlockedUser && !isReadOnlyPath(pathname)) {
		if (isAlwaysAllowedPath(pathname)) return await resolve(event);
		redirectTo('/blocked');
	}

	if (isGuestUser) {
		if (serverEnv.requireLogin) {
			if (isAlwaysAllowedPath(pathname)) return await resolve(event);
			redirectTo('/signin');
		}

		if (!isReadOnlyPath(pathname) && !isAlwaysAllowedPath(pathname)) {
			redirectTo('/signin');
		}
	}

	return await resolve(event);
});

export const handleError = handleErrorWithSentry();
