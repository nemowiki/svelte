<script lang="ts">
	import { getUserPermissions } from '$lib/wiki/utils/userPermissions.js';
	import type { User } from '@nemowiki/core/types';
	import RenamePageTemplate from '$lib/wiki/components/templates/renamePageTemplate.svelte';

	let { data } = $props() as { data: { queriedUser: User; user: User } };
	let queriedUser = $derived(data.queriedUser as User);
	let currentUser = $derived(data.user as User);
	let permissions = $derived(getUserPermissions(queriedUser, currentUser));
</script>

<RenamePageTemplate canRegroup={permissions.canRegroup} canPenalty={permissions.canManagePenalty} />
