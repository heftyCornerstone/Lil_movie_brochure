import { getMovieById } from "./getTmdbData.js";
import { paintHomeView } from "./paintHomeView.js";
import { paintMovieListView } from "./paintMovieListView.js";

const bookMarkBtn = document.querySelector('#bookMarkBtn');
const modalBookmarkBtn = document.querySelector('#modalBookmarkBtn');
const movieSearchbar = document.querySelector('#movieSearchbar');

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

function bookmarkbBtnToggle(option){
    if(option === 'goBack'){
        bookMarkBtn.innerHTML = "🏠돌아가기";
        bookMarkBtn.classList.add('goBack');
        return
    }
    if(option === 'toBookmark'){
        bookMarkBtn.innerHTML = "📕북마크"
        bookMarkBtn.classList.remove('goBack');
        return
    }
    console.error(`${option} is invalid option!`);
}

async function bookMarkScreenToggle(){
    const isMovieListView = bookMarkBtn.classList.contains('goBack');

    if(isMovieListView){
        await paintHomeView();
        bookmarkbBtnToggle('toBookmark');
    } else {
        const bookmarksArr = [...bookmarkParser()];
        const movieData = [];

        for(const movieId of bookmarksArr){
            const curMovieData = await getMovieById(movieId);
            movieData.push(curMovieData);
        }

        paintMovieListView(movieData);
        bookmarkbBtnToggle('goBack');
    }

    movieSearchbar.value = '';
}

export {bookmarkParser, handleBookmarkData, bookmarkbBtnToggle, bookMarkScreenToggle}