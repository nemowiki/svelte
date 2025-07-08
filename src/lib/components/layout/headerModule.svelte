<script lang="ts">
	import SearchModule from './searchModule.svelte';
	import UploadModule from './uploadModule.svelte';
</script>

<header>
	<h1><a href="/" style:font-weight="bold"><span>WIKI</span></a></h1>
	<SearchModule />
	<UploadModule />
</header>

<style lang="scss">
	header {
		position: relative;
		padding: 0.3rem;
		right: 0rem;
		display: flex;
		width: stretch;
		background-color: white;
		top: 0rem;
		border-bottom: 0.2rem solid black;

		a {
			font-size: 1.6rem;
			margin-top: 0.4rem;
			margin-left: 0.6rem;
			// color: black;
		}

		a:hover {
			text-decoration: none;
		}
	}
</style>
