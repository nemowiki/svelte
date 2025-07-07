import { fail, redirect } from '@sveltejs/kit';
import { uploadFileByFullTitle, getEmptyDocByFullTitle } from '@nemowiki/core';
import { encodeFullTitle, canUploadFile } from '@nemowiki/core/client';

export async function load() {
	const doc = getEmptyDocByFullTitle('파일:임시');
	return {
		boilerplate: doc.markup
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const markup = (data.get('markup') || '').toString();
		const fullTitle = '파일:' + (data.get('title') || '').toString();
		const file = data.get('file') as File;
		const comment = (data.get('comment') || '').toString();

		const res_file = canUploadFile(fullTitle, file);
		if (!res_file.ok) return fail(400, { message: res_file.reason });

		const res_upload = await uploadFileByFullTitle(fullTitle, markup, file, locals.user, comment);
		if (!res_upload.ok) return fail(400, { message: res_upload.reason });

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	}
};
