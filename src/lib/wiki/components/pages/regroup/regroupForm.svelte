<script lang="ts">
	import CommonForm from '$lib/wiki/components/common/commonForm.svelte';
</script>

{#snippet NewGroupInput()}
	<input id="new-group-input" placeholder="변경할 그룹을 입력하세요." name="new-group" />
{/snippet}

<CommonForm btnName="변경">
	{@render NewGroupInput()}
</CommonForm>

<style lang="scss">
</style>
