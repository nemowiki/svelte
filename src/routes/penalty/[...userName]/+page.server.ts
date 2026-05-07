import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import {
	getUserByName,
	refreshAndGetPenaltiesByName,
	WikiError,
	getHttpStatus,
	blockUserByName,
	removePenaltyById,
	warnUserByName
} from '@nemowiki/core';
import { PenaltyTypes } from '@nemowiki/core/types';
import { encodeFullTitle } from '@nemowiki/core/client';

export const load = async ({ params }) => {
	const userName = params.userName;
	if (!userName) error(400, 'userName is undefined');

	try {
		const queriedUser = await getUserByName(userName);
		const penalties = await refreshAndGetPenaltiesByName(userName);

		return {
			queriedUser: JSON.stringify(queriedUser),
			penalties: JSON.stringify(penalties)
		};
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		if (e && typeof e === 'object' && 'status' in e) throw e;
		error(500, (e as Error).message || '정보를 불러오는데 실패했습니다.');
	}
};

export const actions = {
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
