import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/shared/navigations/auths/login/views/login/login.component';
import { NavbarViewComponent } from './pages/shared/navigations/navbar/views/navbar-view/navbar-view.component';
import { EventosListComponent } from './pages/modules/eventos/views/eventos-list/eventos-list.component';
import { EventosManageComponent } from './pages/modules/eventos/views/eventos-manage/eventos-manage.component';
import { SubeventosListComponent } from './pages/modules/eventos/views/subeventos-list/subeventos-list.component';
import { SubeventosManageComponent } from './pages/modules/eventos/views/subeventos-manage/subeventos-manage.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: NavbarViewComponent,
    children: [

      {
        path: 'eventos',
        children: [
          { path: 'list', component: EventosListComponent },
          { path: 'manage', component: EventosManageComponent, }
        ],
      },
      {
        path: 'subeventos',
        children: [
          { path: 'list', component: SubeventosListComponent },
          { path: 'manage', component: SubeventosManageComponent, },
        ],
      },
      /* {
        path: 'hoteles',
        children: [
          { path: 'list', component: ListHotelesComponent },
          { path: 'administrate', component: AdministrateHotelesComponent },
        ],
      },
      {
        path: 'habitaciones',
        children: [
          { path: 'list', component: ListHabitacionesComponent },
          {
            path: 'administrate',
            component: AdministrateHabitacionesComponent,
          },
        ],
      },
      {
        path: 'restaurantes',
        children: [
          { path: 'list', component: ListRestaurantesComponent },
          {
            path: 'administrate',
            component: AdministrateRestaurantesComponent,
          },
        ],
      },
      {
        path: 'menus',
        children: [
          { path: 'list', component: ListMenusComponent },
          { path: 'administrate', component: AdministrateMenusComponent },
        ],
      },
      {
        path: 'agencias',
        children: [
          { path: 'list', component: ListAgenciasComponent },
          { path: 'administrate', component: AdministrateAgenciasComponent },
        ],
      },
      {
        path: 'tours',
        children: [
          { path: 'list', component: ListToursComponent },
          { path: 'administrate', component: AdministrateToursComponent },
        ],
      },
      {
        path: 'departamentos',
        children: [
          { path: 'list', component: ListDepartamentoComponent },
          {
            path: 'administrate',
            component: AdministrateDepartamentoComponent,
          },
        ],
      }, */
      /*  {
         path: 'subeventos',
         children: [
           { path: 'list', component: ListSubEventosComponent },
           {
             path: 'administrate',
             component: AdministrateSubEventosComponent,
           },
         ],
       }, */
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
