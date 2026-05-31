<script lang="ts">
	import { page } from '$app/state';
	import { signOut } from '@auth/sveltekit/client';
	import type { User } from '@nemowiki/core/types';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import { Groups } from '@nemowiki/core/types';
	import LogOut from '@lucide/svelte/icons/log-out';
	import LogIn from '@lucide/svelte/icons/log-in';
	import { goto } from '$app/navigation';

	let user: User = $derived(page.data.user);
</script>

{#snippet GuestProfile()}
	<h2>비회원</h2>
	<button class="login-btn primary-btn container" onclick={() => goto('/signin')}>
		<LogIn size="1rem" /><span>로그인</span>
	</button>
{/snippet}

{#snippet UserProfile(user: User)}
	<h2 class="container">
		<a href="/u/{encodeFullTitle(user.name)}">{user.name}</a>
	</h2>
	<div class="user-info">
		<p><span>권한 그룹</span><span class="meta-pill">{user.group}</span></p>
		<p><span>기여 수</span><span class="meta-pill">{user.contribCnt}</span></p>
	</div>
	<button class="logout-btn container" onclick={() => signOut()}>
		<LogOut size="1rem" /><span>로그아웃</span>
	</button>
{/snippet}

<section class="module profile-module">
	{#if user.group === Groups.Guest}
		{@render GuestProfile()}
	{:else}
		{@render UserProfile(user)}
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	h2 {
		font-size: var(--font-md);
		text-align: center;
		margin-bottom: 0;
		padding-bottom: 0;
		border-bottom: none;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.user-info p {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--font-sm);
		color: var(--color-sub);
		padding: 0.2rem 0;
	}

	.login-btn,
	.logout-btn {
		justify-content: center;
		width: 100%;
		border-radius: 2rem;
	}

	.logout-btn {
		font-size: var(--font-sm);
		color: var(--color-gray-4);
		background: transparent;
		border-color: var(--color-line);
	}
</style>
