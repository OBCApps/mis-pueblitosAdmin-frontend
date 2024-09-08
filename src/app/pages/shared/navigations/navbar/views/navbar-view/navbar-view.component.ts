
import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-navbar-view',
  templateUrl: './navbar-view.component.html',
  styleUrl: './navbar-view.component.scss'
})
export class NavbarViewComponent implements OnInit {

  isSidebarVisible: boolean = false; // El sidebar estará oculto por defecto

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  sidebarItems: any[] = [
    {
      name: 'Inicio',
      route: '/home',
      icon: 'pi pi-home'
    },
    {
      name: 'Mis Cursos',
      route: '/home/courses',
      icon: 'pi pi-book'
    },
    {
      name: 'Matrícula',
      route: '/home/matricula',
      icon: 'pi pi-pen-to-square'
    },
    {
      name: 'Material Didáctico',
      route: '/home/material',
      icon: 'pi pi-address-book'
    },
    {
      name: 'Placement / Asesorias',
      route: '/home/placement',
      icon: 'pi pi-video'
    },
    {
      name: 'Tramites y solicitudes',
      route: '/home/tramites',
      icon: 'pi pi-file'
    },
    {
      name: 'Mi Convenio',
      route: '/home/convenios',
      icon: 'pi pi-server'
    },
    {
      name: 'Exámenes Internacionales',
      route: '/home/exam-internationals',
      icon: 'pi pi-file-check'
    }

  ]

  constructor() { }

  ngOnInit(): void {

  }


}
