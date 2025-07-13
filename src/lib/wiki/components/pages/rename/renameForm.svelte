<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet NewNameInput()}
	<input
		id="new-name-input"
		placeholder="변경할 이름을 입력하세요."
		name="new-name"
		autocomplete="off"
	/>
{/snippet}

<CommonForm formName="rename-form">
	<div id="rename-form-div" class="container">
		{@render NewNameInput()}
		<button form="rename-form" type="submit">변경</button>
	</div>
</CommonForm>

<style lang="scss">
	#rename-form-div {
		justify-content: flex-start;

		#new-name-input {
			width: 50%;
			height: stretch;
			padding: 0.25rem 0.5rem;
			margin-right: 0.5rem;
		}
	}
</style>
