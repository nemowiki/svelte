<script lang="ts">
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Search from '@lucide/svelte/icons/search';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import HangulSearcher from 'hangul-searcher';

	let searchWord = $state<string>('');

	let fullTitles = $derived<string[]>(page.data.fullTitles);

	let hangulSearcher = $derived(new HangulSearcher(fullTitles));

	let suggestions = $state<string[]>([]);

	function suggest(title: string): void {
		suggestions = hangulSearcher.autoComplete(title);
	}

	function checkEnter(e: KeyboardEvent): void {
		if (e.key === 'Enter') {
			search(searchWord);
		}
	}

	function search(title: string): void {
		goto(`/s/${encodeFullTitle(title)}`);
	}

	function readDoc(title: string): void {
		goto(`/r/${encodeFullTitle(title)}`);
	}

	function onBlurSearchDiv(e: FocusEvent): void {
		if (e.target !== null && e.relatedTarget instanceof HTMLElement) {
			if (e.relatedTarget.classList.contains('suggestion-btn')) {
				e.relatedTarget.click();
			} else {
				suggestions = [];
			}
		} else {
			suggestions = [];
		}
	}

	onNavigate(() => {
		suggestions = [];
		searchWord = '';
	});
</script>

{#snippet SearchInput()}
	<input
		class="keyword-input"
		type="text"
		placeholder="문서 검색"
		onfocus={() => suggest('')}
		onblur={onBlurSearchDiv}
		oninput={() => suggest(searchWord)}
		onkeydown={checkEnter}
		bind:value={searchWord}
		autocomplete="off"
		aria-label="search input"
	/>
{/snippet}

{#snippet SearchButton()}
	<button class="search-btn container" onclick={() => search(searchWord)}>
		<Search size="1.25rem" />
	</button>
{/snippet}

{#snippet SuggestionBtn(suggestion: string, i: number)}
	<button
		onclick={() => readDoc(suggestion)}
		class="suggestion-btn"
		style="top: {(i + 1) * 2.4}rem"
	>
		{suggestion}</button
	>
{/snippet}

<div class="search-div container">
	{@render SearchInput()}
	{@render SearchButton()}

	{#each suggestions as suggestion, i (suggestion)}
		{#if i <= 8}
			{@render SuggestionBtn(suggestion, i)}
		{/if}
	{/each}
</div>

<style>
	.search-div {
		position: relative;
		display: flex;
		align-items: center;
		width: 26rem;
		z-index: 999;
		border: 0.1rem solid var(--color-line);
		border-radius: 2rem;
		background-color: rgba(255, 255, 255, 0.88);
		box-shadow: 0 0.4rem 1.2rem var(--color-shadow);
	}

	.keyword-input {
		height: 2.4rem;
		padding: 0.2rem 1rem;
		border: none;
		border-radius: 0;
		background-color: transparent;
		width: 100%;
	}

	.keyword-input:focus {
		box-shadow: none;
	}

	.search-btn {
		height: 2.4rem;
		padding: 0.2rem 1rem;
		border: none;
		border-radius: 0;
		color: var(--color-primary-1);
		background-color: transparent;
	}

	.search-btn:hover {
		background-color: var(--color-primary-3);
		color: var(--color-primary-1);
	}

	.suggestion-btn {
		height: 2.4rem;
		padding: 0.2rem 1rem;
		border: 0.1rem solid var(--color-line);
		text-align: left;
		position: absolute;
		left: 0;
		width: 100%;
		border-top: 0.1rem solid var(--color-line);
		border-radius: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		box-shadow: 0 0.8rem 1.6rem var(--color-shadow);
		background-color: var(--color-panel);
		color: var(--color-text);
		font-weight: 400;
		z-index: 1000;
	}

	.suggestion-btn:first-of-type {
		border-top: 0.1rem solid var(--color-line);
	}

	.suggestion-btn:last-child {
		border-radius: 0 0 1rem 1rem;
	}

	.suggestion-btn:hover {
		background-color: var(--color-panel-soft);
		color: var(--color-primary-1);
		border-color: var(--color-primary-2);
	}
</style>
