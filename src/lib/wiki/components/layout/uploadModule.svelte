<script lang="ts">
	import { goto } from '$app/navigation';

	function uploadBtnClick() {
		goto('/f');
	}
</script>

<div id="upload-div">
	<button id="upload-btn" onclick={uploadBtnClick}>업로드</button>
</div>
