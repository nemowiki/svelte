<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import postReq from '$lib/utils/postReq.js';
	import modifyHtmlByExistenceOfLinks from '$lib/utils/modifyHtml.js';
	import { addPopupListener, removePopupListener } from '$lib/utils/footnotePopup.js';
	import type { Doc, WikiResponse } from '@nemowiki/core/types';
	import { onNavigate } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import HtmlContent from '$lib/components/common/htmlContent.svelte';
	import CommonCaution from '$lib/components/common/commonCaution.svelte';

	let { doc }: { doc: Doc | null } = $props();

	let loading = $state<boolean>(false);
	let markup = $state<string>();
	let comment = $state<string>('');
	let previewHTML = $state<string>('');
	let errorMsg = $state<string>('');

	async function previewDoc() {

		if (doc !== null) doc.markup = markup || '';

		const res = (await postReq('/api/preview', {
			doc
		})) as WikiResponse<string>;
		if (res.ok) {
			previewHTML = modifyHtmlByExistenceOfLinks(res.value, JSON.parse(page.data.fullTitles));
		} else alert(res.reason);
	}

	$effect(() => {
		markup = markup === undefined ? doc?.markup || '' : markup;
	});

	$effect(() => {
		removePopupListener();
		previewHTML;
		addPopupListener();
	})

	onNavigate(() => {
		previewHTML = '';
	});

	function formHandle() {
		loading = true;
		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			if (result.type !== 'failure') {
				await update();
				errorMsg = '';
			} else {
				errorMsg = result.data?.message || '알 수 없는 오류가 발생했습니다.';
			}
			loading = false;
		};
	}
</script>

{#snippet ContentTextarea()}
	<!-- svelte-ignore a11y_autofocus -->
	<textarea
		id="content-textarea"
		contenteditable="true"
		bind:value={markup}
		autofocus
		name="markup"
		disabled={loading}
	></textarea>
{/snippet}

{#snippet CommentInput()}
	<input
		id="comment-input"
		placeholder="comment"
		bind:value={comment}
		name="comment"
		disabled={loading}
	/>
{/snippet}

{#snippet PreviewBtn()}
	<button id="preview-btn" type="button" onclick={previewDoc}>미리보기</button>
{/snippet}

{#snippet SubmitBtn()}
	{#if !loading}
		<button class="button" id="submit-btn" type="submit" disabled={loading}>저장</button>
	{:else}
		<button class="button" type="button" disabled>저장 중...</button>
	{/if}
{/snippet}

<div id="write-form-div">
	<form method="POST" use:enhance={formHandle}>
		{@render ContentTextarea()}
		{@render CommentInput()}
		<div id="btn-div">
			{@render PreviewBtn()}
			{@render SubmitBtn()}
		</div>
	</form>

	{#if errorMsg}
		<CommonCaution>{errorMsg}</CommonCaution>
	{/if}
	<hr />
	<HtmlContent content={previewHTML} />
</div>

<style lang="scss">
	#content-textarea {
		width: stretch;
		height: 50vh;
		font-size: 1rem;
		padding: 0.75rem 1rem;
		resize: vertical;
	}

	#comment-input {
		width: stretch;
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
	}

	#btn-div {
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
	}

	hr {
		margin: 1rem 0;
		border: black 0.1rem solid;
	}
</style>
