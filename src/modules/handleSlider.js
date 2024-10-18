
//영화카드 슬라이드하기(버튼으로 조작)
function slideMovieCards(){
  let translatedPx = 0;
  
  return (e)=>{
    const isTargetSliderBtn = e.target.classList.contains('sliderBtn');
    if(isTargetSliderBtn) {
      const isLeftSliderBtn = e.target.classList.contains('LeftSliderBtn');
      const movieCardWid = document.getElementsByClassName('movieCardWrapper')[0].offsetWidth;
      const cardsContainerWid = e.target.parentNode.querySelector('.movieCardsContainer').offsetWidth;
      const cardBoard = e.target.parentNode.querySelector('.movieCardsBoard');
      const cardBoardWid = e.target.parentNode.querySelector('.movieCardsBoard').offsetWidth;
      const cardBoardEnd = cardBoardWid - cardsContainerWid;

    
      if(isLeftSliderBtn) {
        if( Math.abs(translatedPx) > 0 ) translatedPx += movieCardWid;
      } else{
        if( Math.abs(translatedPx) < cardBoardEnd ) translatedPx -= movieCardWid;
      }
      cardBoard.style.transform = `translate(${translatedPx}px)`;
    }
  };

}

export {slideMovieCards}