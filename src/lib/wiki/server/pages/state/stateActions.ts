import {
	readDocByFullTitle,
	showDocByFullTitle,
	hideDocByFullTitle,
	WikiError
} from '@nemowiki/core';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { encodeFullTitle } from '@nemowiki/core/client';

export const stateActions = {
	show: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) return fail(400, { message: 'fullTitle is undefined' });

		const data = await request.formData();
		const comment = (data.get('comment') || '').toString();

		try {
			const doc = await readDocByFullTitle(fullTitle, locals.user);
			if (!doc) return fail(400, { message: '문서가 존재하지 않습니다.' });

			if (!doc.permissions.canShow) return fail(400, { message: '권한이 없습니다.' });

			await showDocByFullTitle(fullTitle, locals.user, comment);
		} catch (e: unknown) {
			if (e instanceof WikiError) return fail(400, { message: e.message });
			throw e;
		}

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	},
	hide: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) return fail(400, { message: 'fullTitle is undefined' });

		const data = await request.formData();
		const comment = (data.get('comment') || '').toString();

		try {
			const doc = await readDocByFullTitle(fullTitle, locals.user);
			if (!doc) return fail(400, { message: '문서가 존재하지 않습니다.' });

			if (!doc.permissions.canHide) return fail(400, { message: '권한이 없습니다.' });

			await hideDocByFullTitle(fullTitle, locals.user, comment);
		} catch (e: unknown) {
			if (e instanceof WikiError) return fail(400, { message: e.message });
			throw e;
		}

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	}
} satisfies Actions;
