import { createMovieCard } from "./createMovieCards.js";
import { getMovieByTitle } from "./getTmdbData.js";

const movieSearchbar = document.querySelector('#movieSearchbar');

// 무한 스크롤이 참조해야 하는 데이터
const scrollingDataArr = [['searchingKeyword', 'none'], ['maxPage', 0], ['pageToLoad', 2]];
const scrollingData = new Map(scrollingDataArr);

//scrollObserver가 관찰해야 하는 마지막 요소 초기설정
function startInfiniteScroll(io){
    const movieListContents = document.querySelector('.movieListContents');
    if(!movieListContents) return;

    const isOnSearching = movieListContents.classList.contains('onSearching');
    const lastCard = movieListContents.querySelector('.lastCard');
    if(isOnSearching && lastCard) io.observe(lastCard);
}

//마지막 요소가 화면에 들어오면 새로운 컨텐츠 로드하기
async function infiniteScroll(entries, io){
    const movieListContents = document.querySelector('.movieListContents');
    const isOnSearching = movieListContents.classList.contains('onSearching');
    const pageToLoad = scrollingData.get('pageToLoad');

    //search페이지가 아니거나, 컨텐츠를 모두 로드하면 리턴
    if(!isOnSearching || pageToLoad==='max') return;

    const inputText = movieSearchbar.value.toLowerCase();
    const prevLastCard = document.querySelector('.movieListContents .lastCard');
    const movieDataOverall = await getMovieByTitle(inputText, pageToLoad);
    const movieData = movieDataOverall.results;
    const searchingKeyword = scrollingData.get('searchingKeyword');
    scrollingData.set('maxPage', movieDataOverall.total_pages);
    const maxPage = scrollingData.get('maxPage');
    
    //검색어가 바뀌면 스크롤이 참조하는 데이터 초기화
    if(inputText !== searchingKeyword) {     
        scrollingData.set('searchingKeyword', inputText);
        scrollingData.set('maxPage', movieDataOverall.total_pages);
        scrollingData.set('pageToLoad', 2);
    }

    //컨텐츠 로드
    prevLastCard.classList.remove('lastCard');
    for(let i=0; i<movieData.length; i++) {
        const newCard = createMovieCard(movieData[i]);
        movieListContents.appendChild(newCard);

        if(i===(movieData.length-1)) {
            const currentIoObject = entries[0];

            //컨텐츠 로드 후 관찰해야 하는 마지막 요소 바꾸기
            newCard.classList.add('lastCard');
            if (currentIoObject.isIntersecting) {
                io.unobserve(prevLastCard);
                io.observe(newCard);
            }
        }
    }

    //로드된 페이지 카운트 올리기
    const newPageToLoad = (pageToLoad<maxPage) ? pageToLoad+1 : 'max';
    scrollingData.set('pageToLoad', newPageToLoad);
}

export {startInfiniteScroll, infiniteScroll}


