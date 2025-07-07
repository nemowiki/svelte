<script lang="ts">
	import type { DocLogDoc } from '@nemowiki/core/types';
	import HistoryModule from '$lib/components/pages/history/historyModule.svelte';
	import HistoryHeader from '$lib/components/pages/history/historyHeader.svelte';

	let { data } = $props();

	let ok = $derived<boolean>(data.ok as boolean);
	let reason = $derived<string>(data.reason as string);
	let fullTitle = $derived<string>(data.fullTitle as string);
	let logArr = $derived<DocLogDoc[]>(JSON.parse(data.logArr || '[]'));
</script>

<HistoryHeader {fullTitle} />
{#if !ok}
	<p>{reason}</p>
{:else if logArr.length === 0}
	<p>역사가 존재하지 않습니다.</p>
{:else}
	<HistoryModule {fullTitle} initial_logArr={logArr} />
{/if}
