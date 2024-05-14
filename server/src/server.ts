//imported modules
import express from "express"
import * as dotenv from 'dotenv';
import cors from 'cors'

//code from other files
import movieRouter from './routes/movie.routes'

//app config
dotenv.config()
const app = express()
app.use(cors());

//env
const port = process.env.PORT || 3000

app.use(express.static('../client/dist/client/browser'))

app.get('/test', (req, res) =>{
    res.send('test successful')
})

app.use('/api', movieRouter)

app.listen(port, () => {
    console.log(`Server up on port: ${port}`)
})