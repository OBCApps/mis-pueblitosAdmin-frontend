import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EventoService } from '../../services/eventosService';
import { DtoEventos } from '../../models/DtoEventos';
import { FilterEvento } from '../../models/FilterEvento';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrl: './eventos-list.component.scss'
})
export class EventosListComponent implements OnInit {
  productDialog: boolean = false;

  listFilter!: DtoEventos[];

  product!: DtoEventos;

  itemSelected!: DtoEventos | null;

  submitted: boolean = false;

  statuses!: any[];

  filter: FilterEvento = new FilterEvento()

  items: MenuItem[] | undefined;

  constructor(
    private eventoService: EventoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
    this.eventoService.search(this.filter).subscribe((data) => (this.listFilter = data));
  }
  coreNew() {
    this.product = new DtoEventos();
    this.submitted = false;
    this.productDialog = true;
  }

  coreView() {
    console.log("VER", this.itemSelected);

  }

  coreEdit() {
    console.log("EDITAR", this.itemSelected);

  }

  coreDelete() {
    this.confirmationService.confirm({
      message: 'Está seguro de borrar?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("ELIMINADO", this.itemSelected);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  clearFilter() {
    this.filter = new FilterEvento();
    this.coreSearch()
  }
  editProduct(product: DtoEventos) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: DtoEventos) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listFilter = this.listFilter.filter((val) => val.id !== product.id);
        this.product = new DtoEventos();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.nombre?.trim()) {
      if (this.product.id) {
        this.listFilter[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.product.id = this.createId();
        //this.product.image = 'product-placeholder.svg';
        this.listFilter.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.listFilter = [...this.listFilter];
      this.productDialog = false;
      this.product = new DtoEventos();
    }
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
