import { canCreate, canEdit, canRecreate } from '@nemowiki/core/client';
import { readDocByFullTitle, getEmptyDocByFullTitle, WikiError, getHttpStatus } from '@nemowiki/core';
import { error, type ServerLoadEvent } from '@sveltejs/kit';
import { DocStates, type RuleResult, type Doc, type DocCreate } from '@nemowiki/core/types';

export async function writeLoad({ params, locals }: ServerLoadEvent): Promise<{ doc: string }> {
	const fullTitle = params.fullTitle;
	if (!fullTitle) error(400, 'fullTitle is undefined');

	let existingDoc: Doc | null;
	try {
		existingDoc = await readDocByFullTitle(fullTitle, locals.user, { revision: -1 });
	} catch (e: unknown) {
		if (e instanceof WikiError) error(getHttpStatus(e.code) || 500, e.message);
		error(500, (e as Error).message || '문서를 불러올 수 없습니다.');
	}
	let doc: Doc | DocCreate;
	let res: RuleResult;

	if (existingDoc === null) {
		// New document
		doc = getEmptyDocByFullTitle(fullTitle);
		res = canCreate(doc, locals.user);
	} else {
		if (existingDoc.state === DocStates.Deleted) {
			res = canRecreate(existingDoc, locals.user);
		} else {
			res = canEdit(existingDoc, locals.user);
		}
		doc = existingDoc;
	}

	if (!res.ok) error(403, res.message || '권한이 없습니다.');

	return {
		doc: JSON.stringify(doc)
	};
}


