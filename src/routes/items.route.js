import express from 'express'
import item from "../controllers/items.controller.js"

const router = express.Router()


router
    .get(
        "/all",
        item.getAll,
        async (req, res) => {
            return res.json(req.result)
        }
    )
    .get(
        "/shop/:id",
        item.getByRestaurantID
    )   
    .get(
        "/:id",
        item.getByItemID       
    )
    .post(
        "/create",
        item.create
    )
    .patch(
        "/update",
        item.updateItem,
        async (req, res) => {
            
        }
    )






export default router