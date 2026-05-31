import { redirect } from '@sveltejs/kit';
import {
	getUserByName,
	refreshAndGetPenaltiesByName,
	blockUserByName,
	removePenaltyById,
	warnUserByName,
	WikiError
} from '@nemowiki/core';
import { PenaltyTypes } from '@nemowiki/core/types';
import { encodeFullTitle, ErrorCodes } from '@nemowiki/core/client';
import { withActionErrorHandling, withLoadErrorHandling } from '$lib/wiki/utils/errorHandling.js';
import { requireNumber, requireText } from '$lib/wiki/utils/formValidation.js';

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
		const penaltyType = requireText(data.get('penalty-type'), '제재 종류를 선택해 주세요.');
		const duration = requireNumber(data.get('duration'), '기간을 입력해 주세요.');
		const reason = requireText(data.get('reason'), '사유를 입력해 주세요.');

		if (penaltyType === PenaltyTypes.Warn) {
			await warnUserByName(userName, duration, reason, locals.user);
		} else if (penaltyType === PenaltyTypes.Block) {
			await blockUserByName(userName, duration, reason, locals.user);
		} else {
			throw new WikiError(ErrorCodes.VAL_INVALID_PARAMS, '잘못된 제재 유형입니다.');
		}

		redirect(303, '/u/' + encodeFullTitle(userName));
	}),
	remove: withActionErrorHandling(async ({ request, locals, params }) => {
		const userName = params.userName;
		if (!userName) throw new Error('userName is undefined');

		const data = await request.formData();
		const penaltyId = requireText(data.get('penalty-id'), '해제할 제재를 선택해 주세요.');
		const reason = requireText(data.get('reason'), '사유를 입력해 주세요.');

		await removePenaltyById(penaltyId, reason, locals.user);

		redirect(303, '/u/' + encodeFullTitle(userName));
	})
};
