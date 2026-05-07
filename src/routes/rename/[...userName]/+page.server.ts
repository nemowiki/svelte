import { canChangeName, encodeFullTitle } from '@nemowiki/core/client';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { getUserByName, WikiError, getHttpStatus, changeUserNameByName } from '@nemowiki/core';

export const load = async ({ params, locals }) => {
	const userName = params.userName;
	if (!userName) error(400, 'userName is undefined');

	try {
		const queriedUser = await getUserByName(userName);
		const res = canChangeName(queriedUser, locals.user);
		if (!res.ok) error(403, res.message || '권한이 없습니다.');
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(500, (e as Error).message || '사용자 정보를 불러오는데 실패했습니다.');
	}
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const newName = (data.get('new-name') || '').toString();
		if (!newName) return fail(400, { message: 'newName is undefined' });

		try {
			await changeUserNameByName(locals.user.name, newName, locals.user);
		} catch (e: unknown) {
			if (e instanceof WikiError) return fail(400, { message: e.message });
			throw e;
		}

		redirect(303, '/u/' + encodeFullTitle(newName));
	}
} satisfies Actions;
