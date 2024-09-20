import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DtoEvento, DtoSubEvento } from '../../models/DtoEventos';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { EventoService } from '../../services/eventosService';
import { response } from 'express';
import { isPlatformBrowser } from '@angular/common';
import { Table } from 'primeng/table';
import { LugarSelectorViewComponent } from '../../../../shared/global-components/selectors/lugar-selector/views/lugar-selector-view/lugar-selector-view.component';
import { MessageController } from '../../../../shared/global-components/MessageController';
import { ProveedorSelectorViewComponent } from '../../../../shared/global-components/selectors/proveedor-selector/views/proveedor-selector-view/proveedor-selector-view.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-eventos-manage',
  templateUrl: './eventos-manage.component.html',
  styleUrl: './eventos-manage.component.scss'
})
export class EventosManageComponent implements OnInit {
  action: string;

  dtoSelected: DtoEvento = new DtoEvento();

  list_types: any[] | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private eventoService: EventoService,
    private messageService: MessageService,
  ) {

  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.action = this.getInfoDtoSelected()[0];
      this.dtoSelected = this.getInfoDtoSelected()[1];



      if (this.action == 'NEW') {
        this.dtoRegister = new DtoEvento()
      } else {
        this.getAllInfo();

      }
      this.list_types = [
        { name: 'Festividad', code: 'Festividad' },
        { name: 'Evento', code: 'Evento' },

      ];
    }
  }


  dtoRegister: DtoEvento = new DtoEvento();

  getInfoDtoSelected(): [string, any] {
    const localData = JSON.parse(localStorage.getItem('dtoSelected'));
    return [localData.action, localData.data]
  }

  coreSave() {
    if (this.action == 'NEW') {
      this.coreNew()
    }
    if (this.action == 'EDIT') {
      this.coreEdit()
    }
  }

  coreNew() {
    console.log("NEW", this.dtoRegister);
    this.eventoService.create(this.dtoRegister).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Agregado Correctamente', detail: '', life: 3000 });
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error al Agregar', detail: '', life: 3000 });
      }
    );
  }

  coreEdit() {

    console.log("NEW", this.dtoRegister);
    this.eventoService.update(this.dtoRegister).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Actualizado Correctamente', detail: '', life: 3000 });
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error al Agregar', detail: '', life: 3000 });
      }
    );
  }


  @ViewChild(LugarSelectorViewComponent, { static: false }) LugarSelectorViewComponent: LugarSelectorViewComponent;
  @ViewChild(ProveedorSelectorViewComponent, { static: false }) ProveedorSelectorViewComponent: ProveedorSelectorViewComponent;
  coreShowSelectors(nameSelector: string) {
    switch (nameSelector) {
      case ('LugarSelector'): {
        this.LugarSelectorViewComponent.coreInitSelector(new MessageController(this, nameSelector));
        break;
      }
      case ('ProveedorSelector'): {
        this.ProveedorSelectorViewComponent.coreInitSelector(new MessageController(this, nameSelector));

        break;
      }
      case ('LugarSelectorPhoto'): {
        this.LugarSelectorViewComponent.coreInitSelector(new MessageController(this, nameSelector));
        break;
      }
    }

  }

  coreMessage(message: MessageController): void {
    console.log("MESSANJE", message);

    switch (message.nameSelector) {
      case ('LugarSelector'): {
        this.dtoRegister.lugarDesc = message.selected.nombre;
        this.dtoRegister.lugarId = message.selected.id
        break;
      }
      case ('ProveedorSelector'): {
        this.dtoRegister.foto.proveedorId = message.selected.id
        this.dtoRegister.foto.proveedorDesc = message.selected.nombre
        break;
      }
      case ('LugarSelectorPhoto'): {
        this.dtoRegister.foto.lugar = message.selected.nombre;
        break;
      }
    }
  }



  getAllInfo() {

    this.eventoService.getEventoByID(this.dtoSelected.id).subscribe(
      data => {
        console.log("INFORMACION OBTENIDA");
        this.dtoRegister = data;

        this.dtoRegister.fechaInicio = new Date(`${this.dtoRegister.fechaInicio}T05:00:00.000Z`)
        
        this.dtoRegister.fechaFin = new Date(`${this.dtoRegister.fechaFin}T05:00:00.000Z`)
      }, err => {
        console.log("error");

      })

  }
  convertToDate(dateString: string): any {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day);
  }

  ngOnDestroy(): void {
    BaseComponents.removeLocalStorageToManage('dtoSelected');
  }

  @ViewChild('dt') dt: Table | undefined;
  onFilterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.dt.filterGlobal(inputElement.value, 'contains');
  }




  create_nameRoute(item: any) {
    const nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
    this.dtoRegister.name_route = nameRouteWithoutSpaces;
  }
}
