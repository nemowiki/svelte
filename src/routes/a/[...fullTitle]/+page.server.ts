import { getInfoByFullTitle } from '@nemowiki/core';
import { canRead } from '@nemowiki/core/client';

export async function load({ params, locals }) {
	const fullTitle = params.fullTitle;

	const info = await getInfoByFullTitle(fullTitle);
	if (!info) return { ok: false, reason: '문서가 존재하지 않습니다.', info: null };

	const res = canRead(info, locals.user.group);
	if (!res.ok) return { ok: false, reason: res.reason, info: JSON.stringify(info) };

	return {
		ok: true,
		reason: '',
		info: JSON.stringify(info)
	};
}
