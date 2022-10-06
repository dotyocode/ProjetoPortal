export const navbarData = [
  {
    routerLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Home',
  },
  {
    routerLink: 'painel-admin',
    icon: 'bi bi-person-video2',
    label: 'Painel de Administrador',
    subitems: [
      {
        routerLink: 'painel-admin/cadastrar/curso',
        icon: 'bi bi-play-btn-fill',
        label: 'Adicionar Curso',
      }
    ]
  },
  {
    routerLink: 'conteudos-gratuitos',
    icon: 'bi bi-collection-play-fill',
    label: 'Conteúdos gratuito',
  },
  {
    routerLink: 'ferramentas',
    icon: 'bi bi-tools',
    label: 'Ferramentas',
  },
]
