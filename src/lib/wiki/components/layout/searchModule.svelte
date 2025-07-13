<script lang="ts">
	import { goto, onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import HangulSearcher from 'hangul-searcher';
	import { encodeFullTitle } from '@nemowiki/core/client';
	import Search from '@lucide/svelte/icons/search';

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
	<button id="search-btn" class="container" onclick={() => search(searchWord)}>
		<Search size="1.25rem" />
	</button>
{/snippet}

{#snippet SuggestionBtn(suggestion: string, i: number)}
	<button
		onclick={() => readDoc(suggestion)}
		class="suggestion-btn"
		style="top: {(i + 1) * 2.5}rem"
	>
		{suggestion}</button
	>
{/snippet}

<div id="search-div" class="container">
	{@render SearchInput()}
	{@render SearchButton()}

	{#each suggestionArr as suggestion, i (suggestion)}
		{#if i <= 8}
			{@render SuggestionBtn(suggestion, i)}
		{/if}
	{/each}
</div>

<style lang="scss">
	@mixin format {
		font-size: 1rem;
		height: 2.5rem;
		padding: 0.5rem 0.75rem;
		border: solid 0.1rem gray;
		font-weight: bold;
		text-align: left;
	}

	#search-div {
		position: relative;
		width: fit-content;
		z-index: 999;
	}

	#keyword-input {
		@include format;

		width: 15rem;
		border-right: none;

		&:focus {
			outline: none;
		}
	}

	#search-btn {
		@include format;

		border-left: none;
		width: fit-content;
	}

	.suggestion-btn {
		@include format;

		position: absolute;
		left: 0;

		width: stretch;

		border-top: none;

		word-break: keep-all;
		white-space: nowrap;
	}
</style>
