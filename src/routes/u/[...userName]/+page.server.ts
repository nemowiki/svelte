import { error } from '@sveltejs/kit';
import {
	getHistorySummariesByUserId,
	getUserByName,
	refreshAndGetPenaltiesByName,
	WikiError,
	getHttpStatus
} from '@nemowiki/core';

export const load = async ({ params, url }) => {
	const userName = params.userName;
	if (!userName) error(400, 'userName is undefined');

	const pageIdx = Number(url.searchParams.get('page')) || 1;

	try {
		const queriedUser = await getUserByName(userName);
		const penalties = await refreshAndGetPenaltiesByName(userName);

		const limit = 50;
		const skip = (pageIdx - 1) * limit;
		const historySummaries = await getHistorySummariesByUserId(queriedUser._id, limit, skip);

		return {
			queriedUser: JSON.stringify(queriedUser),
			historySummaries: JSON.stringify(historySummaries),
			penalties: JSON.stringify(penalties)
		};
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(500, (e as Error).message || '사용자 정보를 불러오는데 실패했습니다.');
	}
};
