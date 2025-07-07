import { readDocByFullTitle } from '@nemowiki/core';
import modifyHtmlByExistenceOfLinks from '$lib/utils/modifyHtml.js';

export async function load({ params, locals, url, parent }) {
	const fullTitle = params.fullTitle;

	let rev = Number(url.searchParams.get('rev'));
	if (rev === 0) rev = -1;

	const res_read = await readDocByFullTitle(fullTitle, locals.user, rev);

	if (res_read.data) {
		res_read.data.html = modifyHtmlByExistenceOfLinks(
			res_read.data.html || '',
			JSON.parse((await parent()).fullTitles)
		);
	}

	return {
		fullTitle,
		rev,
		ok: res_read.ok,
		reason: res_read.reason,
		doc: JSON.stringify(res_read.data)
	};
}
