<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import CommonError from '$lib/wiki/components/common/commonError.svelte';

	let {
		children,
		formName,
		actionName = '',
		isFile = false,
		formResult = $bindable(null)
	} = $props();

	let loading = $state<boolean>(false);
	// let comment = $state<string>('');
	let errorMsg = $state<string>('');

	function formHandle() {
		loading = true;
		return async ({ update, result }: { update: () => Promise<void>; result: ActionResult }) => {
			if (result.type === 'success' || result.type === 'redirect') {
				formResult = result;
				await update();
				errorMsg = '';
			} else if (result.type === 'failure') {
				errorMsg = result.data?.message || '알 수 없는 오류가 발생했습니다.';
			} else if (result.type === 'error') {
				errorMsg = result.error?.message || '알 수 없는 오류가 발생했습니다.';
			}
			loading = false;
		};
	}
</script>

<div id="common-form-div">
	<form
		method="POST"
		{...formName ? { id: formName } : {}}
		{...actionName ? { action: `?/${actionName}` } : {}}
		{...isFile ? { enctype: 'multipart/form-data' } : {}}
		use:enhance={formHandle}
	>
		<fieldset disabled={loading} id="common-form-content">
			{@render children()}
		</fieldset>
	</form>

	{#if errorMsg}
		<CommonError>{errorMsg}</CommonError>
	{/if}
</div>

<style lang="scss">
	fieldset {
		border: none;
	}
</style>
