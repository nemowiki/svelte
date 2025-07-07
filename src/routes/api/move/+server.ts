import { json } from '@sveltejs/kit';
import { moveDocByFullTitle } from '@nemowiki/core';

export async function POST({ request, locals }) {
	let { fullTitle, newFullTitle, comment } = await request.json();
	return json(await moveDocByFullTitle(fullTitle, locals.user, newFullTitle, comment));
}
