import { redirect } from '@sveltejs/kit';
import { readDocByFullTitle } from '@nemowiki/core';
import { DocStates, DocTypes, encodeFullTitle } from '@nemowiki/core/client';
import modifyHtmlByExistenceOfLinks from '$lib/wiki/utils/modifyHtml.js';
import { withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';

export const load = withLoadErrorHandling(async ({ params, locals, url }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	const rev = Number(url.searchParams.get('rev') ?? '-1');
	const from = url.searchParams.get('from') ?? undefined;
	const redirectQuery = url.searchParams.get('redirect') ?? undefined;

	const doc = await readDocByFullTitle(fullTitle, locals.user, {
		revision: rev,
		redirect: redirectQuery,
		from
	});

	if (!doc) return { rev, from: from ?? '', doc: null };

	if (doc.state === DocStates.Deleted && doc.type !== DocTypes.Category && rev === -1)
		return { rev, from: from ?? '', doc: { ...doc, html: '삭제된 문서입니다.' } };

	if (doc.redirectTo) {
		redirect(303, `/r/${encodeFullTitle(doc.redirectTo)}?from=${encodeFullTitle(doc.fullTitle)}`);
	}

	doc.html = modifyHtmlByExistenceOfLinks(doc.html, locals.fullTitles);

	return { rev, from, doc };
});
