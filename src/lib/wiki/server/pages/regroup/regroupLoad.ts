import { canChangeGroup } from '@nemowiki/core/client';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { getUserByName, WikiError, getHttpStatus } from '@nemowiki/core';

export async function regroupLoad({ params, locals }: ServerLoadEvent): Promise<void> {
	const userName = params.userName;
	if (!userName) error(400, 'userName is undefined');

	try {
		const queriedUser = await getUserByName(userName);
		const res = canChangeGroup(queriedUser, locals.user);
		if (!res.ok) error(403, res.message || '권한이 없습니다.');
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(500, (e as Error).message || '사용자 정보를 불러오는데 실패했습니다.');
	}
}


