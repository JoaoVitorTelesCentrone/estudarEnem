import rawCatalog from "../../questoes_educacao_fisica_enem_2015_2025.json";

export type CatalogQuestion = (typeof rawCatalog.questoes)[number];
export const catalog = rawCatalog.questoes;
export const catalogStatus = rawCatalog.escopo.status;
