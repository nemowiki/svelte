<script lang="ts">
	import { docActions, parseDateTime, translatedDocActions } from '$lib/wiki/utils/general.js';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { DocActions, DocStates, type DocAction, type HistorySummary } from '@nemowiki/core/types';
	import DOMPurify from 'isomorphic-dompurify';

	let {
		historySummaries,
		pageType
	}: { historySummaries: HistorySummary[]; pageType: 'user' | 'history' } = $props();

	function getSystemLog(historySummary: HistorySummary): string {
		if (historySummary.action === DocActions.Move) {
			const meta = historySummary.meta;
			return `${meta.prevTitle} → ${meta.nextTitle}`;
		} else if (historySummary.action === DocActions.Grant) {
			const meta = historySummary.meta;
			return `${meta.acl.action} 권한 변경`;
		} else if (historySummary.action === DocActions.Toggle) {
			const meta = historySummary.meta;
			return meta.nextState === DocStates.Hidden ? '숨김' : '숨김 해제';
		}
		return '';
	}

	function isContentAction(action: DocAction): boolean {
		return [DocActions.Create, DocActions.Edit, DocActions.Delete].some(
			(candidate) => candidate === action
		);
	}
</script>

{#snippet HistorySummaryAction(action: DocAction)}
	<span class="doc-action-span">
		[{translatedDocActions[docActions.indexOf(action)]}]
	</span>
{/snippet}

{#snippet HistorySummaryTitle(historySummary: HistorySummary)}
	{#if isContentAction(historySummary.action)}
		<a href="/r/{encodeFullTitle(historySummary.fullTitle)}?rev={historySummary.revision}">
			{#if pageType === 'user'}
				{historySummary.fullTitle}(r{historySummary.revision})
			{:else if pageType === 'history'}
				{historySummary.revision}번째 수정판
			{/if}
		</a>
	{:else}
		<span>
			{#if pageType === 'user'}
				{historySummary.fullTitle}(r{historySummary.revision})
			{:else if pageType === 'history'}
				{historySummary.revision}번째 수정판
			{/if}
		</span>
	{/if}
{/snippet}

{#snippet HistorySummaryDeltaSpan(delta: number)}
	{#if delta > 0}
		<span class="pos">+{delta}</span>
	{:else if delta < 0}
		<span class="neg">{delta}</span>
	{:else}
		<span>{delta}</span>
	{/if}
{/snippet}

{#snippet HistorySummaryDelta(historySummary: HistorySummary)}
	{#if isContentAction(historySummary.action)}
		<span>
			(<a
				href="/c/{encodeFullTitle(historySummary.fullTitle)}?old={historySummary.revision -
					1}&new={historySummary.revision}">비교</a
			>|{@render HistorySummaryDeltaSpan(historySummary.diffSize)})
		</span>
	{/if}
{/snippet}

{#snippet HistorySummaryDate(time: string)}
	<span> {parseDateTime(time)}</span>
{/snippet}

{#snippet HistorySummaryDiv(historySummary: HistorySummary)}
	<div class="log-div">
		<span class="log-main">
			{@render HistorySummaryAction(historySummary.action as DocAction)}
			{@render HistorySummaryTitle(historySummary)}
			{@render HistorySummaryDelta(historySummary)}
		</span>
		{#if pageType === 'history'}
			<a class="log-user" href="/u/{encodeFullTitle(historySummary.userName)}"
				>{historySummary.userName}</a
			>
		{/if}
		<span class="log-date">{@render HistorySummaryDate(historySummary.createdAt)}</span>
	</div>
{/snippet}

{#snippet CommentDiv(comment: string, systemLog: string)}
	<div class="comment-div">
		{#if comment !== '' && systemLog !== ''}
			<!-- eslint-disable svelte/no-at-html-tags -->
			<p>↳(<b>{systemLog}</b> | {@html DOMPurify.sanitize(comment)})</p>
		{:else if comment !== '' && systemLog === ''}
			<!-- eslint-disable svelte/no-at-html-tags -->
			<p>↳({@html DOMPurify.sanitize(comment)})</p>
		{:else if systemLog !== ''}
			<p>↳(<b>{systemLog}</b>)</p>
		{/if}
	</div>
{/snippet}

{#each historySummaries as historySummary (historySummary._id)}
	{@render HistorySummaryDiv(historySummary)}
	{@render CommentDiv(historySummary.comment, getSystemLog(historySummary))}
{/each}

<style lang="scss">
	.log-div {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.8rem;
		padding: 0.4rem 0.2rem;
		border-bottom: 0.1rem solid var(--color-gray-2);
		border-radius: 0.6rem;
		font-size: var(--font-sm);
		flex-wrap: wrap;
		&:hover {
			background-color: var(--color-panel-soft);
		}
		&:last-of-type {
			border-bottom: none;
		}
	}

	.log-main {
		min-width: 0;
		flex: 1;
	}

	.log-user,
	.log-date {
		white-space: nowrap;
	}

	.log-date {
		color: var(--color-gray-4);
	}

	.comment-div {
		color: var(--color-sub);
		font-size: var(--font-sm);
		padding: 0.1rem 0.2rem 0.4rem 1rem;
	}

	.doc-action-span {
		font-weight: 700;
		color: var(--color-primary-1);
	}

	.pos {
		color: var(--color-success);
		font-weight: 700;
	}
	.neg {
		color: var(--color-error);
		font-weight: 700;
	}
</style>
