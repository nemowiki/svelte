import { blockUserByName, removePenaltyById, warnUserByName, WikiError } from '@nemowiki/core';
import { PenaltyTypes } from '@nemowiki/core/types';
import { encodeFullTitle } from '@nemowiki/core/client';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const penaltyActions = {
	apply: async ({ request, locals, params }) => {
		const userName = params.userName;
		if (!userName) return fail(400, { message: 'userName is undefined' });

		const data = await request.formData();
		const penaltyType = (data.get('penalty-type') || '').toString();
		if (!penaltyType) return fail(400, { message: 'penaltyType is undefined' });
		const duration = (data.get('duration') || '').toString();
		if (!duration) return fail(400, { message: '기간을 입력해 주세요.' });
		const reason = (data.get('reason') || '').toString();
		if (!reason) return fail(400, { message: '사유를 입력해 주세요.' });

		try {
			if (penaltyType === PenaltyTypes.Warn) {
				await warnUserByName(userName, Number(duration), reason, locals.user);
			} else if (penaltyType === PenaltyTypes.Block) {
				await blockUserByName(userName, Number(duration), reason, locals.user);
			} else {
				return fail(400, { message: 'penaltyType is invalid' });
			}
		} catch (e: unknown) {
			if (e instanceof WikiError) return fail(400, { message: e.message });
			throw e;
		}

		redirect(303, '/u/' + encodeFullTitle(userName));
	},
	remove: async ({ request, locals, params }) => {
		const userName = params.userName;
		if (!userName) return fail(400, { message: 'userName is undefined' });

		const data = await request.formData();
		const penaltyId = (data.get('penalty-id') || '').toString();
		if (!penaltyId) return fail(400, { message: 'penaltyId is undefined' });
		const reason = (data.get('reason') || '').toString();
		if (!reason) return fail(400, { message: '이유를 입력해 주세요.' });

		try {
			await removePenaltyById(penaltyId, reason, locals.user);
		} catch (e: unknown) {
			if (e instanceof WikiError) return fail(400, { message: e.message });
			throw e;
		}

		redirect(303, '/u/' + encodeFullTitle(userName));
	}
} satisfies Actions;
