import { getRecentHistorySummaries } from '@nemowiki/core';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { HistorySummary, User } from '@nemowiki/core/types';

export const load = async ({
	locals
}: ServerLoadEvent): Promise<{
	recentHistorySummaries: HistorySummary[];
	user: User;
	fullTitles: string[];
}> => {
	const historySummaryResponse = await getRecentHistorySummaries(20, 0);
	return {
		recentHistorySummaries: historySummaryResponse.items,
		user: locals.user,
		fullTitles: locals.fullTitles
	};
};
