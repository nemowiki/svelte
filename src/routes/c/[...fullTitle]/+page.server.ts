import { error, redirect } from '@sveltejs/kit';
import { compareDocByDoc, readDocByFullTitle } from '@nemowiki/core';

export async function load({ params, url, locals }) {
	const fullTitle = params.fullTitle;
	const oldRev = Number(url.searchParams.get('old'));
	const newRev = Number(url.searchParams.get('new'));

	if (oldRev < 0 || newRev <= 0) redirect(300, '/');

	const res_old = await readDocByFullTitle(fullTitle, locals.user, oldRev);
	if (!res_old.data) error(400, { message: res_old.reason, fullTitle });

	const res_new = await readDocByFullTitle(fullTitle, locals.user, newRev);
	if (!res_new.data) error(400, { message: res_new.reason, fullTitle });

	if (res_old.data.state === 'new') res_old.data.markup = '';
	if (res_new.data.state === 'new') res_new.data.markup = '';

	const data = await compareDocByDoc(res_old.data!, res_new.data!);

	return {
		fullTitle,
		diff: JSON.stringify(data.diff),
		oldRev,
		newRev
		// oldDoc: JSON.stringify(data.oldDoc),
		// newDoc: JSON.stringify(data.newDoc),
	};
}
