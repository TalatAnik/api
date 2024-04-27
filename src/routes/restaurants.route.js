import express from 'express'
import restaurants from '../controllers/restaurants.controller.js'

const router = express.Router()

router
    .get(
        "/all",
        restaurants.getAll,
        async (req, res) => {
            return res.json(req.result)
        }
    )    
    .get(
        "/:id",
        restaurants.getById, 
        async (req, res) => {
            return res.json(req.result)
        }        
    )
    .post(
        "/create",
        restaurants.create,
        async (req, res) => {
            res.json(req.result)
        }
    )
    .post(
        "/login",
        restaurants.login
    )
    .post(
        "/addItem/:restID",
        restaurants.addItem
    )


export default router