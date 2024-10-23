import { createMovieCard } from "./createMovieCards.js";

const main = document.querySelector('#main');
const movieSearchbar = document.querySelector('#movieSearchbar');

function paintMovieListView(movieIdArr){ 
    const movieListContents = document.querySelector('.movieListContents');
    const homeView = document.querySelector('.homeContents');
    const newMovieListContents = document.createElement('div');
    newMovieListContents.classList.add('movieListContents');

    //화면 전환
    if(homeView) main.replaceChild(newMovieListContents, homeView);
    if(movieListContents) main.replaceChild(newMovieListContents, movieListContents);
    main.appendChild(newMovieListContents);
    movieSearchbar.innerHTML = '';
    
    appendMovieCardList(movieIdArr, newMovieListContents);
}

function appendMovieCardList(movieDataArr, appendTo){
    for(let i=0; i<movieDataArr.length; i++){
        const movieData = movieDataArr[i];
        const newCard = createMovieCard(movieData);

        if(i===(movieDataArr.length-1)) newCard.classList.add('lastCard');
        
        appendTo.appendChild(newCard);
    }
}

export {paintMovieListView}