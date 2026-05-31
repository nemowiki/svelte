import { canChangeName, encodeFullTitle } from '@nemowiki/core/client';
import { redirect } from '@sveltejs/kit';
import { getUserByName, WikiError, changeUserNameByName } from '@nemowiki/core';
import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';
import { requireText } from '$lib/wiki/utils/formValidation.js';

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
		const newName = requireText(data.get('new-name'), '새 이름을 입력해 주세요.');

		await changeUserNameByName(locals.user.name, newName, locals.user);

		redirect(303, '/u/' + encodeFullTitle(newName));
	})
};
