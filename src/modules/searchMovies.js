import { getMovieByTitle } from "./getTmdbData.js";
import { appendMovieCardList } from "./paintMovieListView.js";

const movieSearchbar = document.querySelector('#movieSearchbar');

async function searchMovies(e){
    const inputText = e.target.value.toLowerCase();
    const rawSearchedMovieData = await getMovieByTitle(inputText);
    const searchedMovieData = rawSearchedMovieData.results;
    const movieTitles = [];
    for(let i=0; i<searchedMovieData.length; i++){
        const curMovieTitle = searchedMovieData[i].title;
        movieTitles.push(curMovieTitle);
    }
    console.log(searchedMovieData[0]);
    console.log(movieTitles);
}

async function infiniteScroll(){
    const inputText = movieSearchbar.value.toLowerCase();
    const searchedMovieData = await getMovieByTitle(inputText);
    //{page: 1, results: Array(20), total_pages: 345, total_results: 6890}
    return ()=>{

    }
}

export {searchMovies}

//검색하고픈 내용 submit하면 검색 결과를 띄우는 것이 요구사항
//실시간 검색 결과 보여주기는 선택사항
//검색시 대소문자 구분 없어야함

/*
페이지가 어디까지 있는지 알아야하겠지

클로저로 스크롤 횟수를 기억, 그리고 그 횟수로 어떤 페이지 받아올건지 결정.

스크롤이 바닥에 가까워지면 
    계속해서 데이터를 받아옴, 맥스페이지까지.
    인풋값이랑 기억하는 검색값이 같은지 다른지 매번 체크해서
    만일 달라지면 스크롤 횟수를 초기화. 맥스페이지도.

이 이벤트는 검색기능이 돌아가는 중에만 있을거고,
북마크 페이지로 가거나
홈으로 돌아가면 사라짐.
removeEventListener()


//pseudo code
function infiniteScroll() {
    let searchingKeyword = '';
    let maxPage = ; 
    let pageToLoad = 2; //초기값

    return (e)=>{
        const inputText = '';
        if(inputText !== searchingKeyword) {
            //searchingKeyword, maxPage, pageToLoad 재설정
            searchingKeyword = inputText; 
            maxPage = ;
            pageToLoad = 2;
        }
        데이터 받아와서 채우기
    }
}



*/