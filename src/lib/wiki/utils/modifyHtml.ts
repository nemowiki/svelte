import { decodeFullTitle, DocPrefixes } from '@nemowiki/core/client';

export default function modifyHtmlByExistenceOfLinks(html: string, fullTitles: string[]): string {
	return html.replaceAll(/href="\/r\/(.*?)"/g, (matched, captured) => {
		const decodedFullTitle = decodeFullTitle(captured.split(/\?|#/g)[0]);
		if (
			fullTitles.indexOf(decodedFullTitle) === -1 &&
			!decodedFullTitle.startsWith(DocPrefixes.Category + ':')
		) {
			return `class="nonexistent-link" ${matched}`;
		} else {
			return matched;
		}
	});
}
