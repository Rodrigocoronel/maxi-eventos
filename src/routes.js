import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Cargando...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const ControlDeUsuarios = Loadable({
  loader: () => import('./views/Usuarios/Registro'),
  loading: Loading,
});

const RegistroUsuarios = Loadable({
  loader: () => import('./views/Usuarios/Registro/form'),
  loading: Loading,
});

const Form = Loadable({
  loader: () => import('./views/Dashboard/form.js'),
  loading: Loading,
});

const Logout = Loadable({
  loader: () => import('./views/Usuarios/Logout'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/app/', exact: true, name: 'Ingresar', component: DefaultLayout },         // Login
  { path: '/app/dashboard', exact: true , name: 'Inicio', component: Dashboard },                 // Ventana principal
  { path: '/app/dashboard/edit/:id',exact: true, name: 'Edit Registro', component:Form },
  { path: '/app/dashboard/agregar', exact: true , name: 'Agregar Registro', component:Form },
  { path: '/app/usuarios', exact: true,name: 'Usuarios', component: ControlDeUsuarios },          // lista de usuarios
  { path: '/app/usuarios/registro',exact: true, name: 'Registro' , component: RegistroUsuarios},
  { path: '/app/usuarios/edit/:id',exact: true, name: 'Editar' , component: RegistroUsuarios},
  { path: '/app/logout', name: 'Logout', component: Logout },                       // Logout
];

export default routes;
