import { getHistorySummariesByFullTitle, getHttpStatus, readDocByFullTitle, WikiError } from '@nemowiki/core';
import { error, type ServerLoadEvent } from '@sveltejs/kit';

export async function historyLoad({
	url,
	params,
	locals
}: ServerLoadEvent): Promise<{ pageIdx: number; historySummaries: string }> {
	const fullTitle = params.fullTitle;
	if (!fullTitle) error(400, 'fullTitle is undefined');

	const pageIdx = Number(url.searchParams.get('page')) || 1;

	try {
		const doc = await readDocByFullTitle(fullTitle, locals.user);
		if (!doc) error(404, '문서가 존재하지 않습니다.');

		const limit = 50;
		const skip = (pageIdx - 1) * limit;
		const historySummaryResponse = await getHistorySummariesByFullTitle(
			fullTitle,
			locals.user,
			limit,
			skip
		);

		if (historySummaryResponse.items.length === 0) error(404, '역사가 존재하지 않습니다.');

		return {
			pageIdx,
			historySummaries: JSON.stringify(historySummaryResponse.items)
		};
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(500, (e as Error).message || '역사를 불러오는데 실패했습니다.');
	}
}
