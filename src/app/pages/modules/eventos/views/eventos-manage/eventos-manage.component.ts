import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DtoEvento } from '../../models/DtoEventos';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { EventoService } from '../../services/eventosService';
import { response } from 'express';
import { isPlatformBrowser } from '@angular/common';
import { Table } from 'primeng/table';
import { LugarSelectorViewComponent } from '../../../../shared/global-components/selectors/lugar-selector/views/lugar-selector-view/lugar-selector-view.component';
import { MessageController } from '../../../../shared/global-components/MessageController';
import { ProveedorSelectorViewComponent } from '../../../../shared/global-components/selectors/proveedor-selector/views/proveedor-selector-view/proveedor-selector-view.component';
import { MenuItem, MessageService } from 'primeng/api';
import { ConstantEvents } from '../../eventos.constant';
import { SubeventosManageComponent } from '../subeventos-manage/subeventos-manage.component';
import { SubeventosdetalleManageComponent } from '../subeventosdetalle-manage/subeventosdetalle-manage.component';
import { DtoSubEvento } from '../../models/DtoSubEvento';
import { AuthorizationService } from '../../../../shared/global-components/authorization/auth.service';
import { LoadingService } from '../../../../shared/global-components/loadings/loading-service.service';
import { ToastService } from '../../../../shared/global-components/toast/toast.service';

@Component({
  selector: 'app-eventos-manage',
  templateUrl: './eventos-manage.component.html',
  styleUrl: './eventos-manage.component.scss'
})
export class EventosManageComponent implements OnInit {
  action: string;

  dtoSelected: DtoEvento = new DtoEvento();
  subEventoSelected: DtoSubEvento = new DtoSubEvento();

  list_types: any[] = [
    { name: 'Festividad', code: 'Festividad' },
    { name: 'Evento', code: 'Evento' },
  ];



  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private eventoService: EventoService,
    private messageService: MessageService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private loading: LoadingService,
    private toast: ToastService

  ) {

  }
  ngOnInit(): void {
    const tempData = this.authorizationService.getLocalData()
    this.action = tempData?.action;
    this.dtoSelected = tempData?.data;

    if (this.action == 'NEW') {
      this.dtoRegister = new DtoEvento()
    } else {
      this.getAllInfo();

    }
  }


  dtoRegister: DtoEvento = new DtoEvento();

  getInfoDtoSelected(): [string, any] {
    const localData = JSON.parse(localStorage.getItem('dtoSelected'));
    return [localData.action, localData.data]
  }

  coreExit() {
    this.router.navigate([ConstantEvents.event_list])

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
    /*this.loading.show();
     this.eventoService.create(this.dtoRegister).subscribe(
      (response) => {
        this.loading.hide();
        this.toast.addToast({
          type: 'success',
          message: 'Agregado Correctamente'
        });
        this.coreExit();
      },
      (err) => {
        this.loading.hide();
        this.toast.addToast({
          type: 'danger',
          message: 'Error al Agregar'
        });

      }
    ); */
  }

  coreEdit() {
    this.loading.show();
    console.log("UPDATE", this.dtoRegister);

    this.eventoService.update(this.dtoRegister).subscribe(
      (response) => {
        this.loading.hide();
        this.toast.addToast({
          type: 'success',
          message: 'Actualizado Correctamente'
        });

        this.coreExit();
      },
      (err) => {
        this.loading.hide();
        this.toast.addToast({
          type: 'danger',
          message: 'Error al Actualizar'
        });

      }
    );
  }
  coreDelete() {
    console.log("delete", this.dtoSelected);
    console.log("dtoRegister", this.dtoRegister);

    this.dtoRegister.subeventos = this.dtoRegister.subeventos.filter(subevento => subevento.id !== this.subEventoSelected.id);

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

      case ('SubEventoManage'): {
        if (message.method == 'NEW') {
          this.dtoRegister.subeventos.push(message.selected)
        }
        /* if (message.method == 'EDIT') {
          this.dtoRegister.subeventos.find(item => item == message.selected)
          // Reemplazarlo
        } */
        break;
      }
      case ('SubEventoDetalleManage'): {
        if (message.method == 'NEW') {
          this.dtoRegister.subeventos.push(message.selected)
        }
        break;
      }
    }
  }



  getAllInfo() {
    this.loading.show();
    this.eventoService.getEventoByID(this.dtoSelected?.id).subscribe(
      data => {
        this.loading.hide();
        this.dtoRegister = data;

        this.dtoRegister.fechaInicio = new Date(`${this.dtoRegister.fechaInicio}T05:00:00.000Z`)

        this.dtoRegister.fechaFin = new Date(`${this.dtoRegister.fechaFin}T05:00:00.000Z`)

      }, err => {
        console.log("error");

      })

  }

  ngOnDestroy(): void {
    this.authorizationService.deleteLocalData()
  }



  create_nameRoute(item: any) {
    // Eliminar tildes y caracteres diacríticos
    let nameRouteNormalized = item.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Reemplazar la 'ñ' por 'gn'
    nameRouteNormalized = nameRouteNormalized.replace(/ñ/g, 'gn').replace(/Ñ/g, 'gn');

    // Reemplazar espacios por guiones y convertir a minúsculas
    const nameRouteWithoutSpaces = nameRouteNormalized.replace(/\s+/g, '-').toLowerCase();

    this.dtoRegister.name_route = nameRouteWithoutSpaces;
  }



  onFileChange(event: any,) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.dtoRegister.foto.titulo = file.name;
      //this.dtoRegister.foto.url = e.target.result;
      this.dtoRegister.foto.base64 = e.target.result;
    };
    reader.readAsDataURL(file);


  }

}
