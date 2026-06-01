import {
	readDocByFullTitle,
	WikiError,
	showDocByFullTitle,
	hideDocByFullTitle
} from '@nemowiki/core';
import { redirect } from '@sveltejs/kit';
import { encodeFullTitle, ErrorCodes } from '@nemowiki/core/client';
import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';
import { requireText } from '$lib/wiki/utils/formValidation.js';

export const load = withLoadErrorHandling(async ({ params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	const doc = await readDocByFullTitle(fullTitle, locals.user);
	if (!doc) throw new WikiError(ErrorCodes.DOC_NOT_FOUND, '문서가 존재하지 않습니다.');

	if (!doc.permissions.canToggle)
		throw new WikiError(ErrorCodes.AUTH_NO_PERMISSION, '권한이 없습니다.');

	return { doc };
});

export const actions = {
	show: withActionErrorHandling(async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) throw new Error('fullTitle is undefined');

		const data = await request.formData();
		const comment = requireText(data.get('comment'), '상태 변경 사유를 입력해 주세요.');

		await showDocByFullTitle(fullTitle, locals.user, comment);

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	}),
	hide: withActionErrorHandling(async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) throw new Error('fullTitle is undefined');

		const data = await request.formData();
		const comment = requireText(data.get('comment'), '상태 변경 사유를 입력해 주세요.');

		await hideDocByFullTitle(fullTitle, locals.user, comment);

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	})
};
