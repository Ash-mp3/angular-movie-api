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

async function getSearchedMovies(query: string) {
    let queriedUrl = searchMovieUrl + query
    fetch(queriedUrl, {
        method: 'GET',
        headers: movieApiHeaders,
    }).then(response => {
        if (!response.ok) {
            throw new Error('Api response not OK')
        }
        return response.json()
    }).then((data: any) => {
        queriedMovies = data.results
    }).catch(error => {
        console.error(error)
    })
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
})

movieRouter.get("/searchMovies", (req, res) => {
    const searchQuery = String(req.query.query)
    const searchedMovies = getSearchedMovies(searchQuery)
    res.send(queriedMovies)
})




export default movieRouter