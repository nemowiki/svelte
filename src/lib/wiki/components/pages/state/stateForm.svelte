<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
	import { type Info } from '@nemowiki/core/types';

	let { info }: { info: Info } = $props();

	let state = $derived(info.state);
</script>

{#snippet CommentInput()}
	<input
		id="comment-input"
		placeholder="문서 상태를 변경하는 이유를 입력해 주세요."
		name="comment"
	/>
{/snippet}

{#if state === 'deleted'}
	<h3>숨김</h3>
	<CommonForm btnName="변경" actionName="hide">
		{@render CommentInput()}
	</CommonForm>
{:else if state === 'hidden'}
	<h3>숨김 해제</h3>
	<CommonForm btnName="변경" actionName="show">
		{@render CommentInput()}
	</CommonForm>
{:else}
	<p>삭제된 문서만 숨김이 가능합니다.</p>
{/if}

<style lang="scss">
	h3 {
		margin-bottom: 0.5rem;
	}

	#comment-input {
		width: stretch;
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
	}
</style>
