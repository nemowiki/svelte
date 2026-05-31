<script lang="ts">
	import { DocStates, type Doc } from '@nemowiki/core/types';
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';

	let { doc }: { doc: Doc } = $props();
	let state = $derived(doc.state);
</script>

{#snippet CommentInput()}
	<input
		class="comment-input"
		placeholder="문서 상태를 변경하는 이유를 입력해 주세요"
		name="comment"
		autocomplete="off"
	/>
{/snippet}

{#if state === DocStates.Deleted}
	<h3>숨김</h3>
	<CommonForm formName="hide-form" actionName="hide">
		<div class="hide-form-div">
			{@render CommentInput()}
			<button form="hide-form" type="submit">변경</button>
		</div>
	</CommonForm>
{:else if state === DocStates.Hidden}
	<h3>숨김 해제</h3>
	<CommonForm formName="show-form" actionName="show">
		<div class="show-form-div">
			{@render CommentInput()}
			<button form="show-form" type="submit">변경</button>
		</div>
	</CommonForm>
{:else}
	<p>삭제된 문서만 숨김 처리가 가능합니다.</p>
{/if}

<style>
	.hide-form-div,
	.show-form-div {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.comment-input {
		flex: 1;
		min-width: 0;
	}
</style>
