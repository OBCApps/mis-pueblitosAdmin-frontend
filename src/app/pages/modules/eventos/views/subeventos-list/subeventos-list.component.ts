import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SubEventoService } from '../../services/subeventoService';
import { Router } from '@angular/router';
import { FilterSubEvento, } from '../../models/FilterSubEvento';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { ConstantEvents } from '../../eventos.constant';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { DtoSubEvento } from '../../models/DtoSubEvento';
import { PaginationResultDto } from '../../../../shared/global-components/dto/PaginationResultDto';
import { BaseServices } from '../../../../shared/global-components/BaseServices';
import { AuthorizationService } from '../../../../shared/global-components/authorization/auth.service';

@Component({
  selector: 'app-subeventos-list',
  templateUrl: './subeventos-list.component.html',
  styleUrl: './subeventos-list.component.scss'
})
export class SubeventosListComponent implements OnInit {
  productDialog: boolean = false;
  bool_loadingtable: boolean = false;


  list_types: any[] = [{ name: 'Festividad', value: 'Festividad' }, { name: 'Evento', value: 'Evento' }]
  listFilter: any[];



  itemSelected: FilterSubEvento; // 


  filter: FilterSubEvento = new FilterSubEvento(); // Filtros de busqueda

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
    private SubEventoService: SubEventoService,
    private baseServices: BaseServices,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit() {
    this.coreSearch()

  }

  coreSearch() {

    this.baseServices.showLoading();
    this.listFilter = [];

    this.SubEventoService.search(this.filter).subscribe(
      (response) => {
        this.baseServices.hideLoading();
        this.filter = response;
        this.filter.paginationresult.formularioOninit = true; // YA fue iniciado
        this.listFilter = response.paginationresult.result;
      });
  }

  coreNew() {
    const dataSave = { action: 'CREATE', data: this.itemSelected };
    this.authorizationService.setLocalData(dataSave);
    this.router.navigate([ConstantEvents.event_manage])
  }

  coreView() {
    const dataSave = { action: 'VIEW', data: this.itemSelected };
    this.authorizationService.setLocalData(dataSave);
    this.router.navigate([ConstantEvents.event_manage])
  }

  coreEdit() {
    const dataSave = { action: 'UPDATE', data: this.itemSelected };
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

        this.SubEventoService.delete(this.itemSelected).subscribe(
          (response) => {
            this.baseServices.showMessageSucces('Agregado Correctamente');
            this.coreSearch()
          },
          (err) => {
            this.baseServices.showMessageError('Error al agregar');
            this.messageService.add({ severity: 'error', summary: 'Error al Agregar', detail: '', life: 3000 });
          }
        );

      }
    });
  }

  clearFilter() {
    this.filter = new FilterSubEvento();
    this.coreSearch()
  }


  // ------------ PAGINATION -------------------\\
  onPageChange(event: TableLazyLoadEvent) {
    if (this.filter.paginationresult.formularioOninit == false) return;
    this.filter.paginationresult = new PaginationResultDto();
    this.filter.paginationresult.page = event.first && event.rows ? Math.floor(event.first / event.rows) + 1 : 1;;
    this.filter.paginationresult.size = event.rows ?? 10;
    this.filter.paginationresult.result = [];

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
