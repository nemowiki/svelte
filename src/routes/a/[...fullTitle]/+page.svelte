<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import AuthorityPageTemplate from '$lib/wiki/components/templates/authorityPageTemplate.svelte';

	let { data } = $props();

	let doc = $derived<Doc | null>(JSON.parse(data?.doc || 'null'));
</script>

<AuthorityPageTemplate {doc} />
