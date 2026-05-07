<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';
	import { docActions, parseDateTime, translatedDocActions } from '$lib/wiki/utils/general.js';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { DocActions, DocStates } from '@nemowiki/core/types';
	import { type DocAction, type HistorySummary } from '@nemowiki/core/types';

	let {
		historySummaries,
		pageType
	}: { historySummaries: HistorySummary[]; pageType: 'user' | 'history' } = $props();

	function getSystemLog(historySummary: HistorySummary): string {
		if (historySummary.action === DocActions.Move) {
			const meta = historySummary.meta;
			return `${meta.prevTitle} -> ${meta.nextTitle}`;
		} else if (historySummary.action === DocActions.Grant) {
			const meta = historySummary.meta;
			return `${meta.targetAction} 권한 변경`;
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
		<span style="color: green">+{delta}</span>
	{:else if delta < 0}
		<span style="color: red">{delta}</span>
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

{#snippet HistorySummaryDate(time: Date)}
	<span> {parseDateTime(time)}</span>
{/snippet}

{#snippet HistorySummaryDiv(historySummary: HistorySummary)}
	<div class="log-div">
		<span>
			{@render HistorySummaryAction(historySummary.action as DocAction)}
			{@render HistorySummaryTitle(historySummary)}
			{@render HistorySummaryDelta(historySummary)}
		</span>
		{#if pageType === 'history'}
			<a href="/u/{encodeFullTitle(historySummary.userName)}">{historySummary.userName}</a>
		{/if}
		{@render HistorySummaryDate(historySummary.createdAt)}
	</div>
{/snippet}

{#snippet CommentDiv(comment: string, systemLog: string)}
	<div class="comment-div">
		{#if comment !== '' && systemLog !== ''}
			<!-- eslint-disable svelte/no-at-html-tags -->
			<p>(<b>{systemLog}</b> | {@html DOMPurify.sanitize(comment)})</p>
		{:else if comment !== '' && systemLog === ''}
			<!-- eslint-disable svelte/no-at-html-tags -->
			<p>({@html DOMPurify.sanitize(comment)})</p>
		{:else if systemLog !== ''}
			<p>(<b>{systemLog}</b>)</p>
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
	}

	.comment-div {
		justify-content: center !important;
		color: grey;
	}

	.doc-action-span {
		font-weight: bold;
	}
</style>
