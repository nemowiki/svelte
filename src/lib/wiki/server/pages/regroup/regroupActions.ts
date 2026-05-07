import { changeUserGroupByName, WikiError } from '@nemowiki/core';
import type { Group } from '@nemowiki/core/types';
import { encodeFullTitle } from '@nemowiki/core/client';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const regroupActions = {
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
