import { json } from '@sveltejs/kit';
import { deleteDocByFullTitle } from '@nemowiki/core';

export async function POST({ request, locals }) {
	const { fullTitle, comment } = await request.json();
	return json(await deleteDocByFullTitle(fullTitle, locals.user, comment));
}
