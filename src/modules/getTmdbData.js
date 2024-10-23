const getOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTk3MWI0ZGMyMTA5MDA4ZjVhODQxNWE0MWU1ZDRkZiIsIm5iZiI6MTcyODk1NzQ5Ny43MTY1NTQsInN1YiI6IjY3MGRjOTRjZDVmOTNhM2RhMGJjMDk5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IQ6oPN2xdf8N6-EHhbCSYq1I7X8Cksc0JHcVqxxKWOA'
    }
};

async function getPopularMovie(){
    try{
        const rawMovieData = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko&page=1&region=KR', getOptions);
        const parsedMovieData = await rawMovieData.json();
        const movieData = parsedMovieData.results;

        return movieData;
    } catch(err) { 
        throw(err);
    }
}

async function getMovieByTitle(movieTitle, page=1){
    try{
        const rawSearchedMovie = await fetch(`https://api.themoviedb.org/3/search/movie?language=ko&page=${page}&query=${movieTitle}`, getOptions);
        const searchedMovies = await rawSearchedMovie.json();

        return searchedMovies;
    } catch(err) { 
        throw(err);
    }
}

async function getMovieById(movieId){
    try{
        const rawSearchedMovie = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko`, getOptions);
        const searchedMovie = await rawSearchedMovie.json();

        return searchedMovie;
    } catch(err) { 
        throw(err);
    }
}


export {getPopularMovie, getMovieByTitle, getMovieById}