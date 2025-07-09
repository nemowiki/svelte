<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import CommonCaution from '$lib/components/common/commonCaution.svelte';

	let { initial_markup } = $props();

	let title = $state<string>('');
	let markup = $state<string>(initial_markup);
	let comment = $state<string>('');
	let loading = $state<boolean>(false);
	let errorMsg = $state<string>('');

	function formHandle() {
		loading = true;
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
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

{#snippet FileInput()}
	<input type="file" id="file-input" name="file" disabled={loading} />
{/snippet}

{#snippet TitleInput()}
	<input id="title-input" placeholder="title" bind:value={title} name="title" disabled={loading} />
{/snippet}

{#snippet ContentTextarea()}
	<!-- svelte-ignore a11y_autofocus -->
	<textarea
		id="doc-markup"
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

{#snippet SubmitBtn()}
	<button id="save-btn" disabled={loading}>
		{#if !loading}
			업로드
		{:else}
			업로드 중...
		{/if}
	</button>
{/snippet}

<div id="file-form-div">
	<form method="POST" enctype="multipart/form-data" use:enhance={formHandle}>
		{@render FileInput()}
		{@render TitleInput()}
		{@render ContentTextarea()}
		{@render CommentInput()}
		{@render SubmitBtn()}
	</form>

	{#if errorMsg}
		<CommonCaution>{errorMsg}</CommonCaution>
	{/if}
</div>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;

		& > * {
			margin-top: 0.5rem;
		}
	}

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
