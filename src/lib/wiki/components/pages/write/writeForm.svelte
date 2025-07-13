<script lang="ts">
	import { addPopupListener, removePopupListener } from '$lib/wiki/utils/footnotePopup.js';
	import type { Doc, WikiResponse } from '@nemowiki/core/types';
	import HtmlContent from '$lib/wiki/components/common/htmlContent.svelte';
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
	import { beforeNavigate } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';

	let { doc }: { doc: Doc } = $props();

	let markup = $state<string>(doc?.markup || '');
	let previewDoc = $derived<Doc>({
		...doc,
		markup
	});
	let previewResult = $state<ActionResult<WikiResponse<string>> | null>(null);
	let saveResult = $state<ActionResult | null>(null);

	$effect(() => {
		removePopupListener();
		previewResult;
		addPopupListener();
	});

	beforeNavigate((navigation) => {
		if (saveResult?.type !== 'redirect') {
			if (confirm('저장하지 않았습니다. 정말 나가시겠습니까?')) return;
			navigation.cancel();
		}
	});
</script>

{#snippet ContentTextarea()}
	<!-- svelte-ignore a11y_autofocus -->
	<textarea id="content-textarea" contenteditable="true" bind:value={markup} autofocus name="markup"
	></textarea>
{/snippet}

{#snippet CommentInput()}
	<input id="comment-input" placeholder="comment" name="comment" />
{/snippet}

{#snippet PreviewForm()}
	<CommonForm actionName="preview" btnName="미리보기" bind:formResult={previewResult}>
		<input type="hidden" value={JSON.stringify(previewDoc)} name="doc" />
	</CommonForm>
	{#if previewResult && previewResult.type === 'success' && previewResult.data?.ok}
		<HtmlContent content={previewResult.data.value} />
	{/if}
{/snippet}

{#snippet SaveForm()}
	<CommonForm actionName="save" btnName="저장" bind:formResult={saveResult}>
		{@render ContentTextarea()}
		{@render CommentInput()}
	</CommonForm>
{/snippet}

{@render SaveForm()}
<hr />
{@render PreviewForm()}

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

	hr {
		margin: 1rem 0;
		border: black 0.1rem solid;
	}
</style>
