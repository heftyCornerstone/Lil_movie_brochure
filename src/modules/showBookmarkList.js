import { getMovieById } from "./getTmdbData.js";
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

  //북마크 삭제와 추가
function handleBookmarkData(e){
    const movieId = e.target.closest('.modal').getAttribute('id');
    const bookmarkSet = bookmarkParser();
    const isBookmarked = (bookmarkSet) ? bookmarkSet.has(movieId) : null;
    let bookmarkString = '[]';
    
    (isBookmarked) ? bookmarkSet.delete(movieId) : bookmarkSet.add(movieId);

    bookmarkString = JSON.stringify([...bookmarkSet]);
    localStorage.setItem('bookmarks', bookmarkString);

    modalBookmarkBtn.innerHTML = (isBookmarked) ? '북마크 추가하기' : '북마크 삭제하기';
}

//북마크 보기 홈으로 가기 버튼 토글
async function bookMarkBtnToggle(){
    const isMovieListView = bookMarksBtn.classList.contains('goBack');

    if(isMovieListView){
        bookMarksBtn.innerHTML = "📕북마크"
        await paintHomeView();
    } else {
        const bookmarksArr = [...bookmarkParser()];
        const movieData = [];

        for(const movieId of bookmarksArr){
            const curMovieData = await getMovieById(movieId);
            movieData.push(curMovieData);
        }

        bookMarksBtn.innerHTML = "🏠돌아가기";
        paintMovieListView(movieData);
    }
    bookMarksBtn.classList.toggle('goBack');
}

export {bookmarkParser, handleBookmarkData, bookMarkBtnToggle}