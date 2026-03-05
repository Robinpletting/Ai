export default async function handler(req,res){

const {message}=req.body

const response=await fetch(
"https://api.openai.com/v1/chat/completions",
{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+process.env.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
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[

{
role:"system",
content:"Je bent een slimme AI die helpt met Portugees leren en vragen beantwoorden."
},

{
role:"user",
content:message
}

]

})

})

const data=await response.json()

res.status(200).json({

reply:data.choices[0].message.content

})

}
