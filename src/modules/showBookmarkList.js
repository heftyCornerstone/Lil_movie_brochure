import { paintHomeView } from "./paintHomeView.js";
import { paintMovieListView } from "./paintMovieListView.js";

const bookMarksBtn = document.querySelector('#bookMarksBtn');

//로컬스토리지에서 북마크 얻어오기 --이거 모달에서 가져온건데. 반복되는데...
function bookmarkParser(){
    const rawBookmarks = localStorage.getItem('bookmarks');
    const parsed = (rawBookmarks) ? JSON.parse(rawBookmarks) : null;
    const bookmarkSet = new Set(parsed);
  
    return bookmarkSet
}

//북마크 보기 / 홈으로 가기 토글 버튼   ...버튼 글자는 아이콘으로 바꾸자
function showBookmarkList(){
    const isMovieListView = bookMarksBtn.classList.contains('goBack');

    if(isMovieListView){
        bookMarksBtn.innerHTML = "북마크"
        paintHomeView();
    } else {
        const bookmarks = bookmarkParser();

        bookMarksBtn.innerHTML = "돌아가기";
        paintMovieListView(bookmarks);
    }
    bookMarksBtn.classList.toggle('goBack');
}

export {showBookmarkList}