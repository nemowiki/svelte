<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import WriteHeader from '$lib/wiki/components/pages/write/writeHeader.svelte';
	import WriteForm from '$lib/wiki/components/pages/write/writeForm.svelte';

	let { data } = $props();

	let doc = $derived<Doc | null>(JSON.parse(data?.doc || 'null'));
</script>

<article>
	<WriteHeader revision={doc?.revision || 0} />
	<WriteForm {doc} />
</article>
