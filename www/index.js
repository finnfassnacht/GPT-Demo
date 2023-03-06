//change speed here (more is slower)
SPEED = 90

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
// this function is called when the compute button is pressed
function compute(){
    // display the loader
    document.getElementById("bars-4").style = "display: block; padding-top:5px; padding-bottom:15px;"
    let length = document.getElementById("length").value;
    let prompt = document.getElementById("textarea").innerText;
    document.getElementById("textarea").innerHTML = "";
    // create new (clean) text area
    let prompt_el = document.createElement("span")
    prompt_el.contentEditable = true
    prompt_el.innerText = prompt.trim()
    document.getElementById("textarea").appendChild(prompt_el)

    // send and wait for server in a nice async func
    async function fetcher(prompt){
        // hits up the api
        const response = await fetch("/api/gpt-neo/" + length + "/" + prompt)
        // get data from the server
        const data = await response.json()
        // if a server error comes back 
        if (data.err !== undefined){
            document.getElementById("textarea").innerText = "Internal error (this was not generated)"
            document.getElementById("bars-4").style = "display: none;"
        }
        else{
                // we remove the user prompt from the text for the completion effect
                let llm_res = data.llm
                let new_llm_res = llm_res.substring(prompt.length);

                // LLM text will be here and in yellow
                let spanel = document.createElement("span")
                spanel.contentEditable = true
                spanel.style = "color: yellow;"
                spanel.id = "spanel"
                document.getElementById("textarea").appendChild(spanel)
                // hide the loader
                document.getElementById("bars-4").style = "display: none;"
                // add extra space to to user prompt
                document.getElementById("spanel").innerHTML += " ";
                // typer Writer func makes a cool typing effect 
                let i = 0
                function typeWriter() {
                    if (i < new_llm_res.length) {
                      document.getElementById("spanel").innerHTML += new_llm_res.charAt(i);
                      i++;
                      // speed is defined above
                      // random value 0 to SPEED (SPEED is max value (slowness))
                      setTimeout(typeWriter, (Math.trunc(getRandomArbitrary(0,SPEED))));
                    }
                  }
                  //call type Writer
                typeWriter()
        }
    }
    // call fetcher with user prompt
    fetcher(prompt)
}
