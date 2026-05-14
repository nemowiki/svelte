import { canChangeName, encodeFullTitle } from '@nemowiki/core/client';
import { fail, redirect } from '@sveltejs/kit';
import { getUserByName, WikiError, changeUserNameByName } from '@nemowiki/core';
import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';

export const load = withLoadErrorHandling(async ({ params, locals }) => {
	const userName = params.userName;
	if (!userName) throw new Error('userName is undefined');

	const queriedUser = await getUserByName(userName);

	const res = canChangeName(queriedUser, locals.user);
	if (!res.ok) throw new WikiError(res.code, res.message);
});

export const actions = {
	default: withActionErrorHandling(async ({ request, locals }) => {
		const data = await request.formData();
		const newName = (data.get('new-name') ?? '').toString();
		if (!newName) return fail(400, { message: '새로운 이름을 입력해주세요.' });

		await changeUserNameByName(locals.user.name, newName, locals.user);

		redirect(303, '/u/' + encodeFullTitle(newName));
	})
};
