import { withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';
import { getHistorySummariesByFullTitle } from '@nemowiki/core';

export const load = withLoadErrorHandling(async ({ url, params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	const limit = 10;
	const pageIdx = Number(url.searchParams.get('page')) || 1;
	const skip = (pageIdx - 1) * limit;

	const paginatedHistorySummaries = await getHistorySummariesByFullTitle(
		fullTitle,
		locals.user,
		limit,
		skip
	);

	return {
		paginatedHistorySummaries
	};
});
