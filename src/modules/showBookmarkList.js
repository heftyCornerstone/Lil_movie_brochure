import { paintHomeView } from "./paintHomeView.js";
import { paintMovieListView } from "./paintMovieListView.js";

const bookMarksBtn = document.querySelector('#bookMarksBtn');
const modalBookmarkBtn = document.querySelector('#modalBookmarkBtn');

//로컬스토리지에서 북마크 얻어오기
function bookmarkParser(){
    const rawBookmarks = localStorage.getItem('bookmarks');
    const parsed = (rawBookmarks) ? JSON.parse(rawBookmarks) : null;
    const bookmarkSet = new Set(parsed);
  
    return bookmarkSet
}

  //북마크 삭제와 추가 로직
function handleBookmarkData(e){
    const movieId = e.target.closest('.modal').getAttribute('id');
    //const movieTitle = e.target.closest('.modal_inner').querySelector('.modalInfo_head_title h2').innerHTML
    const bookmarkSet = bookmarkParser();
    const isBookmarked = (bookmarkSet) ? bookmarkSet.has(movieId) : null;
    let bookmarkString = '[]';
    
    (isBookmarked) ? bookmarkSet.delete(movieId) : bookmarkSet.add(movieId);

    bookmarkString = JSON.stringify([...bookmarkSet]);
    localStorage.setItem('bookmarks', bookmarkString);

    modalBookmarkBtn.innerHTML = (isBookmarked) ? '북마크 추가하기' : '북마크 삭제하기';
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

export {bookmarkParser, handleBookmarkData, showBookmarkList}