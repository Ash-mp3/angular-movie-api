import express from "express"
import * as dotenv from 'dotenv';
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('../client/dist/client/browser'))

app.listen(port, () => {
    console.log(`Server up on port: ${port}`)
})