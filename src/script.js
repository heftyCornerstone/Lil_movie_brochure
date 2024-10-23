import { openModal, modalClose } from "./modules/handleModal.js"
import { handleBookmarkData } from "./modules/showBookmarkList.js";
import { paintHomeView } from "./modules/paintHomeView.js"
import { bookMarkScreenToggle } from "./modules/showBookmarkList.js";
import { debounedSearchMovies } from "./modules/searchMovies.js";

const main = document.querySelector('#main');
const bookMarkBtn = document.querySelector('#bookMarkBtn');
const movieSearchbar = document.querySelector("#movieSearchbar");
const modalScreen = document.querySelector('#modalScreen');
const modalBookmarkBtn = document.querySelector('#modalBookmarkBtn');

window.onload = async ()=>{
  await paintHomeView();

  main.addEventListener('click',async (e)=>{await openModal(e)});
  bookMarkBtn.addEventListener('click', bookMarkScreenToggle);
  movieSearchbar.addEventListener('keyup', debounedSearchMovies());
  modalScreen.addEventListener('click', (e)=>modalClose(e));
  modalBookmarkBtn.addEventListener('click',(e)=>{handleBookmarkData(e)});
}
