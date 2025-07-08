<script lang="ts">
	import { type Info } from '@nemowiki/core/types';
	import { docActionArr } from '$lib/utils/general.js';
	import AuthorityHeader from '$lib/components/pages/authority/authorityHeader.svelte';
	import AuthorityGroupList from '$lib/components/pages/authority/actionModule.svelte';

	let { data } = $props();

	let reason = $derived<string>(data.reason);
	let info = $derived<Info | null>(JSON.parse(data.info!));
</script>

<article>
	<AuthorityHeader {info} />
	{#if !info || reason}
		<p>{reason}</p>
	{:else}
		{#each docActionArr as docAction (docAction)}
			<AuthorityGroupList {docAction} {info} />
		{/each}
	{/if}
</article>
