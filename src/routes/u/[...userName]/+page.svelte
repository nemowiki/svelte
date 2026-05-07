<script lang="ts">
	import type { PaginatedResponse, HistorySummary, Penalty, User } from '@nemowiki/core/types';
	import UserPageTemplate from '$lib/wiki/components/templates/userPageTemplate.svelte';

	let { data } = $props();

	const user = $derived<User>(JSON.parse(data?.queriedUser || 'null'));
	const historySummaries = $derived<PaginatedResponse<HistorySummary>>(
		JSON.parse(data?.historySummaries || '{}')
	);

	const penalties = $derived<Penalty[]>(JSON.parse(data?.penalties || '[]'));
</script>

<UserPageTemplate {user} {historySummaries} {penalties} />
