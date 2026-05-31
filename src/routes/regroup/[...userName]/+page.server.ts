import { canChangeGroup, encodeFullTitle } from '@nemowiki/core/client';
import { redirect } from '@sveltejs/kit';
import { getUserByName, WikiError, changeUserGroupByName } from '@nemowiki/core';
import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';
import { requireText } from '$lib/wiki/utils/formValidation.js';

export const load = withLoadErrorHandling(async ({ params, locals }) => {
	const userName = params.userName;
	if (!userName) throw new Error('userName is undefined');

	const queriedUser = await getUserByName(userName);
	const res = canChangeGroup(queriedUser, locals.user);
	if (!res.ok) throw new WikiError(res.code, res.message);
});

export const actions = {
	default: withActionErrorHandling(async ({ request, locals, params }) => {
		const queriedUserName = params.userName;
		if (!queriedUserName) throw new Error('queriedUserName is undefined');

		const data = await request.formData();
		const newGroup = requireText(data.get('new-group'), '그룹을 선택해 주세요.');

		await changeUserGroupByName(queriedUserName, newGroup, locals.user);

		redirect(303, '/u/' + encodeFullTitle(queriedUserName));
	})
};
