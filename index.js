import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

import { PrismaClient } from '@prisma/client'

// import { PrismaClient } from '@prisma/client'

const app = express()
app.use(express.json())
app.use(helmet())
app.use(bodyParser.json())
app.use(cors({origin: '*'}))


const prisma = new PrismaClient()


app.listen(5000, () => {
  console.log(`Listening on port 50000`)
})


app.get(
  '/',
  async (req, res) => {
    return res.json({messageL: "Hello World!"})
  }  
)

app.get(
  '/users',
  async (req, res) => {
    const posts = await prisma.user.findMany({
      
    })
    res.json(posts)
  }  
)