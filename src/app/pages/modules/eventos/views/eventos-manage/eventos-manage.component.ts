import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DtoEvento } from '../../models/DtoEventos';
import { LugarSelectorViewComponent } from '../../../../shared/global-components/selectors/lugar-selector/views/lugar-selector-view/lugar-selector-view.component';
import { MessageController } from '../../../../shared/global-components/MessageController';
import { ProveedorSelectorViewComponent } from '../../../../shared/global-components/selectors/proveedor-selector/views/proveedor-selector-view/proveedor-selector-view.component';
import { MenuItem } from 'primeng/api';
import { ConstantEvents } from '../../eventos.constant';
import { DtoSubEvento } from '../../models/DtoSubEvento';
import { AuthorizationService } from '../../../../shared/global-components/authorization/auth.service';
import { BaseServices } from '../../../../shared/global-components/BaseServices';
import { EventoService } from '../../services/eventosService';
import { SubeventosManageComponent } from '../subeventos-manage/subeventos-manage.component';
import { SubEventoService } from '../../services/subeventoService';

@Component({
  selector: 'app-eventos-manage',
  templateUrl: './eventos-manage.component.html',
  styleUrl: './eventos-manage.component.scss'
})
export class EventosManageComponent implements OnInit {
  messageController: MessageController;
  activeTab: string = 'INFO'
  action: string;
  opDisable: boolean = false;
  dtoSelected: DtoEvento = new DtoEvento();


  dtoRegister: DtoEvento = new DtoEvento();
  subEventoSelected: DtoSubEvento = new DtoSubEvento();

  list_types: any[] = [{ name: 'Festividad', code: 'Festividad' }, { name: 'Evento', code: 'Evento' },];
  list_estados: any[] = this.baseServices.getListStatus();


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private eventoService: EventoService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private baseServices: BaseServices,
    private subEventoService: SubEventoService
  ) {

  }


  ngOnInit(): void {
    const tempData = this.authorizationService.getLocalData()
    this.action = tempData?.action;
    this.dtoSelected = tempData?.data;

    this.opDisable =
      this.action == this.baseServices.ACTION_CREATE ? false :
        this.action == this.baseServices.ACTION_UPDATE ? false :
          this.action == this.baseServices.ACTION_VIEW ? true : true;


    if (this.action == this.baseServices.ACTION_CREATE) {
      this.dtoRegister = new DtoEvento()
    } else {
      this.getAllInfo();

    }
  }




  coreExit() {
    this.router.navigate([ConstantEvents.event_list])

  }

  coreSave() {
    if (this.action == this.baseServices.ACTION_CREATE) {
      this.coreNew()
    }
    if (this.action == this.baseServices.ACTION_UPDATE) {
      this.coreEdit()
    }
  }

  coreNew() {

    this.baseServices.showLoading();
    this.eventoService.create(this.dtoRegister).subscribe(
      (response) => {
        this.baseServices.hideLoading();

        const data = { action: this.baseServices.ACTION_UPDATE, data: response }
        this.authorizationService.setLocalData(data)

        this.baseServices.showMessageSucces('Agregado Correctamente');
        this.coreExit();
      },
      (err) => {
        this.baseServices.hideLoading();
        this.baseServices.showMessageError('Error al agregar');


      }
    );
  }

  coreEdit() {
    this.baseServices.showLoading();
    console.log("UPDATE", this.dtoRegister);

    this.eventoService.update(this.dtoRegister).subscribe(
      (response) => {
        this.baseServices.hideLoading();
        const data = { action: this.baseServices.ACTION_UPDATE, data: response }
        this.authorizationService.setLocalData(data);

        this.baseServices.showMessageSucces('Actualizado Correctamente');
        this.coreExit();
      },
      (err) => {
        this.baseServices.hideLoading();
        this.baseServices.showMessageError('Error al actualizar');

      }
    );
  }
  coreDelete() {
    console.log("delete", this.dtoSelected);
    console.log("dtoRegister", this.dtoRegister);

    this.dtoRegister.subEventos = this.dtoRegister.subEventos.filter(subevento => subevento.id !== this.subEventoSelected.id);

  }

  @ViewChild(LugarSelectorViewComponent, { static: false }) LugarSelectorViewComponent: LugarSelectorViewComponent;
  @ViewChild(ProveedorSelectorViewComponent, { static: false }) ProveedorSelectorViewComponent: ProveedorSelectorViewComponent;
  @ViewChild(SubeventosManageComponent, { static: false }) SubeventosManageComponent: SubeventosManageComponent;
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
        if (message.method == this.baseServices.ACTION_CREATE) {
          this.dtoRegister.subEventos.push(message.selected)
        }
        if (message.method == this.baseServices.ACTION_UPDATE) {

          let index = this.dtoRegister.subEventos.findIndex((detalle: DtoSubEvento) => detalle === this.itemSelected);
          if (index !== -1) {
            this.dtoRegister.subEventos[index] = message.selected;
          }

        }
        break;
      }

    }
  }



  getAllInfo() {
    this.baseServices.showLoading();
    if (!this.dtoSelected?.id) {
      this.baseServices.showMessageError('El registro no tiene ID')
    }
    this.eventoService.getEventoByID(this.dtoSelected?.id).subscribe(
      data => {
        this.baseServices.hideLoading();
        this.dtoRegister = data;

      }, err => {
        console.log("error");
        this.baseServices.hideLoading();
        this.baseServices.showMessageError('Error en el servidor')
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



  // ------------------GESTIÓN SUBEVENTOS
  itemSelected: any;
  coreNewSubEvento() {
    this.SubeventosManageComponent.coreInitSelector(new MessageController(this, 'SubEventoManage', this.baseServices.ACTION_CREATE, this.dtoRegister));
  }
  coreViewSubEvento() {
    if (!this.itemSelected) {
      this.baseServices.showMessageError('No hay una entidad para editar');
      return;
    }
    this.SubeventosManageComponent.coreInitSelector(new MessageController(this, 'SubEventoManage', this.baseServices.ACTION_VIEW, this.itemSelected));
  }
  coreEditSubEvento() {
    if (!this.itemSelected) {
      this.baseServices.showMessageError('No hay una entidad para editar');
      return;
    }
    this.SubeventosManageComponent.coreInitSelector(new MessageController(this, 'SubEventoManage', this.baseServices.ACTION_UPDATE, this.itemSelected));
  }

  coreDeleteSubEvento() {
    if (!this.itemSelected) {
      this.baseServices.showMessageError('No hay una entidad para eliminar');
      return;
    }
    if (this.itemSelected.id) {
      this.baseServices.showLoading();
      this.subEventoService.delete(this.itemSelected).subscribe(
        (response) => {
          this.baseServices.hideLoading();
          this.baseServices.showMessageSucces('Acción realizada correctamente.');

          this.dtoRegister.subEventos = this.dtoRegister.subEventos.filter((detalle: DtoSubEvento) => detalle !== this.itemSelected);
          this.itemSelected = null;
        },
        (err) => {
          this.baseServices.hideLoading();
          this.baseServices.showMessageError('Error al realizar la acción.');

        }
      );
    } else {
      this.dtoRegister.subEventos = this.itemSelected.subEventos.filter((detalle: DtoSubEvento) => detalle !== this.itemSelected);
      this.itemSelected = null;
    }
  }

  items: MenuItem[] = [
    {
      label: 'Ver',
      icon: 'pi pi-eye',
      command: () => {
        this.coreViewSubEvento();

      },
    },
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => {

        this.coreEditSubEvento();

      },
    },

    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => {
        this.coreDeleteSubEvento();
      },
    }
  ];

  modifyItems() {

  }
}
