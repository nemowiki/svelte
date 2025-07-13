<script lang="ts">
	let { queriedUser } = $props();
</script>

<div id="user-group-div">
	<h3>권한</h3>
	<p>권한 등급: {queriedUser.group}</p>
</div>

<style lang="scss">
	h3 {
		font-size: 2rem;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
	}
</style>
