import { fail, redirect } from '@sveltejs/kit';
import {
	getUserByName,
	refreshAndGetPenaltiesByName,
	blockUserByName,
	removePenaltyById,
	warnUserByName
} from '@nemowiki/core';
import { PenaltyTypes } from '@nemowiki/core/types';
import { encodeFullTitle } from '@nemowiki/core/client';
import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';

export const load = withLoadErrorHandling(async ({ params }) => {
	const userName = params.userName;
	if (!userName) throw new Error('userName is undefined');

	const queriedUser = await getUserByName(userName);
	const penalties = await refreshAndGetPenaltiesByName(userName);

	return {
		queriedUser,
		penalties
	};
});

export const actions = {
	apply: withActionErrorHandling(async ({ request, locals, params }) => {
		const userName = params.userName;
		if (!userName) throw new Error('userName is undefined');

		const data = await request.formData();
		const penaltyType = (data.get('penalty-type') ?? '').toString();
		const duration = (data.get('duration') ?? '').toString();
		const reason = (data.get('reason') ?? '').toString();

		if (!duration) return fail(400, { message: '기간을 입력해 주세요.' });
		if (!reason) return fail(400, { message: '사유를 입력해 주세요.' });

		if (penaltyType === PenaltyTypes.Warn) {
			await warnUserByName(userName, Number(duration), reason, locals.user);
		} else if (penaltyType === PenaltyTypes.Block) {
			await blockUserByName(userName, Number(duration), reason, locals.user);
		} else {
			return fail(400, { message: '잘못된 제재 유형입니다.' });
		}

		redirect(303, '/u/' + encodeFullTitle(userName));
	}),
	remove: withActionErrorHandling(async ({ request, locals, params }) => {
		const userName = params.userName;
		if (!userName) throw new Error('userName is undefined');

		const data = await request.formData();
		const penaltyId = (data.get('penalty-id') ?? '').toString();
		const reason = (data.get('reason') ?? '').toString();

		if (!reason) return fail(400, { message: '사유를 입력해 주세요.' });

		await removePenaltyById(penaltyId, reason, locals.user);

		redirect(303, '/u/' + encodeFullTitle(userName));
	})
};
