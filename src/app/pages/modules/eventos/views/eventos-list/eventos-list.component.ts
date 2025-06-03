import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { EventoService } from '../../services/eventosService';

import { FilterEvento } from '../../models/FilterEvento';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ConstantEvents } from '../../eventos.constant';
import { AuthorizationService } from '../../../../shared/global-components/authorization/auth.service';
import { LoadingService } from '../../../../shared/global-components/loadings/loading-service.service';


@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrl: './eventos-list.component.scss'
})
export class EventosListComponent implements OnInit {
  productDialog: boolean = false;
  bool_loadingtable: boolean = false;


  list_types: any[] = [{ name: 'Festividad', value: 'Festividad' }, { name: 'Evento', value: 'Evento' }]
  listFilter: any[];



  itemSelected: FilterEvento; // 


  filter: FilterEvento = new FilterEvento(); // Filtros de busqueda

  items: MenuItem[] = [
    {
      label: 'Ver',
      icon: 'pi pi-eye',
      command: () => {
        this.coreView()
      },
    },
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => {
        this.coreEdit()
      },
    },
    /*  {
       label: 'Duplicar',
       icon: 'pi pi-trash',
       command: () => {
         this.coreDuplicate()
       },
     }, */
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => {
        this.coreDelete()
      },
    }

  ];

  constructor(
    private eventoService: EventoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.coreSearch()

  }

  coreSearch() {
    this.loading.show();
    this.listFilter = [];

    this.eventoService.search(this.filter).subscribe(
      (response) => {
        this.loading.hide();
        this.filter = response;
        this.formularioOninit = false;
        this.listFilter = response.paginationresult.result;
      });
  }

  coreNew() {
    const dataSave = { action: 'NEW', data: this.itemSelected };
    this.authorizationService.setLocalData(dataSave);
    this.router.navigate([ConstantEvents.event_manage])
  }

  coreView() {
    const dataSave = { action: 'VIEW', data: this.itemSelected };
    this.authorizationService.setLocalData(dataSave);
    this.router.navigate([ConstantEvents.event_manage])
  }

  coreEdit() {
    const dataSave = { action: 'EDIT', data: this.itemSelected };
    this.authorizationService.setLocalData(dataSave);
    this.router.navigate([ConstantEvents.event_manage])
  }

  coreDuplicate() {
    const dataSave = { action: 'DUPLICATE', data: this.itemSelected };
    this.authorizationService.setLocalData(dataSave);
    this.router.navigate([ConstantEvents.event_manage])
  }

  coreDelete() {
    this.confirmationService.confirm({
      message: 'Está seguro de borrar?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.eventoService.delete(this.itemSelected).subscribe(
          (response) => {
            this.messageService.add({ severity: 'success', summary: 'Agregado Correctamente', detail: '', life: 3000 });
            this.coreSearch()
          },
          (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error al Agregar', detail: '', life: 3000 });
          }
        );

      }
    });
  }

  clearFilter() {
    this.filter = new FilterEvento();
    this.coreSearch()
  }

  formularioOninit: boolean = true;
  // ------------ PAGINATION -------------------\\
  onPageChange(event: TableLazyLoadEvent) {
    // Actualiza la página y tamaño
    if (this.formularioOninit == true) return;
    this.filter.paginationresult.paginacioninicio = event.first;
    this.filter.paginationresult.result = []
    this.coreSearch();
  }
  modifyItems() {
    /* if (this.itemSelected.flagDisponible == true) {
      
    } else {
      this.items = [
        {
          label: 'Editar',
          icon: 'pi pi-eye',
          command: () => {
            this.coreEdit()
          },
        },
      ];
    } */

  }
}
