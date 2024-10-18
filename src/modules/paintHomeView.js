import { putMovieCards } from "./createMovieCards.js";
import { slideMovieCards } from "./handleSlider.js";

const main = document.querySelector('#main');
const contentsTemp = document.querySelector('#contentsTemp');
const categorySlider = document.getElementsByClassName('category_inner_slider');

function generateHomeView(){
  const categoryIds = ['adventure', 'withLovedOnes', 'thrillingStories', 'crimeAndWar', 'animation', 'realWorld'];
  const categoryNames = [
    '모험의 세계로', 
    '사랑하는 사람들과 함께', 
    '간담이 서늘해지는 이야기들', 
    '범죄 그리고 전쟁', 
    '애니메이션', 
    '현실 속 우리들의 이야기'
  ];
  const homeContents = document.createElement('div');
  homeContents.classList.add('homeContents');

  categoryNames.forEach((curName, i)=>{
    const newContentsTemp = contentsTemp.content.cloneNode(true).children[0];
    const categoryTitle = newContentsTemp.querySelector('.category_inner_title h2');
    newContentsTemp.setAttribute('id', categoryIds[i]);
    categoryTitle.innerHTML = curName;
    
    homeContents.appendChild(newContentsTemp);
  })

  main.appendChild(homeContents);
}

function paintHomeView(){
  const movieListView = document.querySelector('.movieListContents');
  if(movieListView) main.removeChild(movieListView);
  generateHomeView();
  putMovieCards();

  for(let i=0; i<categorySlider.length; i++) {
    categorySlider[i].addEventListener("click", slideMovieCards());
  }
}

export {paintHomeView}