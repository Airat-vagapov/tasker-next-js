import axios from "axios"

export const generateText = async (prompt: string) => {
   try {
      const response = await axios.post('/api/ai/generate', {
            'prompt': `Сделай описание задачи по названию - ${prompt}`,
            "model": "gemini-2.5-flash",
            "temperature": 0.7,
            "max_output_tokens": 1000
        })
        return response.data.generated_text
   } catch (error) {
      console.error('Ошибка генерации текста:', error)
      throw error;
   }
}