<script lang="ts">
	import FileFormBlock from '$lib/wiki/components/blocks/file/fileFormBlock.svelte';
	import FileHeaderBlock from '$lib/wiki/components/blocks/file/fileHeaderBlock.svelte';

	let { boilerplate }: { boilerplate: string } = $props();
</script>

<article>
	<FileHeaderBlock />
	<FileFormBlock initialMarkup={boilerplate} />
</article>
