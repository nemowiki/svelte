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
	<textarea
		class="doc-markup editor-area"
		contenteditable="true"
		bind:value={markup}
		autofocus
		name="markup"
	></textarea>
{/snippet}

{#snippet CommentInput()}
	<input class="comment-input" placeholder="간단한 설명을 입력해 주세요" name="comment" />
{/snippet}

<CommonForm formName="file-form" isFile>
	<div class="form-col editor-box">
		{@render FileInput()}
		{@render TitleInput()}
		{@render ContentTextarea()}
		{@render CommentInput()}
		<button form="file-form" type="submit" class="primary-btn">업로드</button>
	</div>
</CommonForm>

<style>
	.doc-markup {
		font-family: 'NanumGothic', sans-serif;
	}
</style>
