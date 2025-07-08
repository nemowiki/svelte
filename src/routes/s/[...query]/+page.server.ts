import { redirect } from '@sveltejs/kit';
import { searchDoc } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';

export async function load({ params }) {
	const query = params.query;
	const data = await searchDoc(query);
	if (data.status === 'exact') {
		redirect(303, `/r/${encodeFullTitle(data.result[0] as string)}`);
	} else {
		return {
			result: JSON.stringify(data.result)
		};
	}
}
