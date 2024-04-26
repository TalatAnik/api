import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

import users from "./src/routes/users.route.js"
import restaurants from "./src/routes/restaurants.route.js"
import admins from "./src/routes/admins.route.js"


const app = express()
app.use(express.json())
app.use(helmet())
app.use(bodyParser.json())
app.use(cors({origin: '*'}))



app.listen(5000, () => {
  console.log(`Listening on port 5000`)
})


app.use("/users", users)
app.use("/restaurants", restaurants)
app.use("/admin", admins)