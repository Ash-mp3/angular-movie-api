//imported modules
import express, { response } from "express"
import * as dotenv from 'dotenv';

//code from other files

//app config
dotenv.config()
const movieRouter = express.Router()

//env
const movieApiKey = process.env.MOVIE_API_KEY


const movieApiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const movieApiHeaders = new Headers();
movieApiHeaders.append('accept', 'application/json');
movieApiHeaders.append('Authorization', `Bearer ${movieApiKey}`);

let movies: any
fetch(movieApiUrl, {
    method: 'GET',
    headers: movieApiHeaders,
}
).then(response => {
if(!response.ok){
    throw new Error('Api response not OK')
}
return response.json()
}).then((data: any) => {
    movies = data.results
}).catch(error => {
    console.log(error)
})


movieRouter.get("/getMovies", (req, res) => {
    res.send(movies)
})

export default movieRouter


