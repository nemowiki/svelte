<script lang="ts">
	import { Groups } from '@nemowiki/core/types';
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet NewGroupSelect()}
	<select class="new-group-select" name="new-group">
		{#each Object.values(Groups) as group, idx (idx)}
			{#if group !== Groups.Any && group !== Groups.Guest}
				<option value={group}>{group}</option>
			{/if}
		{/each}
	</select>
{/snippet}

<CommonForm formName="regroup-form">
	<div class="regroup-form-div container">
		{@render NewGroupSelect()}
		<button form="regroup-form" type="submit">변경</button>
	</div>
</CommonForm>

<style>
	.regroup-form-div {
		justify-content: flex-start;
	}
	.new-group-select {
		width: 15%;
		height: stretch;
		font-weight: bold;
		margin-right: 0.5rem;
	}
</style>
