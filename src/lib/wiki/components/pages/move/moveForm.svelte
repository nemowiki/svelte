<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet NewFullTitleInput()}
	<input
		id="new-full-title-input"
		placeholder="이동할 문서의 전체 제목을 입력해 주세요."
		name="new-full-title"
	/>
{/snippet}

{#snippet CommentInput()}
	<input id="comment-input" placeholder="이동하는 이유를 입력해 주세요." name="comment" />
{/snippet}

<CommonForm btnName="이동">
	{@render NewFullTitleInput()}
	{@render CommentInput()}
</CommonForm>

<style lang="scss">
	#comment-input {
		width: stretch;
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
	}

	#new-full-title-input {
		width: stretch;
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
	}
</style>
