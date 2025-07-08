<script lang="ts">
	import { docActionArr, parseDateTime, translatedDocActionArr } from '$lib/utils/general.js';
	import { type DocAction, type DocLogDoc } from '@nemowiki/core/types';

	import { encodeFullTitle } from '@nemowiki/core/client';

	let { logArr, pageType }: { logArr: DocLogDoc[]; pageType: 'user' | 'hist' } = $props();

	function createDeltaSpan(delta: number): string {
		if (delta > 0) {
			return `<span style="color: green">+${delta}</span>`;
		} else if (delta < 0) {
			return `<span style="color: red">${delta}</span>`;
		} else {
			return `<span>${delta}</span>`;
		}
	}
</script>

{#snippet LogAction(action: DocAction)}
	<span class="doc-action-span">
		[{translatedDocActionArr[docActionArr.indexOf(action)]}]
	</span>
{/snippet}

{#snippet LogTitle(log: DocLogDoc)}
	<a href="/r/{encodeFullTitle(log.fullTitle)}?rev={log.revision}">
		{#if pageType === 'user'}
			{log.fullTitle}(r{log.revision})
		{:else if pageType === 'hist'}
			{log.revision}번째 수정판
		{/if}
	</a>
{/snippet}

{#snippet LogDelta(log: DocLogDoc)}
	{#if ['create', 'edit', 'delete'].includes(log.action)}
		(<a href="/c/{encodeFullTitle(log.fullTitle)}?old={log.revision - 1}&new={log.revision}">비교</a
		>|{@html createDeltaSpan(log.delta)})
	{/if}
{/snippet}

{#snippet LogDate(time: Date)}
	<span> {parseDateTime(time)}</span>
{/snippet}

{#snippet LogDiv(log: DocLogDoc)}
	<div class="log-div">
		<span>
			{@render LogAction(log.action)}
			{@render LogTitle(log)}
			{@render LogDelta(log)}
		</span>
		{#if pageType === 'hist'}
			<a href="/u/{encodeFullTitle(log.userName)}">{log.userName}</a>
		{/if}
		{@render LogDate(log.time)}
	</div>
{/snippet}

{#snippet CommentDiv(comment: string, systemLog: string)}
	<div class="comment-div">
		{#if comment !== '' && systemLog !== ''}
			<p>↳(<b>{systemLog}</b> | {@html comment})</p>
		{:else if comment !== '' && systemLog === ''}
			<p>↳({@html comment})</p>
		{:else if systemLog !== ''}
			<p>↳(<b>{systemLog}</b>)</p>
		{/if}
	</div>
{/snippet}

{#each logArr as log (log._id)}
	{@render LogDiv(log)}
	{@render CommentDiv(log.comment, log.systemLog)}
{/each}

<style lang="scss">
	.log-div {
		display: flex;
		justify-content: space-between;
	}

	.comment-div {
		justify-content: center !important;
		color: grey;
	}

	.doc-action-span {
		font-weight: bold;
	}
</style>
