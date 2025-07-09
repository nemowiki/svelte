<script lang="ts">
	import { type Info } from '@nemowiki/core/types';
	import { docActionArr } from '$lib/utils/general.js';
	import AuthorityHeader from '$lib/components/pages/authority/authorityHeader.svelte';
	import AuthorityGroupList from '$lib/components/pages/authority/actionModule.svelte';

	let { data } = $props();

	let info = $derived<Info | null>(JSON.parse(data?.value?.info || 'null'));
</script>

<article>
	<AuthorityHeader {info} />
	{#if !data.ok}
		<p>{data.reason}</p>
	{:else if info}
		{#each docActionArr as docAction (docAction)}
			<AuthorityGroupList {docAction} {info} />
		{/each}
	{:else}
		<p>문서가 존재하지 않습니다?!</p>
	{/if}
</article>
