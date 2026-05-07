import { createBacklinkHtmlByFullTitle } from '@nemowiki/core';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const fullTitle = params.fullTitle;
	if (!fullTitle) error(400, 'fullTitle is undefined');

	const html = await createBacklinkHtmlByFullTitle(fullTitle);

	if (!html) error(404, '역링크가 존재하지 않습니다.');

	return { html };
};
