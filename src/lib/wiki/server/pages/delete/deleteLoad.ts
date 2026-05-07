import { getHttpStatus, readDocByFullTitle, WikiError } from '@nemowiki/core';
import { error, type ServerLoadEvent } from '@sveltejs/kit';

export async function deleteLoad({ params, locals }: ServerLoadEvent): Promise<void> {
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
}
