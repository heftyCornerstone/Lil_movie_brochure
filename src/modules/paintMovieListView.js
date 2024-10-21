import { createMovieCard } from "./createMovieCards.js";
import { getMovieByTitle } from "./getTmdbData.js";

const main = document.querySelector('#main');
const movieListContents = document.querySelector('.movieListContents');

//홈 화면 -> 영화 카드 리스트 화면으로 전환
function paintMovieListView(movieTitleArr){ 
    const homeView = document.querySelector('.homeContents');
    const newMovieListContents = document.createElement('div');
    newMovieListContents.classList.add('movieListContents');

    //화면 전환
    if(homeView) main.replaceChild(newMovieListContents, homeView);
    if(movieListContents) main.replaceChild(newMovieListContents, movieListContents);
    main.appendChild(newMovieListContents);
    
    //영화 카드 채워넣기
    appendMovieCardList(movieTitleArr, newMovieListContents);
}

//영화 제목이 든 어레이를 이용하여 주어진 화면에 영화 카드를 채워넣는다.
async function appendMovieCardList(movieTitleArr, appendTo){
    for(let movie of movieTitleArr) {
        const rawMovieData = await getMovieByTitle(movie);
        const movieData = rawMovieData.results;
        
        movieData.forEach((searchedMovie)=>{
            const newCard = createMovieCard(searchedMovie);
            appendTo.appendChild(newCard);
        })
    }
}

export {paintMovieListView, appendMovieCardList}
