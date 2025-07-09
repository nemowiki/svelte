import { getInfoByFullTitle } from '@nemowiki/core';
import type { WikiResponse } from '@nemowiki/core/types';
import { createDocByFullTitle, editDocByFullTitle } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

export const writeActions = {
	default: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle)
			return {
				ok: false,
				reason: 'fullTitle is undefined'
			};

		const data = await request.formData();
		const markup = (data.get('markup') || '').toString();
		const comment = (data.get('comment') || '').toString();

		const info = await getInfoByFullTitle(fullTitle);
		let res: WikiResponse<void>;

		if (info === null || info.state === 'deleted' || info.state === 'hidden') {
			res = await createDocByFullTitle(fullTitle, locals.user, markup, comment);
		} else {
			res = await editDocByFullTitle(fullTitle, locals.user, markup, comment);
		}

		if (res.ok) redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
		else return fail(400, { message: res.reason, fullTitle });
	}
} satisfies Actions;
