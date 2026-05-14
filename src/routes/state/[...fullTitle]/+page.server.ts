import {
	readDocByFullTitle,
	WikiError,
	showDocByFullTitle,
	hideDocByFullTitle
} from '@nemowiki/core';
import { DocStates } from '@nemowiki/core/types';
import { redirect } from '@sveltejs/kit';
import { encodeFullTitle, ErrorCodes } from '@nemowiki/core/client';
import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';

export const load = withLoadErrorHandling(async ({ params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	const doc = await readDocByFullTitle(fullTitle, locals.user);
	if (!doc) throw new WikiError(ErrorCodes.DOC_NOT_FOUND, '문서가 존재하지 않습니다.');

	let hasPermission = false;
	if (doc.state === DocStates.Hidden) {
		hasPermission = doc.permissions.canShow;
	} else {
		hasPermission = doc.permissions.canHide;
	}

	if (!hasPermission) throw new WikiError(ErrorCodes.AUTH_NO_PERMISSION, '권한이 없습니다.');

	return { doc };
});

export const actions = {
	show: withActionErrorHandling(async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) throw new Error('fullTitle is undefined');

		const data = await request.formData();
		const comment = (data.get('comment') ?? '').toString();

		await showDocByFullTitle(fullTitle, locals.user, comment);

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	}),
	hide: withActionErrorHandling(async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) throw new Error('fullTitle is undefined');

		const data = await request.formData();
		const comment = (data.get('comment') ?? '').toString();

		await hideDocByFullTitle(fullTitle, locals.user, comment);

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	})
};
