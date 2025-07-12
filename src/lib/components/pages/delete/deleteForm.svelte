<script lang="ts">
	import CommonForm from '$lib/components/common/commonForm.svelte';
	import CommonCaution from '$lib/components/common/commonCaution.svelte';
</script>

{#snippet CommentInput()}
	<input id="comment-input" placeholder="삭제하는 이유를 입력해 주세요." name="comment" />
{/snippet}

<CommonForm btnName="삭제">
	<CommonCaution>파일 문서 삭제 시, 파일도 함께 삭제됩니다.</CommonCaution>
	{@render CommentInput()}
</CommonForm>

<style lang="scss">
	#comment-input {
		width: stretch;
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
	}
</style>
