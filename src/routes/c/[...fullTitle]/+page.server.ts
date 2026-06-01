import { compareDocByDoc, readDocByFullTitle, WikiError } from '@nemowiki/core';
import { withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';
import { ErrorCodes } from '@nemowiki/core/client';

export const load = withLoadErrorHandling(async ({ params, url, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) throw new Error('fullTitle is undefined');

	const oldRev = Number(url.searchParams.get('old'));
	const newRev = Number(url.searchParams.get('new'));

	if (oldRev < 0 || newRev <= 0)
		throw new WikiError(
			ErrorCodes.VAL_INVALID_PARAMS,
			'존재하지 않거나 비교할 수 없는 수정본입니다.'
		);

	const oldDoc = await readDocByFullTitle(fullTitle, locals.user, { revision: oldRev });
	const newDoc = await readDocByFullTitle(fullTitle, locals.user, { revision: newRev });
	const doc = await readDocByFullTitle(fullTitle, locals.user);
	if (doc && !doc.permissions.canRead)
		throw new WikiError(ErrorCodes.AUTH_NO_PERMISSION, '권한이 없습니다.');

	const diff = compareDocByDoc(oldDoc, newDoc);

	return {
		doc,
		diff,
		oldRev,
		newRev
	};
});
