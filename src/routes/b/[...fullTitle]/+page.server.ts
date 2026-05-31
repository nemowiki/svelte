import { createBacklinkHtmlByFullTitle, readDocByFullTitle } from '@nemowiki/core';
import { withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';

export const load = withLoadErrorHandling(async ({ params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	let html = await createBacklinkHtmlByFullTitle(fullTitle);
	const doc = await readDocByFullTitle(fullTitle, locals.user);

	if (!html) html = '역링크가 존재하지 않습니다.';

	return { doc, html };
});
