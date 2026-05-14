import { withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';
import { getHistorySummariesByFullTitle, readDocByFullTitle, WikiError } from '@nemowiki/core';
import { ErrorCodes } from '@nemowiki/core/client';

export const load = withLoadErrorHandling(async ({ url, params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	const doc = await readDocByFullTitle(fullTitle, locals.user);
	if (!doc) throw new WikiError(ErrorCodes.DOC_NOT_FOUND, '문서가 존재하지 않습니다.');

	const limit = 50;
	const pageIdx = Number(url.searchParams.get('page')) || 1;
	const skip = (pageIdx - 1) * limit;

	const paginatedHistorySummaries = await getHistorySummariesByFullTitle(
		fullTitle,
		locals.user,
		limit,
		skip
	);

	if (paginatedHistorySummaries.items.length === 0)
		throw new WikiError(ErrorCodes.DOC_NOT_FOUND, '역사가 존재하지 않습니다.');

	return {
		paginatedHistorySummaries
	};
});
