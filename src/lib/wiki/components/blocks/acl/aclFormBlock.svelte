<script lang="ts">
	import type { Doc } from '@nemowiki/core/types';
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';

	let { doc }: { doc: Doc } = $props();
</script>

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

{#snippet GroupInput()}
	<input
		class="group-input"
		name="group"
		placeholder="허용할 권한 대상을 쉼표로 구분해 입력하세요"
		autocomplete="off"
	/>
{/snippet}

{#if doc.permissions.canGrant}
	<CommonForm formName="acl-form">
		<div class="acl-form-div container">
			{@render DocActionSelect()}
			{@render GroupInput()}
			<button form="acl-form" type="submit">적용</button>
		</div>
	</CommonForm>
{/if}

<style>
	.acl-form-div {
		margin-top: 1rem;
		justify-content: space-between;
	}
	.doc-action-select {
		width: 10%;
		height: stretch;
		font-weight: bold;
		margin-right: 0.5rem;
	}
	.group-input {
		height: stretch;
		width: 75%;
	}
</style>
