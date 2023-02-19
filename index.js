// import all modules
const express = require("express")
const { exec } = require('node:child_process')
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
router.get("/LLM/:prompt", (request,response) => {
    // get params in route from user
    let clientprompt = request.params.prompt
    // async funtion that calls the python llm script
    async function llm2(prompt){
        let command = 'python3 LLM.py "' + prompt + '"' 
        exec(command, (err, output) => {
            // when the command is done 
        
            if (err) {
                // if error
                response.send({
                    "err":true
                })
                response.end()
                return
            }
        
            // sends received data from the llm
            response.send({
                "user":clientprompt,
                "llm":output
            })
            response.end()
        })

    }
    // calls the async function
    llm2(clientprompt)
    
})
app.listen(PORT,() => {
    console.log("server is running! @ http://127.0.0.1:3000")
})
