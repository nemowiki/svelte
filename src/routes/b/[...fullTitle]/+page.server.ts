import { createBacklinkHtmlByFullTitle } from '@nemowiki/core';

export async function load({ params }) {
	const fullTitle = params.fullTitle;
	const html = await createBacklinkHtmlByFullTitle(fullTitle);
	return {
		html
	};
}
