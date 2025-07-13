<script lang="ts">
	import { page } from '$app/state';
	import { signOut } from '@auth/sveltekit/client';
	import type { User } from '@nemowiki/core/types';
	import { encodeFullTitle } from '@nemowiki/core/client';

	let user: User | null = $derived(JSON.parse(page.data.user || null));
</script>

{#snippet GuestProfile()}
	<h2>GUEST</h2>
	<p>Please sign in to explore the wiki</p>
{/snippet}

{#snippet UserProfile(user: User)}
	<h2><a href="/u/{encodeFullTitle(user.name)}">{user.name}</a></h2>
	<p>권한: {user.group}</p>
	<button onclick={() => signOut()}>로그아웃</button>
{/snippet}

<section>
	{#if user === null}
		{@render GuestProfile()}
	{:else}
		{@render UserProfile(user)}
	{/if}
</section>

<style lang="scss">
	h2 {
		text-align: center;
		font-size: 1.2rem;
		// font-weight: normal;
	}
</style>
