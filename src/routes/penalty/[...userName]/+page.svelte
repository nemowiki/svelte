<script lang="ts">
	import { getUserPermissions } from '$lib/wiki/utils/userPermissions.js';
	import type { User } from '@nemowiki/core/types';
	import PenaltyPageTemplate from '$lib/wiki/components/templates/penaltyPageTemplate.svelte';

	let { data } = $props();
	let queriedUser = $derived(data.queriedUser as User);
	let currentUser = $derived(data.user as User);
	let penalties = $derived(data.penalties);
	let permissions = $derived(getUserPermissions(queriedUser, currentUser));
</script>

<PenaltyPageTemplate
	canRename={permissions.canRename}
	canRegroup={permissions.canRegroup}
	canManagePenalty={permissions.canRemovePenalty}
	canApplyPenalty={permissions.canApplyPenalty}
	{penalties}
/>
