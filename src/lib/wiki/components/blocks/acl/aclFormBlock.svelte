<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';

	let { doc }: { doc: Doc } = $props();
</script>

{#snippet ChangeSelect()}
	<select class="change-select" name="change">
		<option value="added">추가</option>
		<option value="removed">제거</option>
	</select>
{/snippet}

{#snippet DocActionSelect()}
	<select class="doc-action-select" name="doc-action">
		<option value="read">읽기</option>
		<option value="create">생성</option>
		<option value="edit">편집</option>
		<option value="move">이동</option>
		<option value="delete">삭제</option>
		<option value="grant">권한</option>
		<option value="toggle">상태</option>
	</select>
{/snippet}

{#snippet IdInput()}
	<input
		class="id-input"
		name="id"
		placeholder="허용할 권한 대상을 입력하세요. (예: group:manager, user:abc123)"
		autocomplete="off"
	/>
{/snippet}

{#if doc.permissions.canGrant}
	<CommonForm formName="acl-form">
		<div class="acl-form-div">
			{@render ChangeSelect()}
			{@render DocActionSelect()}
			{@render IdInput()}
			<button form="acl-form" type="submit">적용</button>
		</div>
	</CommonForm>
{/if}

<style>
	.acl-form-div {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: 1rem;
	}

	.change-select,
	.doc-action-select {
		flex-shrink: 0;
		width: auto;
		min-width: 5rem;
	}

	.id-input {
		flex: 1;
		min-width: 0;
	}
</style>
