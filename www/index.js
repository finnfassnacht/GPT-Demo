function user_send(){
    let prompt = document.getElementById("user_in").value;
    let maxlen = document.getElementById("maxlen").value;
    async function fetcher(prompt){
        const response = await fetch("/api/gpt-neo/" + maxlen + "/" + prompt)
        const data = await response.json()
        if (data.err !== undefined){
            document.getElementById("text").innerText = "Internal error (this is not generated)"
        }
        else{
            let llm_res = data.llm
            document.getElementById("text").innerText = llm_res;
        }
    }
    fetcher(prompt)
}
function user_continue(){
    let prompt = document.getElementById("text").textContent;
    let maxlen = document.getElementById("maxlen").value;
    async function fetcher(prompt){
        const response = await fetch("/api/gpt-neo" + "/" + maxlen + "/" + prompt)
        const data = await response.json()
        if (data.err !== undefined){
            document.getElementById("text").innerText = "Internal error (this is not generated)"
        }
        else{
            let llm_res = data.llm
            document.getElementById("text").innerText = llm_res;
        }
    }
    fetcher(prompt)
}
