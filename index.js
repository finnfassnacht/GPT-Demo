// import all modules
const express = require("express")
// set basic server options
PORT = 3000
const app = express()
// host a html doc in /www
app.use(express.static("www"))
// use json format for get and post
app.use(express.json())
// bundels all routes to a main route
const router = express.Router()
app.use("/maschine", router)
// set up routs
router.get("/LLM", (request,response) => {
    response.send("hello world")
    response.end()
})
app.listen(PORT,() => {
    console.log("server is running! @ http://127.0.0.1:3000")
})
