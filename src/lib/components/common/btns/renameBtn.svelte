<script lang="ts">
	import postReq from '$lib/utils/postReq.js';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { fullTitle }: { fullTitle: string } = $props();

	let queriedUserName = $derived<string>(fullTitle.split(':').slice(1).join(':'));
	let userName = $derived(JSON.parse(page.data.user).name);

	async function renameUser(): Promise<void> {
		const name = prompt('새로운 이름을 입력하세요.');
		if (!name) return;

		if (!confirm('변경할 시 30일동안 재변경이 불가합니다.')) return;

		const res = await postReq('/api/rename', { queriedUserName, name });

		if (res.ok) {
			alert('정상적으로 처리되었습니다.');
			goto('/u/' + encodeFullTitle(name));
		} else {
			alert(res.reason);
		}
	}
</script>

{#if userName === queriedUserName}
	<button onclick={renameUser}>이름 변경</button>
{/if}
