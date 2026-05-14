import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';
import { getEmptyDocByFullTitle, uploadFileByFullTitle } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import { DocPrefixes } from '@nemowiki/core/types';
import { redirect } from '@sveltejs/kit';

export const load = withLoadErrorHandling(async () => {
	const doc = getEmptyDocByFullTitle('파일:임시');
	return {
		boilerplate: doc.markup
	};
});

export const actions = {
	default: withActionErrorHandling(async ({ request, locals }) => {
		const data = await request.formData();

		const markup = (data.get('markup') ?? '').toString();
		const fullTitle = DocPrefixes.File + ':' + (data.get('title') ?? '').toString();
		const comment = (data.get('comment') ?? '').toString();
		const file = data.get('file') as File;

		await uploadFileByFullTitle(fullTitle, markup, file, locals.user, comment);

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	})
};
