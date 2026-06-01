<script lang="ts">
	import ReadContentBlock from '$lib/wiki/components/blocks/read/readContentBlock.svelte';
	import ReadHeaderBlock from '$lib/wiki/components/blocks/read/readHeaderBlock.svelte';
	import ReadNoticeBlock from '$lib/wiki/components/blocks/read/readNoticeBlock.svelte';
	import { DocStates, DocTypes, type Doc } from '@nemowiki/core/types';
	import CommonWarn from '../common/commonWarn.svelte';

	let { doc, rev, from }: { doc: Doc; rev: number; from?: string } = $props();
</script>

<article>
	<ReadHeaderBlock {doc} />
	<ReadNoticeBlock
		{from}
		{rev}
		fullTitle={doc.fullTitle}
		isHidden={doc.state === DocStates.Hidden}
	/>
	{#if doc.revision === 0}
		<CommonWarn>존재하지 않는 문서입니다.</CommonWarn>
	{:else if doc.state === DocStates.Deleted && doc.type !== DocTypes.Category && rev === -1}
		<CommonWarn>삭제된 문서입니다.</CommonWarn>
	{:else if doc.permissions.canRead}
		<ReadContentBlock html={doc.html} />
	{/if}
</article>
