<script lang="ts">
	import PenaltyListBlock from '$lib/wiki/components/blocks/user/penaltyListBlock.svelte';
	import UserContributionBlock from '$lib/wiki/components/blocks/user/userContributionBlock.svelte';
	import UserGroupBlock from '$lib/wiki/components/blocks/user/userGroupBlock.svelte';
	import UserHeaderBlock from '$lib/wiki/components/blocks/user/userHeaderBlock.svelte';
	import type { User, PaginatedResponse, HistorySummary, Penalty } from '@nemowiki/core/types';

	let {
		user,
		paginatedHistorySummaries,
		penalties
	}: {
		user: User;
		paginatedHistorySummaries: PaginatedResponse<HistorySummary>;
		penalties: Penalty[];
	} = $props();
</script>

<article class="user-page-template">
	<UserHeaderBlock />

	<section>
		<UserGroupBlock group={user.group} />
	</section>

	<section>
		<UserContributionBlock userName={user.name} {paginatedHistorySummaries} />
	</section>

	<section>
		<PenaltyListBlock {penalties} />
	</section>
</article>
