import { redirect } from '@sveltejs/kit';
import { searchDoc } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import type { ServerLoadEvent } from '@sveltejs/kit';
import type { WikiResponse } from '@nemowiki/core/types';

export async function searchLoad({
	params
}: ServerLoadEvent): Promise<WikiResponse<{ result: string }>> {
	const query = params.query;
	if (!query)
		return {
			ok: false,
			reason: 'query is undefined'
		};

	const data = await searchDoc(query);

	if (data.status === 'exact') {
		redirect(303, `/r/${encodeFullTitle(data.result[0] as string)}`);
	} else {
		return {
			ok: true,
			value: {
				result: JSON.stringify(data.result)
			}
		};
	}
}
