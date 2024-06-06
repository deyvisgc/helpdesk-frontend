import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/pages/inicio',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',  
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/pages/admin',
    title: 'Administracion',
    icon: 'fa-solid fa-users', 
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/pages/requerimients',
    title: 'Requerimientos',
    icon: 'fa-solid fa-clipboard',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/pages/help',
    title: 'Ayuda',
    icon: 'fa fa-question-circle',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/pages/proposal',
    title: 'Propuesta',
    icon: 'fa-solid fa-file-invoice',
    class: '',
    extralink: false,  
    submenu: []
  }
];
