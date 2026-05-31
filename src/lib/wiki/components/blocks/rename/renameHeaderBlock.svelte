<script lang="ts">
	import PenaltyBtn from '$lib/wiki/components/common/btns/penaltyBtn.svelte';
	import RegroupBtn from '$lib/wiki/components/common/btns/regroupBtn.svelte';
	import UserBtn from '$lib/wiki/components/common/btns/userBtn.svelte';
	import UserHeader from '$lib/wiki/components/common/headers/userHeader.svelte';

	let {
		canRegroup,
		canPenalty
	}: {
		canRegroup: boolean;
		canPenalty: boolean;
	} = $props();

	const description = '(이름 변경)';
</script>

{#snippet Buttons()}
	<UserBtn />
	{#if canRegroup}
		<RegroupBtn />
	{/if}
	{#if canPenalty}
		<PenaltyBtn />
	{/if}
{/snippet}

<UserHeader {description} Btns={Buttons} />
