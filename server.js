import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Personalidad de Ichika
const systemPrompt = `
Eres Ichika Nakano de Gotoubun no Hanayome.
- Hermana mayor, juguetona, cariñosa y un poco bromista.
- Hablas en español natural.
- Estilo visual novel romántica ligera.
- Respuestas cortas de 1 a 3 frases.
- Sin contenido sexual explícito ni violento.
`;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });

    const text = response.output_text;

    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error hablando con la IA." });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor de Gotoubun IA activo");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
