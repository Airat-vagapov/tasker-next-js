import axios from "axios"

export const generateText = async () => {
   let result;
   await axios.post('/api/ai/generate', {
            'prompt': 'Расскажи анекдот',
            "model": "gemini-2.5-flash",
            "temperature": 0.7,
            "max_output_tokens": 1000
        })
   .then(res => {
    result =  res.data.generated_text
   })
   .catch(err => {
      console.error(err)
   })

   return result
}