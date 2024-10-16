import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EventoService } from '../../services/eventosService';

import { FilterEvento, listFilterEvento } from '../../models/FilterEvento';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ConstantEvents } from '../../eventos.constant';
import { AuthorizationService } from '../../../../shared/global-components/authorization/auth.service';


@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrl: './eventos-list.component.scss'
})
export class EventosListComponent implements OnInit {
  productDialog: boolean = false;

  listFilter!: listFilterEvento[];



  itemSelected!: listFilterEvento | null; // 


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
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => {
        this.coreDelete()
      },
    }

  ]; // Acciones Ver, Editar

  constructor(
    private eventoService: EventoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
    this.coreSearch()



  }

  coreSearch() {
    this.listFilter = [];
    this.eventoService.search(this.filter).subscribe((data) => (this.listFilter = data));
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
  editProduct(product: any) {

    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listFilter = this.listFilter.filter((val) => val.id !== product.id);

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;

  }



  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.listFilter.length; i++) {
      if (this.listFilter[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default: return 'danger'
    }
  }
  @ViewChild('dt') dt: Table | undefined;
  onFilterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }


}
