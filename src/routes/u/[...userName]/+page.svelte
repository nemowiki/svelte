<script lang="ts">
	import type { DocLogDoc, PenaltyDoc, User } from '@nemowiki/core/types';
	import UserGroup from '$lib/components/pages/user/userGroup.svelte';
	import UserContribute from '$lib/components/pages/user/userContribute.svelte';
	import UserPenalty from '$lib/components/pages/user/userPenalty.svelte';
	import UserHeader from '$lib/components/pages/user/userHeader.svelte';

	let { data } = $props();

	let ok = $derived<boolean>(data.ok as boolean);
	let reason = $derived<string>(data.reason as string);

	let queriedUser = $derived<User | null>(JSON.parse(data.queriedUser));

	let logArr = $derived<DocLogDoc[]>(JSON.parse(data.logArr));

	let penaltyArr = $derived<PenaltyDoc[]>(JSON.parse(data.penaltyArr));
</script>

<UserHeader />

<article>
	{#if !queriedUser || !ok}
		<p>{reason}</p>
	{:else}
		<UserGroup {queriedUser} />
		<UserContribute {queriedUser} initial_logArr={logArr} />
		<UserPenalty {penaltyArr} />
	{/if}
</article>
