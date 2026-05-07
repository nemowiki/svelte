<script lang="ts">
	import type { HistorySummary, Penalty, User } from '@nemowiki/core/types';
	import UserGroup from '$lib/wiki/components/pages/user/userGroup.svelte';
	import UserContribute from '$lib/wiki/components/pages/user/userContribute.svelte';
	import UserPenalty from '$lib/wiki/components/pages/user/userPenalty.svelte';
	import UserHeader from '$lib/wiki/components/pages/user/userHeader.svelte';

	let { data } = $props();

	let queriedUser = $derived<User | null>(JSON.parse(data?.queriedUser || 'null'));
	let historySummaries = $derived<HistorySummary[]>(JSON.parse(data?.historySummaries || '[]'));
	let penalties = $derived<Penalty[]>(JSON.parse(data?.penalties || '[]'));
</script>

<article>
	<UserHeader />
	<section>
		<UserGroup {queriedUser} />
	</section>
	<section>
		<UserContribute {queriedUser} {historySummaries} />
	</section>
	<section>
		<UserPenalty {penalties} />
	</section>
</article>
