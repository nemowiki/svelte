<script lang="ts">
	import { page } from '$app/state';
	import { signOut } from '@auth/sveltekit/client';
	import type { User } from '@nemowiki/core/types';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import LogOut from '@lucide/svelte/icons/log-out';

	let user: User | null = $derived(JSON.parse(page.data.user || null));
</script>

{#snippet GuestProfile()}
	<h2>GUEST</h2>
	<hr />
	<p>로그인 필요</p>
{/snippet}

{#snippet UserProfile(user: User)}
	<h2 class="container">
		<a href="/u/{encodeFullTitle(user.name)}">{user.name}</a>
	</h2>
	<hr />
	<div>
		<p>권한 등급: {user.group}</p>
		<p>기여 수: {user.contribCnt}</p>
	</div>
	<hr />
	<button id="logout-btn" class="container" onclick={() => signOut()}
		><LogOut size="1rem" color="red" /><span>&nbsp;로그아웃</span></button
	>
{/snippet}

<!-- <section class="container"> -->
<section class="module">
	{#if user === null}
		{@render GuestProfile()}
	{:else}
		{@render UserProfile(user)}
	{/if}
</section>

<style lang="scss">
	hr {
		margin: 0.25rem 0;
		border: gray 0.05em solid;
	}

	section {
		margin-left: 0;
		min-width: 15vw;
		width: 15vw;
		padding: 1rem;

		flex-direction: column;
		font-weight: bold;

		p:first-child {
			text-align: center;
			margin-top: 0.5rem;
		}
		p:last-child {
			text-align: center;
			margin-bottom: 0.5rem;
		}
	}

	h2 {
		text-align: center;
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	#logout-btn {
		border: none;
		padding: 0.25rem;
		margin-top: 0.5rem;
		width: stretch;
	}
</style>
