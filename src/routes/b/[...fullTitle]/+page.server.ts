import { createBacklinkHtmlByFullTitle, readDocByFullTitle } from '@nemowiki/core';
import { withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';

export const load = withLoadErrorHandling(async ({ params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	const html = await createBacklinkHtmlByFullTitle(fullTitle);
	const doc = await readDocByFullTitle(fullTitle, locals.user);

	return { doc, html: html ?? '' };
});
