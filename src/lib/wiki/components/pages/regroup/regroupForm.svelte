<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet NewGroupSelect()}
	<select id="new-group-select" name="new-group">
		<option value="user">User</option>
		<option value="manager">Manager</option>
	</select>
{/snippet}

<CommonForm formName="regroup-form">
	<div id="regroup-form-div" class="container">
		{@render NewGroupSelect()}
		<button form="regroup-form" type="submit">변경</button>
	</div>
</CommonForm>

<style lang="scss">
	#regroup-form-div {
		justify-content: flex-start;

		#new-group-select {
			width: 15%;
			height: stretch;
			padding: 0.25rem 0.5rem;
			font-weight: bold;
			margin-right: 0.5rem;
		}
	}
</style>
