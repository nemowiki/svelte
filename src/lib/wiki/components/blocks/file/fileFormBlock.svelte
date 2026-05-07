<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';

	let { initialMarkup }: { initialMarkup: string } = $props();

	let markup = $state<string>(initialMarkup);
</script>

{#snippet FileInput()}
	<input type="file" class="file-input" name="file" />
{/snippet}

{#snippet TitleInput()}
	<input class="title-input" placeholder="파일 문서의 제목을 입력해 주세요" name="title" />
{/snippet}

{#snippet ContentTextarea()}
	<!-- svelte-ignore a11y_autofocus -->
	<textarea class="doc-markup" contenteditable="true" bind:value={markup} autofocus name="markup"
	></textarea>
{/snippet}

{#snippet CommentInput()}
	<input class="comment-input" placeholder="간단한 설명을 입력해 주세요" name="comment" />
{/snippet}

<CommonForm formName="file-form" isFile>
	<div class="file-form-div container">
		{@render FileInput()}
		{@render TitleInput()}
		{@render ContentTextarea()}
		{@render CommentInput()}
		<button form="file-form" type="submit">업로드</button>
	</div>
</CommonForm>

<style>
	.file-form-div {
		flex-direction: column;
		align-items: flex-start;
	}
	.file-form-div > * {
		margin-bottom: 0.5rem;
	}
	.doc-markup {
		width: stretch;
		height: 50vh;
		font-size: 1rem;
		padding: 0.75rem 1rem;
		resize: vertical;
	}
	.file-input,
	.comment-input,
	.title-input {
		width: stretch;
		font-size: 1rem;
		padding: 0.5rem 0.75rem;
	}
</style>
