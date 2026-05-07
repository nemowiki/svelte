import { fail, redirect } from '@sveltejs/kit';
import { uploadFileByFullTitle, WikiError, getEmptyDocByFullTitle } from '@nemowiki/core';
import { DocPrefixes } from '@nemowiki/core/types';
import { encodeFullTitle, canUploadFile } from '@nemowiki/core/client';

export const load = async () => {
	const doc = getEmptyDocByFullTitle('파일:임시');
	return {
		boilerplate: doc.markup
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const markup = (data.get('markup') || '').toString();
		const fullTitle = DocPrefixes.File + ':' + (data.get('title') || '').toString();
		const file = data.get('file') as File;
		const comment = (data.get('comment') || '').toString();

		const res_file = canUploadFile(fullTitle, locals.user, file);
		if (!res_file.ok) return fail(400, { message: res_file.message || '권한이 없습니다.' });

		try {
			await uploadFileByFullTitle(fullTitle, markup, file, locals.user, comment);
		} catch (e: unknown) {
			if (e instanceof WikiError) return fail(400, { message: e.message });
			throw e;
		}

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	}
};
