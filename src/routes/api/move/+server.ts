import { json } from '@sveltejs/kit';
import { moveDocByFullTitle } from '@nemowiki/core';

export async function POST({ request, locals }) {
	const { fullTitle, newFullTitle, comment } = await request.json();
	return json(await moveDocByFullTitle(fullTitle, locals.user, newFullTitle, comment));
}
