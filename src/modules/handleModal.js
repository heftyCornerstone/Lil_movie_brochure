import {searchMovieByTitle} from "./getTmdbData.js"

const modalScreen = document.getElementById('modalScreen');
const modalPoster = document.querySelector('.modal_inner_modalPoster img');;
const modalTitle = document.querySelector('.modalInfo_head_title h2');
const modalReleaseDate = document.getElementsByClassName('modalInfo_head_dateAndStars_releaseDate')[0];
const modalStars = document.getElementsByClassName('modalInfo_head_dateAndStars_stars')[0];
const modalOverview = document.getElementsByClassName('modalInfo_overview')[0];
const modalBookmarkBtn = document.getElementById('modalBookmarkBtn');

//로컬스토리지에서 북마크 얻어오기
function bookmarkParser(){
  const rawBookmarks = localStorage.getItem('bookmarks');
  const parsed = (rawBookmarks) ? JSON.parse(rawBookmarks) : null;
  const bookmarkSet = new Set(parsed);

  return bookmarkSet
}

//북마크 삭제와 추가 로직
function handleBookmarkData(e){
  const movieTitle = e.target.closest('.modal_inner').querySelector('.modalInfo_head_title h2').innerHTML
  const bookmarkSet = bookmarkParser();
  const isBookmarked = (bookmarkSet) ? bookmarkSet.has(movieTitle) : null;
  let bookmarkString = '[]';
  
  (isBookmarked) ? bookmarkSet.delete(movieTitle) : bookmarkSet.add(movieTitle);

  bookmarkString = JSON.stringify([...bookmarkSet]);
  localStorage.setItem('bookmarks', bookmarkString);

  modalBookmarkBtn.innerHTML = (isBookmarked) ? '북마크 추가하기' : '북마크 삭제하기';

}

//모달창 컨텐츠 채우기
async function generateModalContents(movieCard){
  const movieTitle = movieCard.querySelector('.movieCard_info_inner_movieTitle').innerHTML;
  const movieData = await searchMovieByTitle(movieTitle);
  const currentMovie = movieData.results[0];
  const bookmarkSet = bookmarkParser();
  const isBookmarked = (bookmarkSet) ? bookmarkSet.has(movieTitle) : null;

  modalPoster.setAttribute('src',`https://image.tmdb.org/t/p/original/${currentMovie.poster_path}`);
  modalTitle.innerHTML = currentMovie.title;
  modalReleaseDate.innerHTML = `개봉일: ${currentMovie.release_date}`;
  modalStars.innerHTML = `평점: ${Math.round(currentMovie.vote_average)}/10`;
  modalOverview.innerHTML = (currentMovie.overview.length) ? currentMovie.overview : '시놉시스가 제공되지 않는 영화입니다';
  modalBookmarkBtn.innerHTML = (isBookmarked) ? '북마크 삭제하기' : '북마크 추가하기';
}

//모달 띄우기
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

export {openModal, modalClose, handleBookmarkData}