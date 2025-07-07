import { getDocLogsByFullTitle } from '@nemowiki/core';

export async function load({ url, params, locals }) {
	const fullTitle = params.fullTitle;
	const pageIdx = Number(url.searchParams.get('page')) || 1;
	const { ok, reason, data } = await getDocLogsByFullTitle(fullTitle, locals.user, pageIdx);
	return {
		ok,
		reason,
		fullTitle,
		pageIdx,
		logArr: JSON.stringify(data || [])
	};
}
