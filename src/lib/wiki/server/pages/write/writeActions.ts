import {
	readDocByFullTitle,
	previewDoc,
	WikiError,
	createDocByFullTitle,
	editDocByFullTitle
} from '@nemowiki/core';
import { DocStates } from '@nemowiki/core/types';
import { encodeFullTitle } from '@nemowiki/core/client';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import modifyHtmlByExistenceOfLinks from '$lib/wiki/utils/modifyHtml.js';

export const writeActions = {
	// ... (save action same as before)
	save: async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle)
			return fail(400, {
				message: 'fullTitle is undefined'
			});

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
			return {
				html: modifyHtmlByExistenceOfLinks(html, locals.fullTitles)
			};
		} catch (e: unknown) {
			return fail(400, {
				message: e instanceof Error ? e.message : '알 수 없는 에러'
			});
		}
	}
} satisfies Actions;
