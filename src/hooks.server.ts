import * as Sentry from '@sentry/sveltekit';
import { dev } from '$app/environment';
import { WikiError } from '@nemowiki/core';
import type { Handle, HandleServerError, ServerInit } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { WIKI_MONGO_URI, AWS_BUCKET_NAME, AWS_ID, AWS_SECRET } from '$env/static/private';
import { PUBLIC_REQUIRE_LOGIN } from '$env/static/public';

import { handle as authenticationHandle } from './auth.js';

import {
	activateWiki,
	backupWiki,
	getUserByIdOrNull,
	signupUserByIdAndName,
	getAllFullTitles
} from '@nemowiki/core';

import { Groups, UserStates, DocPrefixes, type User } from '@nemowiki/core/types';
import { encodeFullTitle } from '@nemowiki/core/client';

Sentry.init({
	dsn: 'https://b7fb355f8d1fe0bb052585161dce4a1e@o4509551707160576.ingest.us.sentry.io/4509551708012544',
	tracesSampleRate: 1
});

let fullTitles: string[] = [];

const ttl_backup = 1000 * 60 * 60 * 24 * 7; // 7일
let last_backup = Date.now();
const ttl_refresh = 1000 * 60 * 5; // 5분
let last_refresh = 0;

async function checkTTL() {
	const now = Date.now();

	if (now - last_backup > ttl_backup) {
		await backupWiki();
		last_backup = now;
	}

	if (now - last_refresh > ttl_refresh) {
		fullTitles = await getAllFullTitles();
		last_refresh = now;
	}
}

async function getUser(id: string | null) {
	if (!id)
		return {
			_id: Groups.Guest,
			name: Groups.Guest,
			group: Groups.Guest,
			state: UserStates.Active,
			contribCnt: 0
		} as User;

	let user: User | null = await getUserByIdOrNull(id);
	if (user === null) {
		user = await signupUserByIdAndName(id, id.split('@')[0]);
	}
	return user;
}

function checkEnv() {
	if (PUBLIC_REQUIRE_LOGIN === undefined) {
		throw new Error('Please set "PUBLIC_REQUIRE_LOGIN" in the .env file!');
	}
	if (PUBLIC_REQUIRE_LOGIN !== 'true' && PUBLIC_REQUIRE_LOGIN !== 'false') {
		throw new Error('"PUBLIC_REQUIRE_LOGIN" must be "true" or "false"!');
	}
	if (WIKI_MONGO_URI === undefined) {
		throw new Error('Please set "WIKI_MONGO_URI" in the .env file!');
	}
	if (AWS_BUCKET_NAME === undefined) {
		throw new Error('Please set "AWS_BUCKET_NAME" in the .env file!');
	}
	if (AWS_ID === undefined) {
		throw new Error('Please set "AWS_ID" in the .env file!');
	}
	if (AWS_SECRET === undefined) {
		throw new Error('Please set "AWS_SECRET" in the .env file!');
	}
}

export const init: ServerInit = async () => {
	checkEnv();

	await activateWiki(WIKI_MONGO_URI, AWS_BUCKET_NAME, AWS_ID, AWS_SECRET);

	console.log('[Wiki Is Ready]');
};

const authorizationHandle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();

	if (session?.user?.email || PUBLIC_REQUIRE_LOGIN === 'false') {
		// Authorized
		if (event.url.pathname.startsWith('/signin') && session?.user?.email)
			redirect(302, '/r/' + encodeFullTitle(DocPrefixes.Wiki + ':대문'));

		if (!event.params.fullTitle && !event.params.userName && !event.params.query) {
			if (!event.url.pathname.startsWith('/signin') && !event.url.pathname.startsWith('/f'))
				redirect(302, '/r/' + encodeFullTitle(DocPrefixes.Wiki + ':대문'));
		}

		event.params.fullTitle = (event.params.fullTitle || '').trim();
		event.params.userName = (event.params.userName || '').trim();
		event.params.query = (event.params.query || '').trim();

		await checkTTL();

		event.locals.user = await getUser(session?.user?.email || null);
		// event.locals.logs = logs;
		event.locals.fullTitles = fullTitles;

		return await resolve(event);
	} else {
		// Unauthorized
		if (event.url.pathname.startsWith('/signin')) {
			event.locals.fullTitles = [];
			event.locals.user = await getUser(null);
			return await resolve(event);
		} else {
			redirect(303, '/signin');
		}
	}
};

export const handleError: HandleServerError = Sentry.handleErrorWithSentry(
	async ({ error, event }) => {
		const fullTitle =
			event.params.fullTitle ||
			'사용자:' + event.params.userName ||
			'검색:' + event.params.query ||
			event.url.pathname;

		let message = '알 수 없는 에러가 발생했습니다.';
		if (error instanceof WikiError) {
			message = error.message;
		} else if (dev && error instanceof Error) {
			message = error.message;
		}

		return {
			message,
			fullTitle
		};
	}
);

export const handle = sequence(Sentry.sentryHandle(), authenticationHandle, authorizationHandle);
