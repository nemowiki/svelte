<script lang="ts">
	import { type Info } from '@nemowiki/core/types';
	import { docActionArr } from '$lib/utils/general.js';
	import AuthorityHeader from '$lib/components/pages/authority/authorityHeader.svelte';
	import AuthorityGroupList from '$lib/components/pages/authority/actionModule.svelte';

	let { data } = $props();

	let info = $derived<Info | null>(JSON.parse(data.info!));

	let fullTitle = $derived<string>(data.fullTitle);
	let reason = $derived<string>(data.reason);
</script>

<AuthorityHeader {fullTitle} {info} />

{#if !info || reason}
	<p>{reason}</p>
{:else}
	{#each docActionArr as docAction}
		<AuthorityGroupList {fullTitle} {docAction} {info} />
	{/each}
{/if}
