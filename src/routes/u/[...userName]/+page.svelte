<script lang="ts">
	import type { PaginatedResponse, HistorySummary, Penalty, User } from '@nemowiki/core/types';
	import UserPageTemplate from '$lib/wiki/components/templates/userPageTemplate.svelte';

	let { data } = $props();

	const user = $derived<User>(data.queriedUser);
	const paginatedHistorySummaries = $derived<PaginatedResponse<HistorySummary>>(
		data.paginatedHistorySummaries
	);

	const penalties = $derived<Penalty[]>(data.penalties);
</script>

<UserPageTemplate {user} {paginatedHistorySummaries} {penalties} />
