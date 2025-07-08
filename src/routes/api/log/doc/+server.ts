import { json } from '@sveltejs/kit';
import { getDocLogsByFullTitle } from '@nemowiki/core';

export async function POST({ request, locals }) {
	const { fullTitle, pageIdx } = await request.json();
	return json(await getDocLogsByFullTitle(fullTitle, locals.user, pageIdx));
}
