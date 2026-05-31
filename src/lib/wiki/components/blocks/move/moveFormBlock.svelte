<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet NewFullTitleInput()}
	<label for="new-full-title-input"><h3>이동할 전체 제목</h3></label>
	<input
		id="new-full-title-input"
		class="new-full-title-input"
		placeholder="새 문서의 전체 제목을 입력해 주세요"
		name="new-full-title"
	/>
{/snippet}

{#snippet CommentInput()}
	<label for="comment-input"><h3>이동 이유</h3></label>
	<input
		id="comment-input"
		class="comment-input"
		placeholder="이동하는 이유를 입력해 주세요"
		name="comment"
		autocomplete="off"
	/>
{/snippet}

<CommonForm formName="move-form">
	<div class="move-form-div">
		{@render NewFullTitleInput()}
		{@render CommentInput()}
		<button form="move-form" type="submit" class="primary-btn">이동</button>
	</div>
</CommonForm>

<style>
	.move-form-div {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.move-form-div label {
		margin-top: 0.8rem;
	}

	.move-form-div button {
		align-self: flex-start;
		margin-top: 0.4rem;
	}

	.comment-input,
	.new-full-title-input {
		width: 100%;
	}
</style>
