import { getEmptyDocByFullTitle } from '@nemowiki/core';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function fileLoad(_: ServerLoadEvent): Promise<{ boilerplate: string }> {
	const doc = getEmptyDocByFullTitle('?뚯씪:?꾩떆');
	return {
		boilerplate: doc.markup
	};
}


