import { json } from '@sveltejs/kit';
import { warnUserByName } from '@nemowiki/core';

export async function POST({ request, locals }) {
	const { userName, duration, comment } = await request.json();
	return json(await warnUserByName(userName, locals.user, duration, comment));
}
