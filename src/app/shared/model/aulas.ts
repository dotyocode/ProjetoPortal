import { Cursos } from './cursoDTO';

export interface Aulas {
  id?: number | null,
  titulo?: string,
  descricao?: string,
  urlVideo?: string,
  curso?: Cursos | null,
}
