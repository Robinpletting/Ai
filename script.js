async function sendMessage(){

let input = document.getElementById("userInput").value
let chatbox = document.getElementById("chatbox")

chatbox.innerHTML += `<p class="user">Jij: ${input}</p>`
chatbox.innerHTML += `<p class="ai">AI denkt...</p>`

const response = await fetch("/api/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
messages:[
{role:"system",content:"Je helpt mensen Portugees leren op een leuke manier"},
{role:"user",content:input}
]
})
})

const data = await response.json()

let ai = data.choices[0].message.content

chatbox.innerHTML += `<p class="ai">${ai}</p>`

}
