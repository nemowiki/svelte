<script lang="ts">
	import BacklinkContentBlock from '$lib/wiki/components/blocks/backlink/backlinkContentBlock.svelte';
	import BacklinkHeaderBlock from '$lib/wiki/components/blocks/backlink/backlinkHeaderBlock.svelte';

	let { html }: { html: string } = $props();
</script>

<article>
	<BacklinkHeaderBlock />
	<BacklinkContentBlock {html} />
</article>
