export interface Noticias {
  id?: number | null,
  urlNoticia?: string,
  textoNoticia?: string,
  imagemDivulgacao?: string,
  titulo?: string,
  dataPublicacao?: string | Date,
  ultimaAtualizacao?: string | Date,
  autor?: string
}
