<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import WriteHeader from '$lib/components/pages/write/writeHeader.svelte';
	import WriteForm from '$lib/components/pages/write/writeForm.svelte';

	let { data } = $props();

	let fullTitle = $derived<string>(data.fullTitle as string);
	let doc = $derived<Doc | null>(JSON.parse(data.doc || 'null'));
</script>

<WriteHeader {fullTitle} info={doc} />
<WriteForm {doc} />
