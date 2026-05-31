<script lang="ts">
	import BacklinkContentBlock from '$lib/wiki/components/blocks/backlink/backlinkContentBlock.svelte';
	import BacklinkHeaderBlock from '$lib/wiki/components/blocks/backlink/backlinkHeaderBlock.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { html, doc }: { html: string; doc: Doc | null } = $props();
</script>

<article>
	<BacklinkHeaderBlock {doc} />
	<BacklinkContentBlock {html} />
</article>
