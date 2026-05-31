<script lang="ts">
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { DocPrefixes } from '@nemowiki/core/types';
	import ShieldOff from '@lucide/svelte/icons/shield-off';
</script>

<svelte:head>
	<title>차단됨</title>
</svelte:head>

<section class="blocked-page">
	<div class="icon-wrap">
		<ShieldOff size="2.4rem" />
	</div>
	<h1>접근이 차단되었습니다</h1>
	<p>현재 계정은 차단 상태라서 문서 작성, 수정, 이동, 삭제 작업을 할 수 없습니다.</p>
	<p>읽기 전용 페이지는 계속 볼 수 있습니다.</p>
	<a class="home-link" href="/r/{encodeFullTitle(DocPrefixes.Wiki + ':대문')}">대문으로 이동</a>
</section>

<style>
	.blocked-page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem 1.6rem;
	}

	.icon-wrap {
		color: var(--color-error);
	}

	h1 {
		font-size: var(--font-xl);
		color: var(--color-error);
		padding-bottom: 0.8rem;
		border-bottom: 0.1rem solid var(--color-line);
	}

	p {
		color: var(--color-sub);
		font-size: var(--font-sm);
	}

	.home-link {
		display: inline-flex;
		padding: 0.4rem 1.2rem;
		border-radius: 2rem;
		background-color: var(--color-primary-3);
		border: 0.1rem solid var(--color-primary-2);
		color: var(--color-primary-1);
		font-size: var(--font-sm);
		margin-top: 0.4rem;
		transition:
			background-color 0.2s,
			color 0.2s;
	}
	.home-link:hover {
		background-color: var(--color-primary-2);
		color: white;
		text-decoration: none;
	}
</style>
