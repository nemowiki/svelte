import { getDocLogsByUserName, getUserByName, refreshAndGetPenaltiesByName } from '@nemowiki/core';

export async function load({ params, url }) {
	const userName = params.userName;
	const pageIdx = Number(url.searchParams.get('page')) || 1;
	const queriedUser = await getUserByName(userName);
	if (!queriedUser)
		return {
			ok: false,
			reason: '사용자가 존재하지 않습니다.',
			userName,
			queriedUser: 'null',
			logArr: '[]',
			penaltyArr: '[]'
		};

	const res_penalty = await refreshAndGetPenaltiesByName(userName);
	const res_docLog = await getDocLogsByUserName(userName, pageIdx);
	return {
		ok: res_penalty.ok && res_docLog.ok,
		reason: res_penalty.reason || res_docLog.reason,
		userName,
		queriedUser: JSON.stringify(queriedUser),
		logArr: JSON.stringify(res_docLog.data || []),
		penaltyArr: JSON.stringify(res_penalty.data || [])
	};
}
