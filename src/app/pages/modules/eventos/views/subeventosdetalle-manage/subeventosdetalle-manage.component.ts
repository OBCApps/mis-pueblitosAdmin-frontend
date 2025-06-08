import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageController } from '../../../../shared/global-components/MessageController';
import { BaseVariables } from '../../../../shared/global-components/BaseVariables';
import { DtoSubEventoDetalle } from '../../models/DtoSubEvento';
import { LugarSelectorViewComponent } from '../../../../shared/global-components/selectors/lugar-selector/views/lugar-selector-view/lugar-selector-view.component';
import { ProveedorSelectorViewComponent } from '../../../../shared/global-components/selectors/proveedor-selector/views/proveedor-selector-view/proveedor-selector-view.component';
import { BaseServices } from '../../../../shared/global-components/BaseServices';
import { SubEventoService } from '../../services/subeventoService';
import { SubEventoDetalleService } from '../../services/subeventoDetalleService';

@Component({
  selector: 'app-subeventosdetalle-manage',
  templateUrl: './subeventosdetalle-manage.component.html',
  styleUrl: './subeventosdetalle-manage.component.scss'
})
export class SubeventosdetalleManageComponent extends BaseVariables {
  visible: boolean = false;
  opDisable: boolean = false;
  dtoRegister: DtoSubEventoDetalle = new DtoSubEventoDetalle()
  action: string;


  constructor(
    private baseServices: BaseServices,
    private subEventoService: SubEventoDetalleService,
  ) {
    super();
  }
  coreInitSelector(message: MessageController) {
    this.messageController = message;
    this.action = message.method;
    if (message.method == this.baseServices.ACTION_CREATE) {
      this.dtoRegister = new DtoSubEventoDetalle();
      this.dtoRegister.subEventoId = message.selected.id; // Aqui viene la informacion del padre

    }

    if (message.method == this.baseServices.ACTION_UPDATE || message.method == this.baseServices.ACTION_VIEW) {


      this.dtoRegister = Object.assign({}, message.selected);
      // ----------------- FORMATEAR LAS HORAS Y DIAS
      this.dtoRegister.horaInicio = this.dtoRegister.horaInicio.slice(0, 5);
      this.dtoRegister.horaFin = this.dtoRegister.horaFin.slice(0, 5);
    }
    this.visible = true;

  }

  coreCloseSelector() {
    this.visible = false;
  }

  coreSave() {
    // ------ AJUSTES
    this.dtoRegister.horaInicio = this.dtoRegister.horaInicio + ':00-05';
    this.dtoRegister.horaFin = this.dtoRegister.horaFin + ':00-05';

    if (this.dtoRegister.subEventoId) {
      if (this.action == 'CREATE') {
        this.coreNew()
      }
      if (this.action == 'UPDATE') {
        this.coreEdit()
      }
    } else {
      const data = { action: this.action, ...this.dtoRegister }
      this.messageController.selected = data;
      this.messageController.currentComponent.coreMessage(this.messageController);
      this.coreSalir();
    }

  }
  coreNew() {
    console.log("CREATE", this.dtoRegister);
    this.baseServices.showLoading();
    this.subEventoService.create(this.dtoRegister).subscribe(
      (response) => {
        this.baseServices.hideLoading();

        const data = { action: this.baseServices.ACTION_UPDATE, ...response }
        this.messageController.selected = data;
        this.messageController.currentComponent.coreMessage(this.messageController);

        this.baseServices.showMessageSucces('Agregado Correctamente');
        this.coreSalir();
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

    this.subEventoService.update(this.dtoRegister).subscribe(
      (response) => {
        this.baseServices.hideLoading();
        const data = { action: this.baseServices.ACTION_UPDATE, ...response }
        this.messageController.selected = data;
        this.messageController.currentComponent.coreMessage(this.messageController);

        this.baseServices.showMessageSucces('Actualizado Correctamente');

        this.coreSalir();
      },
      (err) => {
        this.baseServices.hideLoading();
        this.baseServices.showMessageError('Error al actualizar');

      }
    );
  }

  coreDelete() {
    /* console.log("delete", this.dtoSelected);
    console.log("dtoRegister", this.dtoRegister);

    this.dtoRegister.subEventos = this.dtoRegister.subEventos.filter(subevento => subevento.id !== this.subEventoSelected.id);
 */
  }
  coreSalir() {
    this.visible = false;
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


  @ViewChild(LugarSelectorViewComponent, { static: false }) LugarSelectorViewComponent: LugarSelectorViewComponent;
  @ViewChild(ProveedorSelectorViewComponent, { static: false }) ProveedorSelectorViewComponent: ProveedorSelectorViewComponent;
  coreShowSelectors(nameSelector: string) {
    switch (nameSelector) {

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

    switch (message.nameSelector) {

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
}