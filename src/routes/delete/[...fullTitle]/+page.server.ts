import { getHttpStatus, readDocByFullTitle, WikiError, deleteDocByFullTitle } from '@nemowiki/core';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { encodeFullTitle } from '@nemowiki/core/client';

export const load = async ({ params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) error(400, 'fullTitle is undefined');

	try {
		const doc = await readDocByFullTitle(fullTitle, locals.user);
		if (!doc) error(404, '문서가 존재하지 않습니다.');

		if (!doc.permissions.canDelete) error(403, '권한이 없습니다.');
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(500, (e as Error).message || '정보를 불러오는데 실패했습니다.');
	}
};

export const actions = {
	default: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) return fail(400, { message: 'fullTitle is undefined' });

		const data = await request.formData();
		const comment = (data.get('comment') || '').toString();

		try {
			const doc = await readDocByFullTitle(fullTitle, locals.user);
			if (!doc) return fail(400, { message: '문서가 존재하지 않습니다.' });

			if (!doc.permissions.canDelete) return fail(400, { message: '권한이 없습니다.' });

			await deleteDocByFullTitle(fullTitle, locals.user, comment);
		} catch (e: unknown) {
			if (e instanceof WikiError) return fail(400, { message: e.message });
			throw e;
		}

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	}
} satisfies Actions;
