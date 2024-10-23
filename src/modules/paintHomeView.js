import { movieCategoryData } from "../movieCategoryData/categoryAndGenre.js";
import { putMovieCardsByGenre } from "./createMovieCards.js";
import { slideMovieCards } from "./handleSlider.js";

const main = document.querySelector('#main');
const contentsTemp = document.querySelector('#contentsTemp');
const categorySlider = document.getElementsByClassName('category_inner_slider');

function GenMovieCategoryWindows(){
  const homeContents = document.createElement('div');
  homeContents.classList.add('homeContents');

  const categoryData = Object.entries(movieCategoryData);

  categoryData.forEach(([categoryId, nameAndgenreObj])=>{
    const newContentsTemp = contentsTemp.content.cloneNode(true).children[0];
    const categoryTitle = newContentsTemp.querySelector('.category_inner_title h2');
    newContentsTemp.setAttribute('id', categoryId);
    categoryTitle.innerHTML = nameAndgenreObj.name;

    homeContents.appendChild(newContentsTemp);
  })

  main.appendChild(homeContents);
}

async function paintHomeView(){
  const homeView = document.querySelector('.homeContents');
  const movieListView = document.querySelector('.movieListContents');

  if(homeView) return;
  if(movieListView) main.removeChild(movieListView);
  GenMovieCategoryWindows();
  await putMovieCardsByGenre();

  for(let i=0; i<categorySlider.length; i++) {
    categorySlider[i].addEventListener("click", slideMovieCards());
  }
}

export {paintHomeView}