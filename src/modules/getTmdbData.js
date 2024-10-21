const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTk3MWI0ZGMyMTA5MDA4ZjVhODQxNWE0MWU1ZDRkZiIsIm5iZiI6MTcyODk1NzQ5Ny43MTY1NTQsInN1YiI6IjY3MGRjOTRjZDVmOTNhM2RhMGJjMDk5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IQ6oPN2xdf8N6-EHhbCSYq1I7X8Cksc0JHcVqxxKWOA'
    }
};

//영화 데이터 가져오기
async function getMovieData(){
    try{
        const rawMovieData = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko&page=1&region=KR', options);
        const parsedMovieData = await rawMovieData.json();
        const movieData = parsedMovieData.results;

        return movieData;
    } catch(err) { 
        throw(err);
    }
}

//이름으로 영화 데이터 가져오기
async function getMovieByTitle(movieTitle, page=1){
    const rawSearchedMovie = await fetch(`https://api.themoviedb.org/3/search/movie?language=ko&page=${page}&query=${movieTitle}`, options);
    const searchedMovies = await rawSearchedMovie.json();
    return searchedMovies;
}

//아이디로 영화 데이터 가져오기
async function getMovieById(movieId){
    const rawSearchedMovie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko`, options);
    const searchedMovie = await rawSearchedMovie.json();
    return searchedMovie;
}


export {getMovieData, getMovieByTitle, getMovieById}


//영화 장르 id 가져오기
// async function getMovieGenreList(){
//     try{
//         const rawGenreList = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ko', options);
//         const parsedGenreList = await rawGenreList.json();
//         const genreListObj = parsedGenreList.genres;

//         return genreListObj;
//     } catch(err) { 
//         throw(err); 
//     }
// }