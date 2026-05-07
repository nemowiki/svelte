import { decodeFullTitle } from '@nemowiki/core/client';

export default function modifyHtmlByExistenceOfLinks(html: string, fullTitles: string[]): string {
	return html.replaceAll(/href="\/r\/(.*?)"/g, (matched, captured) => {
		if (fullTitles.indexOf(decodeFullTitle(captured.split('#')[0])) === -1) {
			return `class="nonexistent-link" ${matched}`;
		} else {
			return matched;
		}
	});
}
