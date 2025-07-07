<script lang="ts">
	import postReq from '$lib/utils/postReq.js';
	import { page } from '$app/state';

	let { fullTitle }: { fullTitle: string } = $props();

	let queriedUserName = $derived<string>(fullTitle.split(':').slice(1).join(':'));
	let userGroup = $derived(JSON.parse(page.data.user).group);

	async function regroupUser(): Promise<void> {
		const group = prompt('새롭게 지정할 그룹 이름을 입력하세요.');
		if (!group) return;

		const res = await postReq('/api/regroup', { queriedUserName, group });

		if (res.ok) alert('정상적으로 처리되었습니다.');
		else alert(res.reason);
	}
</script>

{#if ['dev', 'manager'].includes(userGroup)}
	<button onclick={regroupUser}>권한</button>
{/if}
