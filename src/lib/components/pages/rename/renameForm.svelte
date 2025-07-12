<script lang="ts">
	import CommonCaution from '$lib/components/common/commonCaution.svelte';
	import CommonForm from '$lib/components/common/commonForm.svelte';
</script>

{#snippet NewNameInput()}
	<input id="new-name-input" placeholder="변경할 이름을 입력하세요." name="new-name" />
{/snippet}

<CommonForm btnName="변경">
	<CommonCaution>변경 시 30일 동안 재변경이 불가합니다.</CommonCaution>
	{@render NewNameInput()}
</CommonForm>

<style lang="scss">
</style>
