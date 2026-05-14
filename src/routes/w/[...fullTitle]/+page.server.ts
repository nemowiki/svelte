import { encodeFullTitle } from '@nemowiki/core/client';
import {
	readDocByFullTitle,
	previewDoc,
	createDocByFullTitle,
	editDocByFullTitle,
	getEmptyDocByFullTitle
} from '@nemowiki/core';
import { redirect } from '@sveltejs/kit';
import { DocStates } from '@nemowiki/core/types';
import modifyHtmlByExistenceOfLinks from '$lib/wiki/utils/modifyHtml.js';
import { withLoadErrorHandling, withActionErrorHandling } from '$lib/wiki/utils/errorHandling.js';

export const load = withLoadErrorHandling(async ({ params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	let doc = await readDocByFullTitle(fullTitle, locals.user);

	if (!doc) doc = getEmptyDocByFullTitle(fullTitle);

	return { doc };
});

export const actions = {
	save: withActionErrorHandling(async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) throw new Error('fullTitle is undefined');

		const data = await request.formData();
		const markup = (data.get('markup') ?? '').toString();
		const comment = (data.get('comment') ?? '').toString();

		const doc = await readDocByFullTitle(fullTitle, locals.user);

		if (doc === null || doc.state === DocStates.Deleted || doc.state === DocStates.Hidden) {
			await createDocByFullTitle(fullTitle, locals.user, markup, comment);
		} else {
			await editDocByFullTitle(fullTitle, locals.user, markup, comment);
		}

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	}),
	preview: withActionErrorHandling(async ({ request, locals }) => {
		const data = await request.formData();
		const doc = JSON.parse((data.get('doc') ?? '').toString());
		const html = await previewDoc(doc, locals.user);
		return { html: modifyHtmlByExistenceOfLinks(html, locals.fullTitles) };
	})
};
