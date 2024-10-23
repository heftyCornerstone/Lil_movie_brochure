import { getMovieByTitle } from "./getTmdbData.js";
import { paintHomeView } from "./paintHomeView.js";
import { paintMovieListView } from "./paintMovieListView.js";

//검색기능 이용 여부를 onSearching 클래스로 표시
function onSearchingClassToggle(option){
    const  movieListContents = document.querySelector('.movieListContents');
    const isOnSearching = movieListContents.classList.contains('onSearching');
    if(option==='add'){
        if(!isOnSearching) movieListContents.classList.add('onSearching');
    } else if(option==='remove') {
        movieListContents.classList.remove('onSearching');
    } else {
        console.error(`'${option}' is not a valid option`);
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
