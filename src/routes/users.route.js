import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// import * as users from "../controllers/users.controller.js"

const router = express.Router()


router
    .get(
        "/all",
        async (req, res) => {
            let body = req.body

            const users = await prisma.user.findMany({})
            req.result = users

            return res.json(req.result)
        }
    )
    .post(
        "/create",
        
        async (req, res) => {
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

            return res.json({
                message: "Successfully created user",
                data: req.result
            })
        }
    )
    .get(
        "/:id",
        
    )






export default router