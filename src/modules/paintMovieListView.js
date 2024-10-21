import { createMovieCard } from "./createMovieCards.js";
import { getMovieById } from "./getTmdbData.js";

const main = document.querySelector('#main');
const movieListContents = document.querySelector('.movieListContents');

//홈 화면 -> 영화 카드 리스트 화면으로 전환
function paintMovieListView(movieIdArr){ 
    const homeView = document.querySelector('.homeContents');
    const newMovieListContents = document.createElement('div');
    newMovieListContents.classList.add('movieListContents');

    //화면 전환
    if(homeView) main.replaceChild(newMovieListContents, homeView);
    if(movieListContents) main.replaceChild(newMovieListContents, movieListContents);
    main.appendChild(newMovieListContents);
    
    //영화 카드 채워넣기
    appendMovieCardList(movieIdArr, newMovieListContents);
}

//영화 id가 든 어레이를 이용하여 주어진 화면에 영화 카드를 채워넣는다.
async function appendMovieCardList(movieIdArr, appendTo){
    for(let movieId of movieIdArr) {
        const movieData = await getMovieById(movieId);
        const newCard = createMovieCard(movieData);

        appendTo.appendChild(newCard);
    }
}

export {paintMovieListView, appendMovieCardList}
