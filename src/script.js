import { openModal, modalClose} from "./modules/handleModal.js"
import { handleBookmarkData } from "./modules/showBookmarkList.js";
import { paintHomeView} from "./modules/paintHomeView.js"
import { showBookmarkList } from "./modules/showBookmarkList.js";
import { searchMovies } from "./modules/searchMovies.js";

const main = document.querySelector('#main');
const bookMarksBtn = document.querySelector('#bookMarksBtn');
const movieSearchbar = document.querySelector("#movieSearchbar");
const modalScreen = document.querySelector('#modalScreen');
const modalBookmarkBtn = document.querySelector('#modalBookmarkBtn');


window.onload = ()=>{
  paintHomeView();

  main.addEventListener('click',(e)=>{openModal(e)});
  bookMarksBtn.addEventListener('click', showBookmarkList);
  movieSearchbar.addEventListener('keyup',(e)=>{searchMovies(e)});
  modalScreen.addEventListener('click', (e)=>modalClose(e));
  modalBookmarkBtn.addEventListener('click',(e)=>{handleBookmarkData(e)});
}



/* 
할일
검색기능 구현
----------------------------------------------------------------
슬라이드 너비를 수정하자
모달 시놉시스 칸에 뜨는 스크롤을 숨겨보자
북마크 보기 / 홈으로 가기 토글 버튼 글자를 아이콘으로 바꾸자
반복적인 코드를 줄이자
  영화 카테고리명
주석 달자
*/
