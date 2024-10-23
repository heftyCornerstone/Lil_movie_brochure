import { getMovieById } from "./getTmdbData.js";
import { paintHomeView } from "./paintHomeView.js";
import { paintMovieListView } from "./paintMovieListView.js";

const bookMarkBtn = document.querySelector('#bookMarkBtn');
const modalBookmarkBtn = document.querySelector('#modalBookmarkBtn');

function bookmarkParser(){
    const rawBookmarks = localStorage.getItem('bookmarks');
    const parsed = (rawBookmarks) ? JSON.parse(rawBookmarks) : null;
    const bookmarkSet = new Set(parsed);
  
    return bookmarkSet
}

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

function bookmarkbBtnToggle(){
    const isGoBackMode = bookMarkBtn.classList.contains('goBack');
    bookMarkBtn.innerHTML = (isGoBackMode) ? "📕북마크" : "🏠돌아가기";
    bookMarkBtn.classList.toggle('goBack');
}

async function bookMarkScreenToggle(){
    const isMovieListView = bookMarkBtn.classList.contains('goBack');

    if(isMovieListView){
        await paintHomeView();
    } else {
        const bookmarksArr = [...bookmarkParser()];
        const movieData = [];

        for(const movieId of bookmarksArr){
            const curMovieData = await getMovieById(movieId);
            movieData.push(curMovieData);
        }

        paintMovieListView(movieData);
    }

    bookmarkbBtnToggle();
}

export {bookmarkParser, handleBookmarkData, bookmarkbBtnToggle, bookMarkScreenToggle}