<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet NewNameInput()}
	<input
		class="new-name-input"
		placeholder="새 사용자 이름을 입력해 주세요"
		name="new-name"
		autocomplete="off"
	/>
{/snippet}

<CommonForm formName="rename-form">
	<div class="rename-form-div container">
		{@render NewNameInput()}
		<button form="rename-form" type="submit">변경</button>
	</div>
</CommonForm>

<style>
	.rename-form-div {
		justify-content: flex-start;
	}
	.new-name-input {
		width: 50%;
		height: stretch;
		margin-right: 0.5rem;
	}
</style>
