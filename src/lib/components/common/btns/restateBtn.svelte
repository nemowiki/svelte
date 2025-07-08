<script lang="ts">
	import { goto } from '$app/navigation';
	import postReq from '$lib/utils/postReq.js';
	import { page } from '$app/state';
	import { type Info, type Group } from '@nemowiki/core/types';
	import { encodeFullTitle, canShow, canHide } from '@nemowiki/core/client';

	let { info }: { info: Info | null } = $props();

	const fullTitle = $derived(page.params.fullTitle);

	let userGroup: Group = $derived(JSON.parse(page.data.user).group);

	async function showDoc(): Promise<void> {
		if (!info) return;

		if (!confirm('이 문서를 숨김 해제 하시겠습니까?')) return;

		const res_show = canShow(info, userGroup);
		if (!res_show.ok) {
			alert(res_show.reason);
			return;
		}

		const comment = prompt('이유를 간략하게 입력해 주세요.') || '';

		const res = await postReq('/api/show', { fullTitle, comment });
		if (res.ok) {
			alert('정상적으로 처리되었습니다.');
			goto('/a/' + encodeFullTitle(fullTitle));
		} else {
			alert(res.reason);
		}
	}

	async function hideDoc(): Promise<void> {
		if (!info) return;

		if (!confirm('이 문서를 숨기시겠습니까?')) return;

		const res_hide = canHide(info, userGroup);
		if (!res_hide.ok) {
			alert(res_hide.reason);
			return;
		}

		const comment = prompt('이유를 간략하게 입력해 주세요.') || '';

		const res = await postReq('/api/hide', { fullTitle, comment });
		if (res.ok) {
			alert('정상적으로 처리되었습니다.');
			goto('/a/' + encodeFullTitle(fullTitle));
		} else {
			alert(res.reason);
		}
	}
</script>

{#if info && info.authority['change_state']?.includes(userGroup)}
	{#if info.state === 'hidden'}
		<button onclick={showDoc}>숨김 해제</button>
	{:else}
		<button onclick={hideDoc}>숨김</button>
	{/if}
{/if}

<style lang="scss">
	button {
		background-color: rgb(255, 220, 220);
	}

	button:hover {
		background-color: rgb(255, 200, 200);
	}
</style>
