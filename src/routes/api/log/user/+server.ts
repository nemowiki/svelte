import { json } from '@sveltejs/kit';
import { getDocLogsByUserName } from '@nemowiki/core';

export async function POST({ request, locals }) {
	let { userName, pageIdx } = await request.json();
	return json(await getDocLogsByUserName(userName, pageIdx));
}
