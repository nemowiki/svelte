<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet CommentInput()}
	<input
		class="comment-input"
		placeholder="문서를 삭제하는 이유를 입력해 주세요"
		name="comment"
		autocomplete="off"
	/>
{/snippet}

<CommonForm formName="delete-form">
	<div class="delete-form-div container">
		{@render CommentInput()}
		<button form="delete-form" type="submit" class="warn-btn">삭제</button>
	</div>
</CommonForm>

<style>
	.delete-form-div {
		justify-content: space-between;
	}
	.comment-input {
		height: stretch;
		width: 90%;
	}
</style>
