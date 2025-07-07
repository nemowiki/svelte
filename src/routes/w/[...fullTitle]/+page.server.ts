import { redirect, error, fail } from '@sveltejs/kit';
import {
	createDocByFullTitle,
	editDocByFullTitle,
	getEmptyDocByFullTitle,
	getInfoByFullTitle,
	getDocByFullTitle
} from '@nemowiki/core';
import { canCreate, canEdit, encodeFullTitle } from '@nemowiki/core/client';
import type { WikiResponse } from '@nemowiki/core/types';

export async function load({ params, locals }) {
	const fullTitle = params.fullTitle;

	let doc = await getDocByFullTitle(fullTitle, -1);

	if (doc === null) {
		// New document
		const res_create = canCreate(null, fullTitle, locals.user.group);
		if (!res_create.ok) return error(403, { message: res_create.reason, fullTitle });
		doc = getEmptyDocByFullTitle(fullTitle);
	} else if (doc.state === 'deleted' || doc.state === 'hidden') {
		const res_create = canCreate(doc, fullTitle, locals.user.group);
		if (!res_create.ok) return error(403, { message: res_create.reason, fullTitle });
	} else {
		const res_edit = canEdit(doc, locals.user.group);
		if (!res_edit.ok) return error(403, { message: res_edit.reason, fullTitle });
	}

	return {
		fullTitle,
		doc: JSON.stringify(doc)
	};
}

export const actions = {
	default: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		const data = await request.formData();
		const markup = (data.get('markup') || '').toString();
		const comment = (data.get('comment') || '').toString();

		let info = await getInfoByFullTitle(fullTitle);
		let res: WikiResponse;

		if (info === null || info.state === 'deleted' || info.state === 'hidden') {
			res = await createDocByFullTitle(fullTitle, locals.user, markup, comment);
		} else {
			res = await editDocByFullTitle(fullTitle, locals.user, markup, comment);
		}

		if (res.ok) redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
		else return fail(400, { message: res.reason, fullTitle });
	}
};
