import { getDocLogsByFullTitle } from '@nemowiki/core';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';

export async function historyLoad({
	url,
	params,
	locals
}: ServerLoadEvent): Promise<WikiResponse<{ pageIdx: number; logArr: string }>> {
	const fullTitle = params.fullTitle;
	if (!fullTitle)
		return {
			ok: false,
			reason: 'fullTitle is undefined'
		};

	const pageIdx = Number(url.searchParams.get('page')) || 1;

	const res = await getDocLogsByFullTitle(fullTitle, locals.user, pageIdx);
	if (!res.ok) return res;

	if (res.value.length === 0)
		return {
			ok: false,
			reason: '역사가 존재하지 않습니다.'
		};

	return {
		ok: true,
		value: {
			pageIdx,
			logArr: JSON.stringify(res.value)
		}
	};
}
