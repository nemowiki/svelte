import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';
import { getEmptyDocByFullTitle, uploadFileByFullTitle, WikiError } from '@nemowiki/core';
import { encodeFullTitle, ErrorCodes } from '@nemowiki/core/client';
import { DocPrefixes } from '@nemowiki/core/types';
import { redirect } from '@sveltejs/kit';
import { requireText } from '$lib/wiki/utils/formValidation.js';

export const load = withLoadErrorHandling(async () => {
	const doc = getEmptyDocByFullTitle('파일:임시');
	return {
		boilerplate: doc.markup
	};
});

export const actions = {
	default: withActionErrorHandling(async ({ request, locals }) => {
		const data = await request.formData();

		const markup = (data.get('markup') ?? '').toString();

		const title = requireText(data.get('title'), '파일 제목을 입력해 주세요.');
		const fullTitle = DocPrefixes.File + ':' + title;

		const comment = (data.get('comment') ?? '').toString();
		const file = data.get('file');

		if (!(file instanceof File) || file.size === 0) {
			throw new WikiError(ErrorCodes.VAL_INVALID_FILE, '파일을 선택해 주세요.');
		}

		await uploadFileByFullTitle(fullTitle, markup, file, locals.user, comment);

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	})
};
