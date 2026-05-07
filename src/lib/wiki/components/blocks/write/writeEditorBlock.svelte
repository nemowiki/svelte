<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import type { Doc } from '@nemowiki/core/types';
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
	import HtmlContent from '$lib/wiki/components/common/htmlContent.svelte';
	import { addPopupListener, removePopupListener } from '$lib/wiki/utils/footnotePopup.js';

	let { doc }: { doc: Doc | null } = $props();

	let markup = $state<string>(doc?.markup || '');
	let previewDoc = $derived<Doc>({
		...(doc as Doc),
		markup
	});
	let previewResult = $state<ActionResult<{ html: string }> | null>(null);
	let saveResult = $state<ActionResult | null>(null);

	$effect(() => {
		removePopupListener();
		void previewResult;
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
	<textarea
		class="content-textarea"
		contenteditable="true"
		bind:value={markup}
		autofocus
		name="markup"
	></textarea>
{/snippet}

{#snippet CommentInput()}
	<input
		class="comment-input"
		placeholder="편집 내용을 간단히 설명해 주세요"
		name="comment"
		autocomplete="off"
	/>
{/snippet}

{#snippet PreviewForm()}
	<CommonForm actionName="preview" formName="preview-form" bind:formResult={previewResult}>
		<input type="hidden" value={JSON.stringify(previewDoc)} name="doc" />
	</CommonForm>
{/snippet}

{#snippet SaveForm()}
	<CommonForm actionName="save" formName="save-form" bind:formResult={saveResult}>
		<div class="save-form-div container">
			{@render ContentTextarea()}
			{@render CommentInput()}
		</div>
	</CommonForm>
{/snippet}

{#snippet ButtonBar()}
	<div class="btn-div container">
		<button form="preview-form" type="submit">미리보기</button>
		<button form="save-form" type="submit">저장하기</button>
	</div>
{/snippet}

{#snippet PreviewHtml()}
	{#if previewResult && previewResult.type === 'success' && previewResult.data?.html}
		<hr />
		<HtmlContent content={previewResult.data.html} />
	{/if}
{/snippet}

<div>
	{@render SaveForm()}
	{@render PreviewForm()}
	{@render ButtonBar()}
	{@render PreviewHtml()}
</div>

<style lang="scss">
	@use '../../../style/pages/write/writeForm.scss';
</style>
