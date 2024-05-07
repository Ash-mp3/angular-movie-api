//imported modules
import express from "express"
import * as dotenv from 'dotenv';

//code from other files
import movieRouter from './routes/movie.routes'

//app config
dotenv.config()
const app = express()

//env
const port = process.env.PORT || 3000

app.use(express.static('../client/dist/client/browser'))

app.get('/test', (req, res) =>{
    res.send('test successful')
})

app.use('/movies', movieRouter)

app.listen(port, () => {
    console.log(`Server up on port: ${port}`)
})