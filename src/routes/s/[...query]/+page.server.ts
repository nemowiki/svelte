import { redirect } from '@sveltejs/kit';
import { searchDoc } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import { withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';

export const load = withLoadErrorHandling(async ({ params }) => {
	const query = params.query;
	if (!query) throw new Error('query is undefined');

	const searchResponse = await searchDoc(query);

	if (searchResponse.status === 'exact') {
		redirect(303, `/r/${encodeFullTitle(searchResponse.result)}`);
	} else {
		return {
			results: searchResponse.result
		};
	}
});
