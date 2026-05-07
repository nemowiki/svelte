import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { getUserByName, refreshAndGetPenaltiesByName, WikiError, getHttpStatus } from '@nemowiki/core';

export async function penaltyLoad({
	params
}: ServerLoadEvent): Promise<{ queriedUser: string; penalties: string }> {
	const userName = params.userName;
	if (!userName) error(400, 'userName is undefined');

	try {
		const queriedUser = await getUserByName(userName);
		const penalties = await refreshAndGetPenaltiesByName(userName);

		return {
			queriedUser: JSON.stringify(queriedUser),
			penalties: JSON.stringify(penalties)
		};
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(500, (e as Error).message || '정보를 불러오는데 실패했습니다.');
	}
}


