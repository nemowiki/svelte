<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';

	const { doc } = $props();
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
		placeholder="허용할 권한들을 쉼표로 구분하여 입력하세요."
		autocomplete="off"
	/>
{/snippet}

{#if doc.permissions.canGrant}
	<CommonForm formName="authority-form">
		<div class="authority-form-div container">
			{@render DocActionSelect()}
			{@render GroupInput()}
			<button form="authority-form" type="submit">적용</button>
		</div>
	</CommonForm>
{/if}

<style lang="scss">
	@use '../../../style/pages/authority/authorityForm.scss';
</style>
