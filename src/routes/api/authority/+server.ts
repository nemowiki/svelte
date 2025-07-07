import { json } from '@sveltejs/kit';
import { changeAuthorityByFullTitle } from '@nemowiki/core';

export async function POST({ request, locals }) {
	let { fullTitle, action, groupArr } = await request.json();
	return json(await changeAuthorityByFullTitle(fullTitle, action, groupArr, locals.user));
}
