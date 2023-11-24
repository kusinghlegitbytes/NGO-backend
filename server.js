const app=require("express")()
const userRoutes=require("./route/user.js")
const connectDB=require("./util/db.js")
require("dotenv").config()
connectDB()
app.use("/api/v1/users", userRoutes)
app.listen(process.env.PORT_NUMBER, ()=>{
    console.log(`Server running at ${process.env.PORT_NUMBER}`)
})