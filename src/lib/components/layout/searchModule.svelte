<script lang="ts">
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import HangulSearcher from 'hangul-searcher';
	import { encodeFullTitle } from '@nemowiki/core/client';

	let searchWord = $state<string>('');

	let fullTitleArr = $derived<string[]>(JSON.parse(page.data.fullTitles));

	let hangulSearcher = $derived(new HangulSearcher(fullTitleArr));

	let suggestionArr = $state<any[]>([]);

	function suggest(title: string): void {
		suggestionArr = hangulSearcher.autoComplete(title);
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
				suggestionArr = [];
			}
		} else {
			suggestionArr = [];
		}
	}

	onNavigate(() => {
		suggestionArr = [];
	});
</script>

{#snippet SearchInput()}
	<input
		id="keyword-input"
		type="text"
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
	<button onclick={() => search(searchWord)}>검색</button>
{/snippet}

{#snippet SuggestionBtn(suggestion: string, i: number)}
	<button onclick={() => readDoc(suggestion)} class="suggestion-btn" style="top: {(i + 1) * 3}rem">
		{suggestion}</button
	>
{/snippet}

<div id="search-div">
	{#if page.data.user}
		{@render SearchInput()}
		{@render SearchButton()}

		{#each suggestionArr as suggestion, i}
			{#if i <= 8}
				{@render SuggestionBtn(suggestion, i)}
			{/if}
		{/each}
	{/if}
</div>

<style lang="scss">
	#search-div {
		position: relative;
		display: flex;
		z-index: 999;
		margin-left: 2rem;
	}

	#keyword-input {
		font-size: 1.2rem;
		padding: 0.2rem 0.6rem;
		width: 20rem;
	}

	.suggestion-btn {
		position: absolute;
		height: 3rem;
		padding: 0.5rem 1rem;
		font-size: 1.2rem;
		word-break: keep-all;
		white-space: nowrap;
	}
</style>
