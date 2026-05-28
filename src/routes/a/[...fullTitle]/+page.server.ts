import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';
import {
	getDocTypeByFullTitle,
	grantByFullTitle,
	readDocByFullTitle,
	resolveAcl
} from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import { redirect } from '@sveltejs/kit';

export const load = withLoadErrorHandling(async ({ params, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	const doc = await readDocByFullTitle(fullTitle, locals.user);
	const aclDetails = doc
		? resolveAcl(doc.acl, doc.type)
		: resolveAcl([], getDocTypeByFullTitle(fullTitle));

	return { aclDetails, doc };
});

export const actions = {
	default: withActionErrorHandling(async ({ request, locals, params }) => {
		const fullTitle = params.fullTitle;
		if (!fullTitle) throw new Error('fullTitle is undefined');

		const data = await request.formData();
		const change = (data.get('change') ?? '').toString();
		const docAction = (data.get('doc-action') ?? '').toString();
		const id = (data.get('id') ?? '').toString();
		const comment = (data.get('comment') ?? '').toString();

		await grantByFullTitle(fullTitle, docAction, change, id, locals.user, comment);

		redirect(303, `/a/${encodeFullTitle(fullTitle)}`);
	})
};
