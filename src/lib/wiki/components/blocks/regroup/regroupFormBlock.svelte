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
	<div class="form-row">
		{@render NewGroupSelect()}
		<button form="regroup-form" type="submit">변경</button>
	</div>
</CommonForm>

<style>
	.new-group-select {
		flex-shrink: 0;
		width: auto;
		min-width: 8rem;
	}
</style>
