<script lang="ts">
	import WriteEditorBlock from '$lib/wiki/components/blocks/write/writeEditorBlock.svelte';
	import WriteHeaderBlock from '$lib/wiki/components/blocks/write/writeHeaderBlock.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { doc }: { doc: Doc | null } = $props();
</script>

<article>
	<WriteHeaderBlock revision={doc?.revision || 0} />
	<WriteEditorBlock {doc} />
</article>
