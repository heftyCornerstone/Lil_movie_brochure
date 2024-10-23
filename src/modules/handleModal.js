import { getMovieById } from "./getTmdbData.js"
import { bookmarkParser } from "./showBookmarkList.js";

const modalScreen = document.querySelector('#modalScreen');
const modal = document.querySelector('.modal');
const modalPoster = document.querySelector('.modal_inner_modalPoster img');;
const modalTitle = document.querySelector('.modalInfo_head_title h2');
const modalReleaseDate = document.querySelector('.modalInfo_head_dateAndStars_releaseDate');
const modalStars = document.querySelector('.modalInfo_head_dateAndStars_stars');
const modalOverview = document.querySelector('.modalInfo_overview');
const modalBookmarkBtn = document.querySelector('#modalBookmarkBtn');


async function generateModalContents(movieCard){
  const movieId = movieCard.getAttribute('id');
  const movieData = await getMovieById(movieId);
  const bookmarkSet = bookmarkParser();
  const isBookmarked = (bookmarkSet) ? bookmarkSet.has(movieId) : null;
  const movieDataPoster = movieData.poster_path;
  const posterPath = (movieDataPoster) ? 
    `https://image.tmdb.org/t/p/original${movieData.poster_path}` : '../img/no_poster_available.png'

  modal.setAttribute('id', movieId);
  modalPoster.setAttribute('src', posterPath);
  modalTitle.innerHTML = movieData.title;
  modalReleaseDate.innerHTML = `개봉일: ${movieData.release_date}`;
  modalStars.innerHTML = `평점: ${Math.round(movieData.vote_average)}/10`;
  modalOverview.innerHTML = (movieData.overview.length) ? movieData.overview : '시놉시스가 제공되지 않는 영화입니다';
  modalBookmarkBtn.innerHTML = (isBookmarked) ? '북마크 삭제하기' : '북마크 추가하기';
}


async function openModal(e){
  const targetMovieCard = e.target.closest('.movieCard');

  if (targetMovieCard) {
    await generateModalContents(targetMovieCard);
    modalScreen.classList.toggle('closeModal');
  }
}

//x버튼 혹은 모달창 바깥 클릭시 모달 닫음
function modalClose(e){
  const targetId = e.target.getAttribute('id');
  if(targetId==='modalScreen' || targetId==='modalCloseBtn') modalScreen.classList.toggle('closeModal');
}

export {openModal, modalClose}