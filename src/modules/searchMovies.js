import { getMovieByTitle } from "./getTmdbData.js";
import { paintHomeView } from "./paintHomeView.js";
import { appendMovieCardList, paintMovieListView } from "./paintMovieListView.js";

function onSearchingClassToggle(option){
    const  movieListContents = document.querySelector('.movieListContents');
    const isOnSearching = movieListContents.classList.contains('onSearching');
    if(option==='add'){
        if(!isOnSearching) movieListContents.classList.add('onSearching');
    } else if(option==='remove') {
        movieListContents.classList.remove('onSearching');
    } else {
        console.error(`'${option}' is not a legit option`);
    }
}

async function searchMovies(e){
    if(e.target.value==='') {
        onSearchingClassToggle('remove');
        return paintHomeView();
    }
    
    const inputText = e.target.value.toLowerCase();
    const rawSearchedMovieData = await getMovieByTitle(inputText);
    const searchedMovieData = rawSearchedMovieData.results;
    const movieIds = [];
    
    for(let i=0; i<searchedMovieData.length; i++){
        const curMovieId = searchedMovieData[i].id;
        movieIds.push(curMovieId);
    }
    paintMovieListView(movieIds); 
    onSearchingClassToggle('add');
}

export {searchMovies}


//버그 고치기 : 검색창에서 지우기를 빠르게 하면 홈 화면으로 돌아가지 못하고 텅 빈 무비카드리스트 화면만 뜨는 버그