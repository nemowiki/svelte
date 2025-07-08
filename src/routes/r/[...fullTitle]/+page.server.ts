import { readDocByFullTitle } from '@nemowiki/core';
import modifyHtmlByExistenceOfLinks from '$lib/utils/modifyHtml.js';

export async function load({ params, locals, url, parent }) {
	const fullTitle = params.fullTitle;

	let rev = Number(url.searchParams.get('rev'));
	if (rev === 0) rev = -1;

	const { ok, reason, data } = await readDocByFullTitle(fullTitle, locals.user, rev);

	if (data) {
		data.html = modifyHtmlByExistenceOfLinks(
			data.html || '',
			JSON.parse((await parent()).fullTitles)
		);
	}

	return {
		ok,
		reason,
		rev,
		doc: JSON.stringify(data)
	};
}
