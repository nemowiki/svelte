import { getHttpStatus, WikiError } from '@nemowiki/core';
import type { Action, ServerLoadEvent } from '@sveltejs/kit';
import { error, fail, isRedirect } from '@sveltejs/kit';

export function withLoadErrorHandling<T>(fn: (event: ServerLoadEvent) => Promise<T>) {
	return async (event: ServerLoadEvent) => {
		try {
			return await fn(event);
		} catch (e: unknown) {
			if (isRedirect(e)) throw e;
			if (e instanceof WikiError) throw error(getHttpStatus(e.code), e.message);
			throw error(500, (e as Error).message);
		}
	};
}

export function withActionErrorHandling<T>(fn: (event: Parameters<Action>[0]) => Promise<T>) {
	return async (event: Parameters<Action>[0]) => {
		try {
			return await fn(event);
		} catch (e: unknown) {
			if (isRedirect(e)) throw e;
			if (e instanceof WikiError) return fail(getHttpStatus(e.code), { message: e.message });
			// if (e && typeof e === 'object' && 'status' in e) throw e;
			return fail(500, { message: (e as Error).message });
		}
	};
}
