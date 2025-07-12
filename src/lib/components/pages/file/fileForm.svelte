<script lang="ts">
	import CommonForm from '$lib/components/common/commonForm.svelte';

	let { initial_markup } = $props();

	let markup = $state<string>(initial_markup);
</script>

{#snippet FileInput()}
	<input type="file" id="file-input" name="file" />
{/snippet}

{#snippet TitleInput()}
	<input id="title-input" placeholder="title" name="title" />
{/snippet}

{#snippet ContentTextarea()}
	<!-- svelte-ignore a11y_autofocus -->
	<textarea id="doc-markup" contenteditable="true" bind:value={markup} autofocus name="markup"
	></textarea>
{/snippet}

{#snippet CommentInput()}
	<input id="comment-input" placeholder="comment" name="comment" />
{/snippet}

<CommonForm btnName="업로드" isFile>
	{@render FileInput()}
	{@render TitleInput()}
	{@render ContentTextarea()}
	{@render CommentInput()}
</CommonForm>

<style lang="scss">
	#doc-markup {
		width: stretch;
		height: 50vh;
		font-size: 1rem;
		padding: 0.8rem 1rem;
		resize: vertical;
	}

	#comment-input,
	#title-input {
		width: stretch;
		font-size: 0.8rem;
		padding: 0.2rem 0.5rem;
	}
</style>
