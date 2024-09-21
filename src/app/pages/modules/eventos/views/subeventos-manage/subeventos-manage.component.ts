import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventoService } from '../../services/eventosService';
import { SubEventoService } from '../../services/subeventoService';
import { MessageController } from '../../../../shared/global-components/MessageController';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { Table } from 'primeng/table';
import { LugarSelectorViewComponent } from '../../../../shared/global-components/selectors/lugar-selector/views/lugar-selector-view/lugar-selector-view.component';
import { ProveedorSelectorViewComponent } from '../../../../shared/global-components/selectors/proveedor-selector/views/proveedor-selector-view/proveedor-selector-view.component';
import { DtoSubEvento, DtoSubEventoDetalle } from '../../models/DtoSubEvento';
import { BaseVariables } from '../../../../shared/global-components/BaseVariables';

@Component({
  selector: 'app-subeventos-manage',
  templateUrl: './subeventos-manage.component.html',
  styleUrl: './subeventos-manage.component.scss'
})
export class SubeventosManageComponent extends BaseVariables {
  visible: boolean = false;

  dtoRegister: DtoSubEvento = new DtoSubEvento();
  dtoSubEventoDetalle: DtoSubEventoDetalle = new DtoSubEventoDetalle();
  coreInitSelector(message: MessageController) {
    if (message.method == 'NEW') {
      this.dtoRegister = new DtoSubEvento();
    }

    if (message.method == 'EDIT') {
      this.dtoRegister = message.selected;
    }

    console.log("MESSAGE", message);
    this.messageController = message;
    this.visible = true;

  }

  hideDialog() {

  }

  saveItem() {
    console.log("DTOREGISTER", this.dtoRegister);
    this.messageController.selected = this.dtoRegister;
    this.messageController.currentComponent.coreMessage(this.messageController);
    this.coreCloseSelector();
  }

  coreCloseSelector() {
    this.visible = false;
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

        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.dtoRegister = new DtoSubEvento();
  }

  addSubEvento(){
    const copiaSubEventoDetalle = Object.assign({}, this.dtoSubEventoDetalle);  // Crear una copia

    this.dtoRegister.subEventoDetalles.push(copiaSubEventoDetalle)
  }
}

