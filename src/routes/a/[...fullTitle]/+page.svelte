<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import AclPageTemplate from '$lib/wiki/components/templates/aclPageTemplate.svelte';

	let { data } = $props();

	let doc = $derived<Doc | null>(JSON.parse(data?.doc || 'null'));
</script>

<AclPageTemplate {doc} />
