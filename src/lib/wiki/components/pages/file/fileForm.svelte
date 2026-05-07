<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';

	let { initial_markup } = $props();

	let markup = $state<string>(initial_markup);
</script>

{#snippet FileInput()}
	<input type="file" class="file-input" name="file" />
{/snippet}

{#snippet TitleInput()}
	<input class="title-input" placeholder="파일 문서의 제목을 입력해 주세요." name="title" />
{/snippet}

{#snippet ContentTextarea()}
	<!-- svelte-ignore a11y_autofocus -->
	<textarea class="doc-markup" contenteditable="true" bind:value={markup} autofocus name="markup"
	></textarea>
{/snippet}

{#snippet CommentInput()}
	<input class="comment-input" placeholder="간단한 설명을 입력해 주세요." name="comment" />
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

<style lang="scss">
	@use '../../../style/pages/file/fileForm.scss';
</style>
