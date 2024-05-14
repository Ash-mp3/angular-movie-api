

export default function getSimilarMovies(id: number, movies: any[]){

    let similarMovies: any[] = []

    const selectedMovie = movies.find(movie => movie.id === id)
    const selectedMovieGenres: any = selectedMovie.genre_ids


    //loop through each movie and only include them if their genres = the selected movie genre
    movies.forEach(movie => {
      selectedMovieGenres.forEach((genre: any) => {
        if(
          movie.genre_ids.indexOf(genre) !== -1
          && movie.id !== id
        ){
          similarMovies.push(movie.id)
        }
      })
    });

    //get unique movies and put them in an object 
    //where we can associate their id with a matchStrength
    let uniqueMovies = [...new Set(similarMovies)]
    uniqueMovies.forEach((id, index) => {
      uniqueMovies[index] = {
        id: id,
        matchStrength: 0
      }
    })

    //give each movie a match strength
    uniqueMovies.forEach(movie => {
      let count = 0
      similarMovies.forEach(similarMovie => {
        if(similarMovie === movie.id){
          count++
        }
      })
      movie.matchStrength = count
    })


    //sort the movies based on match strength
    uniqueMovies.sort((a, b) => {
      return b.matchStrength - a.matchStrength;
    })


    //if the lenght of the unique movies is less than 6, push extra movies
    if(uniqueMovies.length < 6){
      movies.forEach((movie) => {
        if(uniqueMovies.length < 6){
          let duplicate = false
          uniqueMovies.forEach(matchingMovie => {
            if(matchingMovie.id === movie.id){
              duplicate = true
            }
          })
          if(!duplicate){
            uniqueMovies.push({
              id: movie.id,
              matchStrength: 0
            })
          }
        }
      })
    }



    //get the first 6 movies (which will be the ones with the highest match strength)
    //and push the full movie object to the formattedMovieResponse

    let formattedMovieResponse: any[] = []

    for(let i=0; i<6; i++){
      const movieId = uniqueMovies[i].id
      const fullMovie = movies.find(movie => movie.id === movieId)
      formattedMovieResponse.push(fullMovie)
    }

    return(formattedMovieResponse)
  }