import { json } from '@sveltejs/kit';
import { changeUserNameByName } from '@nemowiki/core';

export async function POST({ request, locals }) {
	const { userName, name } = await request.json();
	return json(await changeUserNameByName(userName, name, locals.user));
}
