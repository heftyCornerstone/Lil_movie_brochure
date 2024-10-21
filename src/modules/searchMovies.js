import { getMovieByTitle } from "./getTmdbData.js";
import { paintHomeView } from "./paintHomeView.js";
import { appendMovieCardList, paintMovieListView } from "./paintMovieListView.js";

const movieSearchbar = document.querySelector('#movieSearchbar');

async function searchMovies(e){
    if(e.target.value==='') return paintHomeView();

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

// async function infiniteScroll(){
//     let searchingKeyword = '';
//     let maxPage = searchedMovieData.total_pages; 
//     let pageToLoad = 2; //초기값
//     let lastCard = null;
//     //{page: 1, results: Array(20), total_pages: 345, total_results: 6890}
//     return async ()=>{
//         const io = new IntersectionObserver(() => {console.log('hello')}, options)
//         const inputText = movieSearchbar.value.toLowerCase();
//         const searchedMovieData = await getMovieByTitle(searchingKeyword);
//         const newLastCard = document.querySelector('.movieListContents').lastElementChild;
//         if (lastCard) io.unobserve(lastCard);
//         io.observe(newLastCard);

//         lastCard = newLastCard;
//     }
// }

export {searchMovies}


//버그 고치기 : 검색창에서 지우기를 빠르게 하면 홈 화면으로 돌아가지 못하고 텅 빈 무비카드리스트 화면만 뜨는 버그