import { getMovieByTitle } from "./getTmdbData.js";
import { paintHomeView } from "./paintHomeView.js";
import { paintMovieListView } from "./paintMovieListView.js";
import { infiniteScroll, startInfiniteScroll } from "./infiniteScrollForSearching.js";

const observerOptions = {
    threshold: 0.5
  };
const scrollObserver = new IntersectionObserver(async (entries, io) => {await infiniteScroll(entries, io)},observerOptions);

function onSearchingClassToggle(option){
    const  movieListContents = document.querySelector('.movieListContents');
    
    //검색기능 이용 여부를 onSearching 클래스로 표시
    if(option==='add'){
        const isOnSearching = movieListContents.classList.contains('onSearching');
        if(!isOnSearching) movieListContents.classList.add('onSearching');
        return
    }
    
    if(option==='remove') {
        if(movieListContents) movieListContents.classList.remove('onSearching');
        return
    }

    console.error(`'${option}' is not a valid option`);
}

async function searchMovies(e){
    const searchBarText = e.target.value;
    
    //검색바가 비어버린다면 홈으로
    if(!searchBarText.length) {
        onSearchingClassToggle('remove');
        await paintHomeView();
        return
    }
    
    const inputText = searchBarText.toLowerCase();
    const rawSearchedMovieData = await getMovieByTitle(inputText);
    const searchedMovieData = rawSearchedMovieData.results;

    paintMovieListView(searchedMovieData);
    onSearchingClassToggle('add');

    //무한 스크롤 관찰 시작
    startInfiniteScroll(scrollObserver);
}

function debounedSearchMovies() {
    let timer;
    return (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
        searchMovies(e);
        }, 300);
    };
}

export {searchMovies, debounedSearchMovies}
