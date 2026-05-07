import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { getFilePathByTitle } from '@nemowiki/core';

export const GET: RequestHandler = async ({ params, locals, url }) => {
	const fileTitle = params.title;
	const revParam = url.searchParams.get('rev');
	const rev = revParam ? Number(revParam) : undefined;

	if (!fileTitle) {
		error(400, 'Bad Request');
	}

	try {
		const filePath = await getFilePathByTitle(fileTitle, locals.user, rev);
		redirect(302, filePath);
	} catch {
		error(404, 'Not Found');
	}
};
