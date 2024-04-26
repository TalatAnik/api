import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getAll(req, res, next) {
    let body = req.body

    const users = await prisma.user.findMany({
        include: {
            Orders: true,
            Reviews: true
        }
    })
    req.result = users
    next()
}

async function create( req, res, next) {
    let body = req.body

    const existingUser = await prisma.user.findFirst({
         where: {
                OR: [
                    { email: body.email },
                    { studentID: body.studentID }
                ]
            }
    })
    if(existingUser!==null) {
        return res.status(401).json({error: "User email already exists"})
    }

    const user = await prisma.user.create({ 
    data: body
  })
  req.result = user
  next()
}

async function getById (req, res, next){

    const user = await prisma.user.findUnique({
        where: {
            studentID: req.params.id
        }
    })
    req.result = user
    next()
}

async function login (req, res){
     const { studentID, password } = req.body

     try {
        // Query the database for a user with the provided studentID
        const user = await prisma.user.findUnique({
            where: { studentID }
        });

        // If user not found, return an error response
        if (!user) {
            return res.status(401).json({ error: 'Invalid studentID or password' })
        }

        // Compare the provided password with the stored hashed password
        // const passwordMatch = await bcrypt.compare(password, user.password);
        const passwordMatch = password === user.password

        // If password doesn't match, return an error response
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid studentID or password' })
        }

        // If authentication is successful, respond with a success message
        res.status(200).json({ message: 'Login successful', user: { studentID: user.studentID, email: user.email } })

    } catch (error) {
        // Handle any errors during the process
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}



export default {
    create,
    getAll,
    getById,
    login
}