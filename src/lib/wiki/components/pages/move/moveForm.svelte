<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet NewFullTitleInput()}
	<label for="new-full-title-input"><h3>이동할 문서의 전체 제목</h3></label>
	<input
		id="new-full-title-input"
		placeholder="이동할 문서의 전체 제목을 입력해 주세요."
		name="new-full-title"
	/>
{/snippet}

{#snippet CommentInput()}
	<label for="comment-input"><h3>이동 이유</h3></label>
	<input
		id="comment-input"
		placeholder="이동하는 이유를 입력해 주세요."
		name="comment"
		autocomplete="off"
	/>
{/snippet}

<CommonForm formName="move-form">
	<div id="move-form-div" class="container">
		{@render NewFullTitleInput()}
		{@render CommentInput()}
		<button form="move-form" type="submit">이동</button>
	</div>
</CommonForm>

<style lang="scss">
	#move-form-div {
		flex-direction: column;
		align-items: flex-start;

		label {
			margin-top: 1rem;
			margin-bottom: 0.5rem;
		}

		button {
			margin-top: 1rem;
		}
	}

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
