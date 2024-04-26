import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import users from "../controllers/users.controller.js"

const router = express.Router()


router
    .get(
        "/all",
        users.getAll,
        async (req, res) => {
            return res.json(req.result)
        }
    )    
    .get(
        "/:id",
        users.getById, 
        async (req, res) => {
            return res.json(req.result)
        }        
    )
    .post(
        "/create",
        users.create,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .post(
        "/login",
        users.login
    )






export default router