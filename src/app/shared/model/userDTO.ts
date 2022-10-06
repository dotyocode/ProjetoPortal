export interface UsuarioDTO {
  username?: string,
  nome?: string,
  email?: string,
  foto?: string,
  password?: string,
  tipoUsuario?: string,
  ultimoAcesso?: Date | null,
  dtCadastro?: Date | null
}
