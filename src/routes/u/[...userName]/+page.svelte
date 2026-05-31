<script lang="ts">
	import { getUserPermissions } from '$lib/wiki/utils/userPermissions.js';
	import type { PaginatedResponse, HistorySummary, Penalty, User } from '@nemowiki/core/types';
	import UserPageTemplate from '$lib/wiki/components/templates/userPageTemplate.svelte';

	let { data } = $props();

	const user = $derived<User>(data.queriedUser);
	const currentUser = $derived<User>(data.user);
	const paginatedHistorySummaries = $derived<PaginatedResponse<HistorySummary>>(
		data.paginatedHistorySummaries
	);

	const penalties = $derived<Penalty[]>(data.penalties);
	const permissions = $derived(getUserPermissions(user, currentUser));
</script>

<UserPageTemplate
	{user}
	canRename={permissions.canRename}
	canRegroup={permissions.canRegroup}
	canPenalty={permissions.canManagePenalty}
	{paginatedHistorySummaries}
	{penalties}
/>
