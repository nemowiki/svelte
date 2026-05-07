import { readDocByFullTitle, grantByFullTitle, WikiError } from '@nemowiki/core';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { canGrant, encodeFullTitle } from '@nemowiki/core/client';
import type { DocAction } from '@nemowiki/core/types';

export const authorityActions = {
	default: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle)
			return fail(400, {
				message: 'fullTitle is undefined'
			});

		const data = await request.formData();
		const docAction = (data.get('doc-action') || '').toString() as DocAction;
		const groupPrompt = (data.get('group') || '').toString();
		const comment = (data.get('comment') || '').toString();

		const newGroups = groupPrompt.trim()
			.split(/ *, */)
			.filter((g) => g !== '');

		try {
			const doc = await readDocByFullTitle(fullTitle, locals.user);
			if (!doc) return fail(400, { message: '문서가 존재하지 않습니다.' });

			const res = canGrant(doc, locals.user);
			if (!res.ok) return fail(400, { message: res.message || '권한이 없습니다.' });

			await grantByFullTitle(fullTitle, docAction, newGroups, locals.user, comment);
		} catch (e: unknown) {
			if (e instanceof WikiError) return fail(400, { message: e.message });
			throw e;
		}

		redirect(303, `/a/${encodeFullTitle(fullTitle)}`);
	}
} satisfies Actions;
