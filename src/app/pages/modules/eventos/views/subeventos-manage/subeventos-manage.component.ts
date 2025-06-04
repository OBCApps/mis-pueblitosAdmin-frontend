import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MessageController } from '../../../../shared/global-components/MessageController';
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
  activeTab: string = 'info';
  opDisable: boolean = false;
  dtoRegister: DtoSubEvento = new DtoSubEvento();
  dtoSubEventoDetalle: DtoSubEventoDetalle = new DtoSubEventoDetalle();
  coreInitSelector(message: MessageController) {
    if (message.method == 'CREATE') {
      this.dtoRegister = new DtoSubEvento();
    }

    if (message.method == 'UPDATE' || message.method == 'VIEW') {


      this.dtoRegister = Object.assign({}, message.selected);
      this.dtoRegister.horaInicio = this.convertToDate(this.dtoRegister.dia, this.dtoRegister.horaInicio);
      this.dtoRegister.horaFin = this.convertToDate(this.dtoRegister.dia, this.dtoRegister.horaFin);
      this.dtoRegister.dia = this.convertDayToDate(this.dtoRegister.dia);
      console.log("this.dtoRegistert", this.dtoRegister);
    }

    this.messageController = message;
    this.visible = true;

  }


  saveItem() {
    console.log("FECHA", this.dtoRegister.horaInicio);

    this.dtoRegister.horaInicio = this.formatTimeToBackend(this.dtoRegister.horaInicio);
    this.dtoRegister.horaFin = this.formatTimeToBackend(this.dtoRegister.horaFin);
    this.dtoRegister.dia = this.convertDateToBackend(this.dtoRegister.dia);

    this.messageController.selected = this.dtoRegister;
    console.log("TO SAVE", this.dtoRegister);
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

  addSubEvento() {
    const copiaSubEventoDetalle = Object.assign({}, this.dtoSubEventoDetalle);  // Crear una copia

    this.dtoRegister.subEventoDetalles.push(copiaSubEventoDetalle)
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
  convertToDate(dia: any, hora: any): Date {
    // Separar la parte de la hora y la zona horaria
    const [timePart, timezone] = hora.split('-');
    const [hours, minutes, seconds] = timePart.split(':');

    // Crear una fecha en formato ISO usando el día y la hora
    const isoString = `${dia}T${hours}:${minutes}:${seconds}`;

    // Crear un nuevo objeto Date a partir del string ISO
    const date = new Date(isoString);

    // Ajustar la zona horaria
    date.setHours(date.getHours() - 5); // Ajustar a GMT-05

    return date;
  }

  // Función para convertir el día de formato "yyyy-mm-dd" a un objeto Date
  convertDayToDate(day: any): Date {
    return new Date(day); // Crear el objeto Date directamente
  }
  convertDateToBackend(day: any): any {
    const date = new Date(day); // Crear el objeto Date
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Obtener el mes, sumando 1 y asegurando que tenga 2 dígitos
    const dayOfMonth = ('0' + date.getDate()).slice(-2); // Obtener el día asegurando que tenga 2 dígitos

    return `${year}-${month}-${dayOfMonth}`; // Formatear como año-mes-día
  }




  // ------ SUBEVENTOS
  addSubEventoDetalle() {
    /* const newDetail = {
      id: Date.now(), // Simple ID generation
      organizador: "",
      detalle: "",
      horaInicio: "",
      horaFin: "",
      editing: false,
    }
    this.dtoRegister.subEventoDetalles.push(newDetail) */
  }
  selectedFileName: string = '';
  previewImageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  // Método para manejar la selección de archivos
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

