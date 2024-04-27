import {
    PrismaClient
} from '@prisma/client'
import {
    connect
} from 'http2'

const prisma = new PrismaClient()

async function getAll(req, res, next) {
    let body = req.body

    const restaurants = await prisma.restaurant.findMany({
        include: {
            items: true
        }
    })
    req.result = restaurants
    next()
}

async function create(req, res, next) {
    let body = req.body

    const existingRest = await prisma.restaurant.findFirst({
        where: {
            name: body.name
        }
    })
    if (existingRest !== null) {
        return res.status(401).json({
            error: "Restaurant name already exists"
        })
    }

    const restaurant = await prisma.restaurant.create({
        data: body
    })
    req.result = restaurant
    next()
}

async function getById(req, res, next) {

    const rest = await prisma.restaurant.findUnique({
        where: {
            id: req.params.id,
        },
        include: {
            items: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    images: true,
                    price: true,
                    offerPrice: true,
                    rating: true
                }
            }
        }
    })
    req.result = rest
    next()
}



async function login(req, res) {
    const {
        name,
        password
    } = req.body

    try {
        // Query the database for a user with the provided studentID
        const user = await prisma.restaurant.findUnique({
            where: {
                name: name
            }
        });

        // If user not found, return an error response
        if (!user) {
            return res.status(401).json({
                error: 'Invalid name or password'
            })
        }

        // Compare the provided password with the stored hashed password
        // const passwordMatch = await bcrypt.compare(password, user.password);
        const passwordMatch = password === user.password

        // If password doesn't match, return an error response
        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Invalid name or password'
            })
        }

        // If authentication is successful, respond with a success message
        res.status(200).json({
            message: 'Login successful',
            user: user
        })

    } catch (error) {
        // Handle any errors during the process
        console.error('Error during login:', error);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}

async function addItem(req, res) {
    let body = req.body

    try {
        const newItem = await prisma.item.create({
            data: {
                ...body,
                owner: {
                    connect: {
                        id: req.params.restID
                    }
                }
            }
        })

        res.status(200).json({
            message: 'Item added succesfully',
            item: newItem
        })
    } catch (e) {
        console.error('Error during login:', e);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}

export default {
    create,
    getAll,
    getById,
    login,
    addItem
}