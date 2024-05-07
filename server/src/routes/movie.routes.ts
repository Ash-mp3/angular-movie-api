//imported modules
import express from "express"
import * as dotenv from 'dotenv';
const movieRouter = express.Router()

//code from other files



movieRouter.get("/getMovies", (req, res) => {
    res.send([
        {
            movie: 'a' 
        },
        {
            movie: 'b' 
        },
        {
            movie: 'c' 
        }
    ])
})

export default movieRouter
