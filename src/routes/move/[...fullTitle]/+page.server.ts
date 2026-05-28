import { readDocByFullTitle, moveDocByFullTitle, WikiError } from '@nemowiki/core';
import { redirect } from '@sveltejs/kit';
import { DocStates, encodeFullTitle, ErrorCodes } from '@nemowiki/core/client';
import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';

export const load = withLoadErrorHandling(async ({ params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	const doc = await readDocByFullTitle(fullTitle, locals.user);
	if (!doc || doc.state === DocStates.Deleted)
		throw new WikiError(ErrorCodes.DOC_NOT_FOUND, '문서가 존재하지 않습니다.');

	if (!doc.permissions.canMove)
		throw new WikiError(ErrorCodes.AUTH_NO_PERMISSION, '권한이 없습니다.');
});

export const actions = {
	default: withActionErrorHandling(async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) throw new Error('fullTitle is undefined');

		const data = await request.formData();
		const newFullTitle = (data.get('new-full-title') ?? '').toString();
		const comment = (data.get('comment') ?? '').toString();

		await moveDocByFullTitle(fullTitle, locals.user, newFullTitle, comment);

		redirect(303, `/r/${encodeFullTitle(newFullTitle)}`);
	})
};
