import {
	getHistorySummariesByUserId,
	getUserByName,
	refreshAndGetPenaltiesByName
} from '@nemowiki/core';
import { withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';

export const load = withLoadErrorHandling(async ({ params, url }) => {
	const userName = params.userName;
	if (!userName) throw new Error('userName is undefined');

	const pageIdx = Number(url.searchParams.get('page')) || 1;

	const queriedUser = await getUserByName(userName);
	const penalties = await refreshAndGetPenaltiesByName(userName);

	const limit = 10;
	const skip = (pageIdx - 1) * limit;
	const paginatedHistorySummaries = await getHistorySummariesByUserId(queriedUser._id, limit, skip);

	return {
		queriedUser,
		paginatedHistorySummaries,
		penalties
	};
});
