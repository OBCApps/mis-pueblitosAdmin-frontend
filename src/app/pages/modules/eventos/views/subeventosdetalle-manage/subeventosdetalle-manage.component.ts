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
  dtoRegister: DtoSubEventoDetalle = new DtoSubEventoDetalle()


  coreInitSelector(message: MessageController) {
    console.log("MESSAGE", message);

    this.messageController = message;
    this.visible = true;

  }

  saveItem() {
    console.log("DTOREGISTER", this.dtoRegister);
    this.dtoRegister.horaInicio = this.formatTimeToBackend(this.dtoRegister.horaInicio);
    this.dtoRegister.horaFin = this.formatTimeToBackend(this.dtoRegister.horaFin);  
    this.messageController.selected = this.dtoRegister;
    this.messageController.currentComponent.coreMessage(this.messageController);
    this.coreCloseSelector();
  }

  coreCloseSelector() {
    this.visible = false;
  }

  formatTimeToBackend(date: Date): any {
    // Obtener las horas, minutos y segundos
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Agregar el offset de la zona horaria (-05:00 para hora local de Perú, por ejemplo)
    const timezoneOffset = '-05';

    // Formatear la hora como "hh:mm:ss-05"
    return `${hours}:${minutes}:${seconds}${timezoneOffset}`;
  }
}