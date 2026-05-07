import { compareDocByDoc, readDocByFullTitle, WikiError, getHttpStatus } from '@nemowiki/core';
import { error } from '@sveltejs/kit';

export const load = async ({ params, url, locals }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) error(400, 'fullTitle is undefined');

	const oldRev = Number(url.searchParams.get('old'));
	const newRev = Number(url.searchParams.get('new'));

	if (oldRev < 0 || newRev <= 0) error(400, 'oldRev or newRev is invalid');

	try {
		const oldDoc = await readDocByFullTitle(fullTitle, locals.user, { revision: oldRev });
		const newDoc = await readDocByFullTitle(fullTitle, locals.user, { revision: newRev });

		if (!oldDoc || !newDoc) error(404, '문서를 찾을 수 없습니다.');

		const diff = compareDocByDoc(oldDoc, newDoc);

		return {
			diff: JSON.stringify(diff),
			oldRev,
			newRev
		};
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(500, (e as Error).message || '정보를 불러오는데 실패했습니다.');
	}
};
