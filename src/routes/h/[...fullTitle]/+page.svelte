<script lang="ts">
	import type { DocLogDoc } from '@nemowiki/core/types';
	import HistoryModule from '$lib/components/pages/history/historyModule.svelte';
	import HistoryHeader from '$lib/components/pages/history/historyHeader.svelte';

	let { data } = $props();

	let logArr = $derived<DocLogDoc[]>(JSON.parse(data?.value?.logArr || '[]'));
</script>

<article>
	<HistoryHeader />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else}
		<HistoryModule {logArr} />
	{/if}
</article>
