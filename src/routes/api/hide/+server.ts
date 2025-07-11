import { json } from '@sveltejs/kit';
import { hideDocByFullTitle } from '@nemowiki/core';

export async function POST({ request, locals }) {
	let { fullTitle, comment } = await request.json();
	return json(await hideDocByFullTitle(fullTitle, locals.user, comment));
}
