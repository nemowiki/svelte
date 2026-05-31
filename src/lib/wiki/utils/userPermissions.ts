import {
	canApplyPenalty,
	canChangeGroup,
	canChangeName,
	canRemovePenalty
} from '@nemowiki/core/client';
import type { User } from '@nemowiki/core/types';

export function getUserPermissions(targetUser: User, currentUser: User) {
	const canApply = canApplyPenalty(targetUser, currentUser, 0).ok;
	const canRemove = canRemovePenalty(currentUser).ok;

	return {
		canRename: canChangeName(targetUser, currentUser).ok,
		canRegroup: canChangeGroup(targetUser, currentUser).ok,
		canApplyPenalty: canApply,
		canRemovePenalty: canRemove,
		canManagePenalty: canApply || canRemove
	};
}
