import { redirect, error } from '@sveltejs/kit';
import { searchDoc } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';

export const load = async ({ params }) => {
	const query = params.query;
	if (!query) error(400, 'query is undefined');

	const searchResponse = await searchDoc(query);

	if (searchResponse.status === 'exact') {
		redirect(303, `/r/${encodeFullTitle(searchResponse.result[0] as string)}`);
	} else {
		return {
			results: JSON.stringify(searchResponse.result)
		};
	}
};
