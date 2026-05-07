<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import AuthorityHeader from '$lib/wiki/components/pages/authority/authorityHeader.svelte';
	import AuthorityForm from '$lib/wiki/components/pages/authority/authorityForm.svelte';
	import AuthorityList from '$lib/wiki/components/pages/authority/authorityList.svelte';

	let { data } = $props();

	let doc = $derived<Doc | null>(JSON.parse(data?.doc || 'null'));
</script>

<article>
	<AuthorityHeader />
	{#if doc}
		<section>
			<AuthorityList {doc} />
		</section>
		<section>
			<AuthorityForm {doc} />
		</section>
	{/if}
</article>
