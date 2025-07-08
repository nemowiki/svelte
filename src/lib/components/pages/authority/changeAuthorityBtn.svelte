<script lang="ts">
	import postReq from '$lib/utils/postReq.js';
	import type { DocAction, Group, Info } from '@nemowiki/core/types';
	import { canChangeAuthority } from '@nemowiki/core/client';
	import { page } from '$app/state';

	const fullTitle = $derived<string>(page.params.fullTitle);

	let { docAction, info }: { docAction: DocAction; info: Info } = $props();

	async function reauthorizeDoc(): Promise<void> {
		const groupPrompt = prompt(docAction + '을(를) 허용할 권한들을 쉼표로 구분하여 입력하세요.');

		if (groupPrompt === null) return;

		const newGroupArr = groupPrompt.trim().split(/ *, */) as Group[];

		const res_authority = canChangeAuthority(info, newGroupArr, JSON.parse(page.data.user).group);

		if (!res_authority.ok) {
			alert(res_authority.reason);
			return;
		}

		const res = await postReq('/api/authority', {
			fullTitle,
			action: docAction,
			groupArr: newGroupArr
		});

		if (res.ok) alert('정상적으로 처리되었습니다.');
		else alert(res.reason);
	}
</script>

<button onclick={reauthorizeDoc}>변경</button>

<style lang="scss">
	button {
		padding: 0.1rem 0.5rem;
		font-size: 0.7rem;
	}
</style>
