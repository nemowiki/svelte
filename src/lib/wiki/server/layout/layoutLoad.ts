import type { ServerLoadEvent } from '@sveltejs/kit';
import { getRecentHistorySummaries } from '@nemowiki/core';

export async function layoutLoad({
	locals
}: ServerLoadEvent): Promise<{ historySummaries: string; user: string; fullTitles: string }> {
	const historySummaryResponse = await getRecentHistorySummaries(20, 0);
	return {
		historySummaries: JSON.stringify(historySummaryResponse.items),
		user: JSON.stringify(locals.user),
		fullTitles: JSON.stringify(locals.fullTitles)
	};
}
