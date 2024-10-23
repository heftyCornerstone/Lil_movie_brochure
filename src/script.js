import { openModal, modalClose } from "./modules/handleModal.js"
import { handleBookmarkData } from "./modules/showBookmarkList.js";
import { paintHomeView } from "./modules/paintHomeView.js"
import { bookMarkBtnToggle } from "./modules/showBookmarkList.js";
import { searchMovies } from "./modules/searchMovies.js";

const main = document.querySelector('#main');
const bookMarksBtn = document.querySelector('#bookMarksBtn');
const movieSearchbar = document.querySelector("#movieSearchbar");
const modalScreen = document.querySelector('#modalScreen');
const modalBookmarkBtn = document.querySelector('#modalBookmarkBtn');

window.onload = ()=>{
  paintHomeView();

  main.addEventListener('click',async (e)=>{await openModal(e)});
  bookMarksBtn.addEventListener('click', bookMarkBtnToggle);
  movieSearchbar.addEventListener('keyup',async (e)=>{await searchMovies(e)});
  modalScreen.addEventListener('click', (e)=>modalClose(e));
  modalBookmarkBtn.addEventListener('click',(e)=>{handleBookmarkData(e)});
}



/* 
슬라이드 너비를 수정하자
*/
