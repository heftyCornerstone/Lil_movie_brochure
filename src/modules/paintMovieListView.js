import { createMovieCard } from "./createMovieCards.js";
import { getMovieById } from "./getTmdbData.js";
import { infiniteScroll, startInfiniteScroll } from "./infiniteScrollForSearching.js";

const main = document.querySelector('#main');
const observerOptions = {
    threshold: 0.5
  };
const scrollObserver = new IntersectionObserver(async (entries, io) => {await infiniteScroll(entries, io)},observerOptions);

//홈 화면 -> 영화 카드 리스트 화면으로 전환
async function paintMovieListView(movieIdArr){ 
    const movieListContents = document.querySelector('.movieListContents');
    const homeView = document.querySelector('.homeContents');
    const newMovieListContents = document.createElement('div');
    newMovieListContents.classList.add('movieListContents');

    //화면 전환
    if(homeView) main.replaceChild(newMovieListContents, homeView);
    if(movieListContents) main.replaceChild(newMovieListContents, movieListContents);
    main.appendChild(newMovieListContents);
    

    //영화 카드 채워넣기
    await appendMovieCardList(movieIdArr, newMovieListContents);

    //무한스크롤 관찰 시작
    startInfiniteScroll(scrollObserver);
}

//appendTo에 영화 카드 채워넣기
async function appendMovieCardList(movieIdArr, appendTo){
    for(let i=0; i<movieIdArr.length; i++){
        const movieData = await getMovieById(movieIdArr[i]);
        const newCard = createMovieCard(movieData);

        if(i===(movieIdArr.length-1)) newCard.classList.add('lastCard');
        
        appendTo.appendChild(newCard);
    }
}

export {paintMovieListView, appendMovieCardList}


// 유동적으로 마지막 요소를 찾지 말고, 마지막 요소에 클래스를 붙이는게 낫겠어