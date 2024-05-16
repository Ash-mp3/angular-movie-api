//imported modules
import express, { response } from "express"
import * as dotenv from 'dotenv';

//code from other files
import getSimilarMovies from "../functions/getSimilarMovies";
import { error } from "console";

//app config
dotenv.config()
const movieRouter = express.Router()

//env
const movieApiKey = process.env.MOVIE_API_KEY



const searchMovieUrl = 'https://api.themoviedb.org/3/search/movie?query='
const movieApiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const movieApiHeaders = new Headers();
movieApiHeaders.append('accept', 'application/json');
movieApiHeaders.append('Authorization', `Bearer ${movieApiKey}`);

const millisecondsInDay: number = 1000 * 60 * 60 * 24
let lastMovieUpdate: number = Date.now()

let movies: any[] = []
let queriedMovies: any[] = []
updateMovies()


async function updateMovies() {
    fetch(movieApiUrl, {
        method: 'GET',
        headers: movieApiHeaders,
    }
    ).then(response => {
        if (!response.ok) {
            throw new Error('Api response not OK')
        }
        return response.json()
    }).then((data: any) => {
        movies = data.results
        lastMovieUpdate = Date.now()
    }).catch(error => {
        console.log(error)
    })
}


function getMovie(id: number){
    let foundMovie = movies.find(movie => movie.id === id)

    if(foundMovie === undefined){
        const movieApiHeaders = new Headers();

        const movieApiUrl = `https://api.themoviedb.org/3/movie/${id}`
        movieApiHeaders.append('accept', 'application/json');
        movieApiHeaders.append('Authorization', `Bearer ${movieApiKey}`);

        fetch(movieApiUrl, {
            method: 'GET',
            headers: movieApiHeaders,
        }).then(response => {
            if(!response.ok){
                throw new Error('Api response not OK')
            }
            return response.json()

        }).then((data: any) => {
            let genre_ids: any[] = []
            data.genre_ids.forEach((item: any) => {
                genre_ids.push(item.id)
            });

            const formattedMovie = {
                adult: data.adult,
                backdrop_path: data.backdrop_path,
                genre_ids: genre_ids,
                id: id,
                original_language: data.original_language,
                original_title: data.original_title,
                overview: data.overview,
                popularity: data.popular,
                poster_path: data.poster_path,
                release_date: data.release_date,
                title: data.title,
                video: false,
                vote_average: data.vote_average,
                vote_count: data.vote_count
            }

            foundMovie = formattedMovie
        }).catch(error => {
            console.log(error)
        })
    }

    return(foundMovie)
}


movieRouter.get("/getMovies", (req, res) => {
    //time in milliseconds since last movie update
    const timeSinceLastMovieUpdate = Date.now() - lastMovieUpdate

    //if the amount of time since last movie update is greater than 1 day, update movies before sending the response
    if (timeSinceLastMovieUpdate > millisecondsInDay) {
        updateMovies().then(() => {
            res.send(movies)
        })
    } else {
        res.send(movies)
    }
})




movieRouter.get("/getMovie", (req, res) => {

    const id = Number(req.query.id)
    console.log(req.query.includeSimilarMovies)
    const includeSimilarMovies = req.query.includeSimilarMovies === "false" ? false : true

    let formattedMovieResponse = {}

    const selectedMovie = movies.find(movie => movie.id === id)
    if (includeSimilarMovies) {
        const similarMovies = getSimilarMovies(id, movies)
        formattedMovieResponse = {
            selectedMovie: selectedMovie,
            similarMovies: similarMovies,
        }
    } else {
        formattedMovieResponse = {
            selectedMovie: selectedMovie,
        }
    }
    res.send(formattedMovieResponse)
    if(typeof(id) === "number"){
        const includeSimilarMovies = req.query.includeSimilarMovies==="false"?false:true
        let formattedMovieResponse = {}
    
        let selectedMovie = getMovie(id)
    
        if(includeSimilarMovies){
            const similarMovies = getSimilarMovies(id, movies)
            formattedMovieResponse = {
                selectedMovie: selectedMovie,
                similarMovies: similarMovies,
            }
        } else {
            formattedMovieResponse = {
                selectedMovie: selectedMovie,
            }
        }
        res.send(formattedMovieResponse)
    }

})

movieRouter.get("/searchMovies", (req, res) => {
    const searchQuery = String(req.query.query)
    const searchedMovies = getSearchedMovies(searchQuery)
    res.send(searchedMovies)
})




export default movieRouter