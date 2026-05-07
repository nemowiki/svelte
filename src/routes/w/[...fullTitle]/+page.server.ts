import { canCreate, canEdit, canRecreate, encodeFullTitle } from '@nemowiki/core/client';
import {
	readDocByFullTitle,
	getEmptyDocByFullTitle,
	WikiError,
	getHttpStatus,
	previewDoc,
	createDocByFullTitle,
	editDocByFullTitle
} from '@nemowiki/core';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { DocStates, type RuleResult, type Doc, type DocCreate } from '@nemowiki/core/types';
import modifyHtmlByExistenceOfLinks from '$lib/wiki/utils/modifyHtml.js';

export const load = async ({ params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) error(400, 'fullTitle is undefined');

	let existingDoc: Doc | null;
	try {
		existingDoc = await readDocByFullTitle(fullTitle, locals.user, { revision: -1 });
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		error(500, (e as Error).message || '문서를 불러올 수 없습니다.');
	}

	let doc: Doc | DocCreate;
	let res: RuleResult;

	if (existingDoc === null) {
		doc = getEmptyDocByFullTitle(fullTitle);
		res = canCreate(doc, locals.user);
	} else {
		if (existingDoc.state === DocStates.Deleted) {
			res = canRecreate(existingDoc, locals.user);
		} else {
			res = canEdit(existingDoc, locals.user);
		}
		doc = existingDoc;
	}

	if (!res.ok) error(403, res.message || '권한이 없습니다.');

	return { doc: JSON.stringify(doc) };
};

export const actions = {
	save: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) return fail(400, { message: 'fullTitle is undefined' });

		const data = await request.formData();
		const markup = (data.get('markup') || '').toString();
		const comment = (data.get('comment') || '').toString();

		const doc = await readDocByFullTitle(fullTitle, locals.user);

		try {
			if (doc === null || doc.state === DocStates.Deleted || doc.state === DocStates.Hidden) {
				await createDocByFullTitle(fullTitle, locals.user, markup, comment);
			} else {
				await editDocByFullTitle(fullTitle, locals.user, markup, comment);
			}
		} catch (e: unknown) {
			if (e instanceof WikiError) return fail(400, { message: e.message });
			throw e;
		}

		redirect(303, `/r/${encodeFullTitle(fullTitle)}`);
	},
	preview: async ({ request, locals }) => {
		const data = await request.formData();
		const doc = JSON.parse((data.get('doc') || '').toString());
		try {
			const html = await previewDoc(doc, locals.user);
			return { html: modifyHtmlByExistenceOfLinks(html, locals.fullTitles) };
		} catch (e: unknown) {
			return fail(400, { message: e instanceof Error ? e.message : '알 수 없는 에러' });
		}
	}
} satisfies Actions;
