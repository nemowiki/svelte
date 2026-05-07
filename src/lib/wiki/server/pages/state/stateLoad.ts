import { readDocByFullTitle, WikiError, getHttpStatus } from '@nemowiki/core';
import { DocStates } from '@nemowiki/core/types';
import { error, type ServerLoadEvent } from '@sveltejs/kit';

export async function stateLoad({ params, locals }: ServerLoadEvent): Promise<{ doc: string }> {
	const fullTitle = params.fullTitle;
	if (!fullTitle) error(400, 'fullTitle is undefined');

	try {
		const doc = await readDocByFullTitle(fullTitle, locals.user);
		if (!doc) error(404, '?얜챷苑뚦첎? 鈺곕똻???? ??녿뮸??덈뼄.');

		let hasPermission = false;
		if (doc.state === DocStates.Hidden) {
			hasPermission = doc.permissions.canShow;
		} else {
			hasPermission = doc.permissions.canHide;
		}

		if (!hasPermission) error(403, '권한이 없습니다.');

		return {
			doc: JSON.stringify(doc)
		};
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(500, (e as Error).message || '정보를 불러오는데 실패했습니다.');
	}
}


