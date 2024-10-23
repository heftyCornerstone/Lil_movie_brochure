import { openModal, modalClose } from "./modules/handleModal.js"
import { handleBookmarkData } from "./modules/showBookmarkList.js";
import { paintHomeView } from "./modules/paintHomeView.js"
import { bookMarkBtnToggle } from "./modules/showBookmarkList.js";
import { searchMovies, debounedSearchMovies } from "./modules/searchMovies.js";

const main = document.querySelector('#main');
const bookMarksBtn = document.querySelector('#bookMarksBtn');
const movieSearchbar = document.querySelector("#movieSearchbar");
const modalScreen = document.querySelector('#modalScreen');
const modalBookmarkBtn = document.querySelector('#modalBookmarkBtn');

window.onload = async ()=>{
  await paintHomeView();

  main.addEventListener('click',async (e)=>{await openModal(e)});
  bookMarksBtn.addEventListener('click', bookMarkBtnToggle);
  movieSearchbar.addEventListener('keyup', debounedSearchMovies());
  modalScreen.addEventListener('click', (e)=>modalClose(e));
  modalBookmarkBtn.addEventListener('click',(e)=>{handleBookmarkData(e)});
}
