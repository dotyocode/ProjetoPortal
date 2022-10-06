import { Professor } from './professor';

export interface Cursos {
  id?: number | null,
  nome?: string,
  descricao?: string,
  imagemDivulgacao?: string,
  imagemCapa?: string,
  professor?: Professor | null,
}
