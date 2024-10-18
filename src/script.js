import { openModal, modalClose, handleBookmarkData } from "./modules/handleModal.js"
import { paintHomeView} from "./modules/paintHomeView.js"
import { showBookmarkList } from "./modules/paintMovieListView.js";

const main = document.querySelector('#main');
const bookMarksBtn = document.querySelector('#bookMarksBtn');
const modalScreen = document.getElementById('modalScreen');
const modalBookmarkBtn = document.getElementById('modalBookmarkBtn');


window.onload = ()=>{
  paintHomeView();

  main.addEventListener('click',(e)=>{openModal(e)});
  bookMarksBtn.addEventListener('click', showBookmarkList);
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
  모달과 무비리스트뷰에서 중복되는 함수
  영화 카테고리명
주석 달자
*/
