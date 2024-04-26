import express from 'express'
import admin from "../controllers/admins.controller.js"

const router = express.Router()


router
    .get(
        "/all",
        admin.getAll,
        async (req, res) => {
            return res.json(req.result)
        }
    )    
    .get(
        "/:name",
        admin.getByName, 
        async (req, res) => {
            return res.json(req.result)
        }        
    )
    .post(
        "/create",
        admin.create
    )
    .post(
        "/login",
        admin.login
    )
    .patch(
        "/update",
        admin.updateAdmin,
        async (req, res) => {
            
        }
    )






export default router