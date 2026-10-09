import rawData from "../../temas_redacao_enem_2026_100.json";

export type RedacaoTopic = (typeof rawData.temas)[number];
export const redacaoTopics = rawData.temas;
