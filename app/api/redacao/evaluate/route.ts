import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Provider = "gemini" | "openai";

const getTextFromOpenAI = (data: { output_text?: string; output?: { content?: { text?: string }[] }[] }) => {
  if (data.output_text) return data.output_text;
  return data.output?.flatMap((item) => item.content ?? []).map((part) => part.text ?? "").join("\n").trim() ?? "";
};

const promptFor = (topic: { titulo: string; enunciado: string }, essay: string) => `
Você é um professor brasileiro de redação e deve avaliar um texto dissertativo-argumentativo no estilo ENEM.
Tema: ${topic.titulo}
Orientação do tema: ${topic.enunciado}

Texto do estudante:
${essay}

Faça uma devolutiva pedagógica em português do Brasil. Não diga que a nota é oficial e não invente citações.
Organize exatamente nestas seções:
NOTA ESTIMADA (0 a 1000)
COMPETÊNCIAS (C1 a C5, com uma estimativa de 0 a 200 para cada)
PONTOS FORTES
PONTOS A MELHORAR
PRÓXIMO PASSO
Explique cada recomendação com base no texto enviado. Seja direto, respeitoso e útil.
`;

async function evaluateWithOpenAI(prompt: string, apiKey: string) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [{ role: "user", content: [{ type: "input_text", text: prompt }] }],
      max_output_tokens: 1600,
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message ?? "Não foi possível avaliar com OpenAI.");
  return getTextFromOpenAI(data);
}

async function evaluateWithGemini(prompt: string, apiKey: string) {
  const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 1600 },
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message ?? "Não foi possível avaliar com Gemini.");
  return data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? "").join("\n").trim() ?? "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { provider?: Provider; essay?: string; topic?: { titulo?: string; enunciado?: string } };
    const provider = body.provider === "openai" ? "openai" : "gemini";
    const essay = body.essay?.trim() ?? "";
    const topic = { titulo: body.topic?.titulo?.trim() ?? "", enunciado: body.topic?.enunciado?.trim() ?? "" };

    if (!topic.titulo || !essay) return NextResponse.json({ error: "Escolha um tema e envie sua redação antes de avaliar." }, { status: 400 });
    if (essay.length < 80) return NextResponse.json({ error: "Escreva pelo menos 80 caracteres para receber uma análise útil." }, { status: 400 });
    if (essay.length > 20000) return NextResponse.json({ error: "O texto ultrapassa o limite de 20.000 caracteres." }, { status: 400 });

    const prompt = promptFor(topic, essay);
    const apiKey = provider === "openai" ? process.env.OPENAI_API_KEY : process.env.GEMINI_API_KEY;
    if (!apiKey) return NextResponse.json({ error: `Configure a chave do ${provider === "openai" ? "OpenAI" : "Gemini"} no arquivo .env.local para habilitar esta avaliação.` }, { status: 503 });

    const evaluation = provider === "openai" ? await evaluateWithOpenAI(prompt, apiKey) : await evaluateWithGemini(prompt, apiKey);
    if (!evaluation) throw new Error("O avaliador não retornou uma análise.");
    return NextResponse.json({ evaluation, provider });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Não foi possível avaliar sua redação agora." }, { status: 502 });
  }
}
