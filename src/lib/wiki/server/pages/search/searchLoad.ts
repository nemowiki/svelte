import { redirect, error, type ServerLoadEvent } from '@sveltejs/kit';
import { searchDoc } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';

export async function searchLoad({ params }: ServerLoadEvent): Promise<{ results: string }> {
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
}


