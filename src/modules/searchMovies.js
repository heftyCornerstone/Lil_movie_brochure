import { getMovieByTitle } from "./getTmdbData.js";
import { appendMovieCardList, paintMovieListView } from "./paintMovieListView.js";

const movieSearchbar = document.querySelector('#movieSearchbar');

async function searchMovies(e){
    const inputText = e.target.value.toLowerCase();
    const rawSearchedMovieData = await getMovieByTitle(inputText);
    const searchedMovieData = rawSearchedMovieData.results;
    const movieIds = [];
    for(let i=0; i<searchedMovieData.length; i++){
        const curMovieId = searchedMovieData[i].id;
        movieIds.push(curMovieId);
    }
    paintMovieListView(movieIds);
}

async function infiniteScroll(){
    const inputText = movieSearchbar.value.toLowerCase();
    const searchedMovieData = await getMovieByTitle(inputText);
    //{page: 1, results: Array(20), total_pages: 345, total_results: 6890}
    return ()=>{

    }
}

export {searchMovies}
