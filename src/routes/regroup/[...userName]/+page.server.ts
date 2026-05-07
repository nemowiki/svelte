import { canChangeGroup, encodeFullTitle } from '@nemowiki/core/client';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { getUserByName, WikiError, getHttpStatus, changeUserGroupByName } from '@nemowiki/core';
import type { Group } from '@nemowiki/core/types';

export const load = async ({ params, locals }) => {
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
};

export const actions = {
	default: async ({ request, locals, params }) => {
		const queriedUserName = params.userName;
		if (!queriedUserName) return fail(400, { message: 'queriedUserName is undefined' });

		const data = await request.formData();
		const newGroup = (data.get('new-group') || '').toString();
		if (!newGroup) return fail(400, { message: 'newGroup is undefined' });

		try {
			await changeUserGroupByName(queriedUserName, newGroup as Group, locals.user);
		} catch (e: unknown) {
			if (e instanceof WikiError) return fail(400, { message: e.message });
			throw e;
		}

		redirect(303, '/u/' + encodeFullTitle(queriedUserName));
	}
} satisfies Actions;
