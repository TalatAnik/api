import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAll() {
    let body = req.body

    const users = await prisma.user.findMany({})
    req.result = users
    next()
}

async function create() {
    let body = req.body

    const existingUser = await prisma.user.findUnique({
        where: {
            studentID: body.data.studentID
        }
    })
    if(existingUser.length!==0) {
        return res.status(401).send("User email already exists")
    }

    const user = await prisma.user.create({ 
    data: body.data
  })
  req.result = user
  next()
}



export default {
    create,
    getAll
}