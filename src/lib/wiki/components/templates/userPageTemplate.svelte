<script lang="ts">
	import PenaltyListBlock from '$lib/wiki/components/blocks/user/penaltyListBlock.svelte';
	import UserContributionBlock from '$lib/wiki/components/blocks/user/userContributionBlock.svelte';
	import UserGroupBlock from '$lib/wiki/components/blocks/user/userGroupBlock.svelte';
	import UserHeaderBlock from '$lib/wiki/components/blocks/user/userHeaderBlock.svelte';
	import type { User, PaginatedResponse, HistorySummary, Penalty } from '@nemowiki/core/types';

	let {
		user,
		canRename,
		canRegroup,
		canPenalty,
		paginatedHistorySummaries,
		penalties
	}: {
		user: User;
		canRename: boolean;
		canRegroup: boolean;
		canPenalty: boolean;
		paginatedHistorySummaries: PaginatedResponse<HistorySummary>;
		penalties: Penalty[];
	} = $props();
</script>

<article>
	<UserHeaderBlock {canRename} {canRegroup} {canPenalty} />
	<section>
		<UserGroupBlock group={user.group} />
	</section>
	<hr class="section-divider" />
	<section>
		<UserContributionBlock {user} {paginatedHistorySummaries} />
	</section>
	<hr class="section-divider" />
	<section>
		<PenaltyListBlock {penalties} />
	</section>
</article>
