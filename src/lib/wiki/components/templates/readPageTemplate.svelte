<script lang="ts">
	import ReadContentBlock from '$lib/wiki/components/blocks/read/readContentBlock.svelte';
	import ReadHeaderBlock from '$lib/wiki/components/blocks/read/readHeaderBlock.svelte';
	import ReadNoticeBlock from '$lib/wiki/components/blocks/read/readNoticeBlock.svelte';
	import type { Doc } from '@nemowiki/core/types';

	let { doc, rev, from }: { doc: Doc | null; rev: number; from?: string } = $props();
</script>

<article>
	<ReadHeaderBlock revision={doc?.revision ?? 0} />
	<ReadNoticeBlock {from} {rev} fullTitle={doc?.fullTitle ?? null} />
	<ReadContentBlock html={doc?.html ?? '문서가 존재하지 않습니다.'} />
</article>
