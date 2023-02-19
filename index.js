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
app.use("/api", router)
// set up routs
router.get("/gpt-neo/:maxlen/:prompt", (request,response) => {
    // get params in route from user
    let clientprompt = request.params.prompt
    let maxlen = request.params.maxlen
    // async funtion that calls the python llm script
    async function llm2(prompt){
        console.log("User Prompt: (max length: " + maxlen + ") " + prompt)
        let command = 'TRANSFORMERS_VERBOSITY=error python3 LLM.py ' + maxlen + ' "' + prompt + '"' 
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
            console.log("GPT-Neo response : " + output)
        })

    }
    // calls the async function
    llm2(clientprompt)
    
})
app.listen(PORT,() => {
    console.log("Server is running! @ http://127.0.0.1:3000")
    console.log("API route @ http://127.0.0.1:3000/api/gpt-neo/maxlength/prompt")
})
