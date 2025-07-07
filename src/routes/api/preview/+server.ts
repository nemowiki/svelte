import { json } from '@sveltejs/kit';
import { previewDoc } from '@nemowiki/core';
import type { Doc } from '@nemowiki/core/types';

export async function POST({ request }) {
	let { doc }: { doc: Doc } = await request.json();
	return json(await previewDoc(doc));
}
