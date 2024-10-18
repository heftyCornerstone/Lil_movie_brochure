import { createMovieCard } from "./createMovieCards.js";
import { searchMovieByTitle } from "./getTmdbData.js";
import { paintHomeView } from "./paintHomeView.js";

const main = document.querySelector('#main');
const bookMarksBtn = document.querySelector('#bookMarksBtn');
const movieListContents = document.querySelector('.movieListContents');

//영화 제목 어레이를 이용하여 영화 리스트 화면에 영화 카드를 채워넣는다.
async function paintMovieListView(movieTitleArr){ 
    const homeView = document.querySelector('.homeContents');
    const newMovieListContents = document.createElement('div');
    newMovieListContents.classList.add('movieListContents');
    for(let movie of movieTitleArr) {
        const rawMovieData = await searchMovieByTitle(movie); // forEach 안에서 사용하면 안됨 <!!!!!!! TIL !!!!!!!!!>
        const movieData = rawMovieData.results;
        
        movieData.forEach((searchedMovie)=>{
            const newCard = createMovieCard(searchedMovie);
            newMovieListContents.appendChild(newCard);
        })
    }
    if(homeView) main.replaceChild(newMovieListContents, homeView);
    if(movieListContents) main.replaceChild(newMovieListContents, movieListContents);
    main.appendChild(newMovieListContents);
}

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

export {paintMovieListView, showBookmarkList}
