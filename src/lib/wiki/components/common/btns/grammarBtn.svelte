<script lang="ts">
	import BookText from '@lucide/svelte/icons/book-text';

	function showGrammar(): void {
		alert(`\\ 문법 취소
**굵게**
//기울임//
~~취소선~~
__밑줄__
[[링크]]
((각주))
# 제목
---- 구분선
:(순서 없는 목록)
)(번호 있는 목록):
:{순서 있는 목록
}{번호 목록}:
:[행0,0][행0,1)
][행1,0][행1,1)]:
자세한 문법은 "위키:문법" 문서를 참고하세요.`);
	}
</script>

<button class="icon-btn" onclick={showGrammar}><BookText size="0.9rem" />문법</button>
