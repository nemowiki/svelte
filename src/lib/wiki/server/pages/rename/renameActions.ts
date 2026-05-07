import { changeUserNameByName, WikiError } from '@nemowiki/core';
import { encodeFullTitle } from '@nemowiki/core/client';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const renameActions = {
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
