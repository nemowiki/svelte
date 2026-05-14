import { type DocAction, type Group, DocActions, Groups } from '@nemowiki/core/types';

export function parseDateTime(time: string): string {
	const t = new Date(time);
	return `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}`;
}

export function parseTimeOnly(time: string): string {
	const t = new Date(time);
	if (t.getMinutes() < 10) {
		return `${t.getHours()}:0${t.getMinutes()}`;
	} else {
		return `${t.getHours()}:${t.getMinutes()}`;
	}
}

export const groups: Group[] = [Groups.Any, Groups.Guest, Groups.User, Groups.Manager, Groups.Dev];

export const docActions: DocAction[] = [
	DocActions.Read,
	DocActions.Create,
	DocActions.Edit,
	DocActions.Move,
	DocActions.Delete,
	DocActions.Grant,
	DocActions.Toggle
];

export const translatedDocActions: string[] = [
	'읽기',
	'생성',
	'편집',
	'이동',
	'삭제',
	'권한',
	'상태'
];
