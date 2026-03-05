const chat=document.getElementById("chat")
const input=document.getElementById("input")

function addMessage(text,type){

const div=document.createElement("div")

div.className="message "+type

div.innerText=text

chat.appendChild(div)

chat.scrollTop=chat.scrollHeight

}

function newChat(){

chat.innerHTML=""

}

async function sendMessage(){

const text=input.value

if(!text)return

addMessage(text,"user")

input.value=""

const loading=document.createElement("div")

loading.className="message bot"

loading.innerText="AI denkt..."

chat.appendChild(loading)

const res=await fetch("/api/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:text
})

})

const data=await res.json()

loading.remove()

typeWriter(data.reply)

speak(data.reply)

}

function typeWriter(text){

let i=0

const div=document.createElement("div")

div.className="message bot"

chat.appendChild(div)

const interval=setInterval(()=>{

div.innerText=text.substring(0,i)

i++

if(i>text.length){
clearInterval(interval)
}

chat.scrollTop=chat.scrollHeight

},15)

}

function speak(text){

const speech=new SpeechSynthesisUtterance(text)

speech.lang="pt-PT"

speechSynthesis.speak(speech)

}

function startVoice(){

const recognition=new webkitSpeechRecognition()

recognition.lang="nl-NL"

recognition.start()

recognition.onresult=function(e){

input.value=e.results[0][0].transcript

sendMessage()

}

}

input.addEventListener("keypress",function(e){

if(e.key==="Enter")sendMessage()

})
