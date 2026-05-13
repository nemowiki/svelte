import { getRecentHistorySummaries } from '@nemowiki/core';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({
	locals
}: ServerLoadEvent): Promise<{
	recentHistorySummaries: string;
	user: string;
	fullTitles: string[];
}> => {
	const historySummaryResponse = await getRecentHistorySummaries(20, 0);
	return {
		recentHistorySummaries: JSON.stringify(historySummaryResponse.items),
		user: JSON.stringify(locals.user),
		fullTitles: locals.fullTitles
	};
};
