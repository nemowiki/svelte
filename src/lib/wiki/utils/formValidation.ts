import { WikiError } from '@nemowiki/core';
import { ErrorCodes } from '@nemowiki/core/client';

export function requireText(value: FormDataEntryValue | null, message: string): string {
	const text = (value ?? '').toString().trim();
	if (!text) throw new WikiError(ErrorCodes.VAL_INVALID_PARAMS, message);
	return text;
}

export function requireNumber(value: FormDataEntryValue | null, message: string): number {
	const text = (value ?? '').toString().trim();
	if (!text) throw new WikiError(ErrorCodes.VAL_INVALID_PARAMS, message);

	const numberValue = Number(text);
	if (!Number.isFinite(numberValue)) throw new WikiError(ErrorCodes.VAL_INVALID_PARAMS, message);

	return numberValue;
}
