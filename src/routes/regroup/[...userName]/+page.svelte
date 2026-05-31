<script lang="ts">
	import { getUserPermissions } from '$lib/wiki/utils/userPermissions.js';
	import type { User } from '@nemowiki/core/types';
	import RegroupPageTemplate from '$lib/wiki/components/templates/regroupPageTemplate.svelte';

	let { data } = $props() as { data: { queriedUser: User; user: User } };
	let queriedUser = $derived(data.queriedUser as User);
	let currentUser = $derived(data.user as User);
	let permissions = $derived(getUserPermissions(queriedUser, currentUser));
</script>

<RegroupPageTemplate canRename={permissions.canRename} canPenalty={permissions.canManagePenalty} />
