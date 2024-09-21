import { Component, OnInit } from '@angular/core';
import { MessageController } from '../../../../shared/global-components/MessageController';
import { BaseVariables } from '../../../../shared/global-components/BaseVariables';
import { DtoSubEventoDetalle } from '../../models/DtoSubEvento';

@Component({
  selector: 'app-subeventosdetalle-manage',
  templateUrl: './subeventosdetalle-manage.component.html',
  styleUrl: './subeventosdetalle-manage.component.scss'
})
export class SubeventosdetalleManageComponent extends BaseVariables {
  visible: boolean = false;

  listDtoRegister: DtoSubEventoDetalle[] = [];
  dtoRegister : DtoSubEventoDetalle = new DtoSubEventoDetalle()
 

  coreInitSelector(message: MessageController) {
    console.log("MESSAGE", message);

    this.messageController = message;
    this.visible = true;

  }
}