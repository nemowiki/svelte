<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import WritePageTemplate from '$lib/wiki/components/templates/writePageTemplate.svelte';

	let { data } = $props();
	let doc = $derived<Doc | null>(JSON.parse(data?.doc || 'null'));
</script>

<WritePageTemplate {doc} />
