import {getMovieData} from "./getTmdbData.js"

const movieCardTemp = document.querySelector('#movieCardTemp');

//영화 장르별로 분류하기
function sortMoviesByGenre(moviesData){
  //매번 장르 분류 코드를 일일이 찾는 것보다 미리 넣어놓는 게 쓸데없는 데이터 통신을 줄이는 방법 같은데
  //하드코딩 같아.
  //근데 이미 축적해놓은 데이터가 너무 크니까 장르 분류 코드를 어지간해서는 안 바꿀 것 같아.
  //...???

  //아이디 목록 계속 사용하는데 이거 밖으로 꺼내서 재사용할 방법 없을까?
  const genreIdsObj = {
    'adventure': [28, 12, 37, 14],
    'withLovedOnes': [10749, 18, 10770, 10751, 35],
    'thrillingStories': [53, 27, 9648, 878],
    'crimeAndWar': [80, 10752],
    'animation': [16],
    'realWorld': [99, 36, 10402]
  }
  let sortedMovies = {
    'adventure': [],
    'withLovedOnes': [],
    'thrillingStories': [],
    'crimeAndWar': [],
    'animation': [],
    'realWorld': []
  }

  for(let i=0; i<moviesData.length; i++){
    const movie = moviesData[i];
    const movieId = movie.genre_ids[0];
    const genreIds = Object.keys(genreIdsObj);
    
    genreIds.forEach((curGenre)=>{
      if(genreIdsObj[curGenre].includes(movieId)) sortedMovies[curGenre] = [...sortedMovies[curGenre], movie];
    })
  }
  return sortedMovies;
}

//영화 없음 배너 생성
function createNoMoviesBanner(){
  const noMoviesBanner = document.createElement('div');
  const noMoviesBannerInner = document.createElement('div');

  noMoviesBanner.classList.add('noMoviesBanner');
  noMoviesBannerInner.classList.add('noMoviesBanner_inner');
  noMoviesBannerInner.innerHTML = '아직 상영중인 영화가 없어요';
  noMoviesBanner.appendChild(noMoviesBannerInner);
  return noMoviesBanner;
}

//영화 카드 생성
function createMovieCard(movieData){
  const newMovieCard = movieCardTemp.content.cloneNode(true).children[0];
  const thisMovieCard = newMovieCard.querySelector('.movieCard');
  const posterImg = newMovieCard.querySelector('.movieCard_poster_posterImg');
  const movieTitle = newMovieCard.querySelector('.movieCard_info_inner_movieTitle');
  const stars = newMovieCard.querySelector('.movieCard_info_inner_stars');

  thisMovieCard.setAttribute('id', movieData.id);
  posterImg.setAttribute('src', `https://image.tmdb.org/t/p/original/${movieData.poster_path}`);
  movieTitle.innerHTML = movieData.title;
  stars.innerHTML = `${Math.round(movieData.vote_average)} / 10`;

  return newMovieCard;
}

//영화 카드 장르에 따라 채워넣기
async function putMovieCards(){
  const moviesObj = await getMovieData();
  const sortedMoviesObj = sortMoviesByGenre(moviesObj);
  const sortedMoviesArr = Object.entries(sortedMoviesObj);
  
  //장르별로 담긴 영화 리스트 순회
  sortedMoviesArr.forEach(([category, movies])=>{
    const categoryDomElement = document.getElementById(`${category}`).querySelector('.movieCardsBoard');
    const movieCards = movies.map((curMovie)=>createMovieCard(curMovie));
    
    if (movieCards.length) {
      //영화 있음
      movieCards.forEach((movieCard)=>{ categoryDomElement.appendChild(movieCard); });
    } else {
      //영화 없음
      const sliderBtnList = categoryDomElement.parentNode.parentNode.querySelectorAll('.sliderBtn');
      const noMoviesBanner = createNoMoviesBanner();

      sliderBtnList.entries().forEach(([i, sliderBtn])=>{sliderBtn.style.display='none';});
      categoryDomElement.style.width = '100%';
      categoryDomElement.appendChild(noMoviesBanner);
    }
    
  })
}

export {putMovieCards, createMovieCard}