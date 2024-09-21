import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SubEventoService } from '../../services/subeventoService';
import { Router } from '@angular/router';
import { FilterSubEvento, listFilterSubEvento } from '../../models/FilterSubEvento';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { ConstantEvents } from '../../eventos.constant';
import { Table } from 'primeng/table';
import { DtoSubEvento } from '../../models/DtoSubEvento';

@Component({
  selector: 'app-subeventos-list',
  templateUrl: './subeventos-list.component.html',
  styleUrl: './subeventos-list.component.scss'
})
export class SubeventosListComponent implements OnInit {
  productDialog: boolean = false;

  listFilter!: listFilterSubEvento[];



  itemSelected!: listFilterSubEvento | null; // 


  filter: FilterSubEvento = new FilterSubEvento(); // Filtros de busqueda

  items: MenuItem[] | undefined; // Acciones Ver, Editar

  constructor(
    private subEventoService: SubEventoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.coreSearch()


    this.items = [
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

    ];
  }
  coreSearch() {
    console.log("FIlter", this.filter);

    this.listFilter = [];
    this.subEventoService.search(this.filter).subscribe((data) => (this.listFilter = data));
  }
  coreNew() {
    BaseComponents.saveLocalStorageToManage('NEW', this.itemSelected)
    this.router.navigate([ConstantEvents.subevent_manage])
  }

  coreView() {
    BaseComponents.saveLocalStorageToManage('VIEW', this.itemSelected)
    this.router.navigate([ConstantEvents.subevent_manage])

  }

  coreEdit() {
    BaseComponents.saveLocalStorageToManage('EDIT', this.itemSelected)
    this.router.navigate([ConstantEvents.subevent_manage])
  }

  coreDelete() {
    this.confirmationService.confirm({
      message: 'Está seguro de borrar?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.subEventoService.delete(this.itemSelected).subscribe(
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
    this.filter = new FilterSubEvento();
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
