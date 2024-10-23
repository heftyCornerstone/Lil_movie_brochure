import { movieCategoryData } from "../movieCategoryData/categoryAndGenre.js";
import { getPopularMovie } from "./getTmdbData.js"

const movieCardTemp = document.querySelector('#movieCardTemp');

function sortMoviesByGenre(moviesData){
  const categories = Object.keys(movieCategoryData);

  let sortedMovies = {}
  categories.forEach((curCategory)=>{sortedMovies[curCategory] = []});

  //영화 장르별로 분류
  for(let i=0; i<moviesData.length; i++){
    const curMovie = moviesData[i];
    const curMovieId = curMovie.genre_ids[0];
    
    categories.forEach((curCategory)=>{
      const genreIdArr = movieCategoryData[curCategory].genreIds;
      if(genreIdArr.includes(curMovieId)) sortedMovies[curCategory] = [...sortedMovies[curCategory], curMovie];
    })
  }

  return sortedMovies;
}

function createNoMoviesBanner(){
  const noMoviesBanner = document.createElement('div');
  const noMoviesBannerInner = document.createElement('div');

  noMoviesBanner.classList.add('noMoviesBanner');
  noMoviesBannerInner.classList.add('noMoviesBanner_inner');
  noMoviesBannerInner.innerHTML = '아직 상영중인 영화가 없어요';
  noMoviesBanner.appendChild(noMoviesBannerInner);
  return noMoviesBanner;
}

function createMovieCard(movieData){
  const newMovieCard = movieCardTemp.content.cloneNode(true).children[0];
  const thisMovieCard = newMovieCard.querySelector('.movieCard');
  const posterImg = newMovieCard.querySelector('.movieCard_poster_posterImg');
  const movieTitle = newMovieCard.querySelector('.movieCard_info_inner_movieTitle');
  const stars = newMovieCard.querySelector('.movieCard_info_inner_stars');
  const movieDataPoster = movieData.poster_path;
  const posterPath = (movieDataPoster) ? 
    `https://image.tmdb.org/t/p/original${movieData.poster_path}` : '../img/no_poster_available.png'

  thisMovieCard.setAttribute('id', movieData.id);
  posterImg.setAttribute('src', posterPath);
  movieTitle.innerHTML = movieData.title;
  stars.innerHTML = `${Math.round(movieData.vote_average)} / 10`;

  return newMovieCard;
}

async function putMovieCardsByCategory(){
  const moviesObj = await getPopularMovie();
  const sortedMoviesObj = sortMoviesByGenre(moviesObj);
  const sortedMoviesArr = Object.entries(sortedMoviesObj);
  
  //장르별로 담긴 영화 리스트 순회
  sortedMoviesArr.forEach(([category, movies])=>{
    const movieCardsContainer = document.getElementById(`${category}`).querySelector('.movieCardsContainer');
    const categoryDomElement = document.getElementById(`${category}`).querySelector('.movieCardsBoard');
    const movieCards = movies.map((curMovie)=>createMovieCard(curMovie));
    
    if (movieCards.length) {
      //영화 있음
      movieCardsContainer.classList.add('contentful');
      movieCards.forEach((movieCard)=>{ categoryDomElement.appendChild(movieCard); });
    } else {
      //영화 없음
      const sliderBtnList = categoryDomElement.closest('.category_inner_slider').querySelectorAll('.sliderBtn');
      const noMoviesBanner = createNoMoviesBanner();

      sliderBtnList.entries().forEach(([i, sliderBtn])=>{sliderBtn.style.display='none';});
      movieCardsContainer.classList.add('noContents');
      categoryDomElement.style.width = '100%';
      categoryDomElement.appendChild(noMoviesBanner);
    }
    
  })
}

export {putMovieCardsByCategory, createMovieCard}