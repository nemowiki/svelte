import { redirect, error } from '@sveltejs/kit';
import { readDocByFullTitle, WikiError, getHttpStatus } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import modifyHtmlByExistenceOfLinks from '$lib/wiki/utils/modifyHtml.js';

export const load = async ({ params, locals, url }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) error(400, 'fullTitle is undefined');

	const rev = Number(url.searchParams.get('rev') || '-1');

	try {
		const doc = await readDocByFullTitle(fullTitle, locals.user, {
			revision: rev,
			redirect: url.searchParams.get('redirect') || undefined
		});

		if (!doc) error(404, '문서를 찾을 수 없습니다.');

		if (doc.redirectedFrom) {
			redirect(
				303,
				`/r/${encodeFullTitle(doc.fullTitle)}?from=${encodeFullTitle(doc.redirectedFrom)}`
			);
		}

		doc.html = modifyHtmlByExistenceOfLinks(doc.html, locals.fullTitles);

		return { doc: JSON.stringify(doc) };
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(500, (e as Error).message || '문서를 불러오는데 실패했습니다.');
	}
};
