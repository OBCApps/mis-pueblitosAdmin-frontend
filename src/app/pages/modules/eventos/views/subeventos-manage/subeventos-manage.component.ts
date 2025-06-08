import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MessageController } from '../../../../shared/global-components/MessageController';
import { LugarSelectorViewComponent } from '../../../../shared/global-components/selectors/lugar-selector/views/lugar-selector-view/lugar-selector-view.component';
import { ProveedorSelectorViewComponent } from '../../../../shared/global-components/selectors/proveedor-selector/views/proveedor-selector-view/proveedor-selector-view.component';
import { DtoSubEvento, DtoSubEventoDetalle } from '../../models/DtoSubEvento';
import { BaseVariables } from '../../../../shared/global-components/BaseVariables';
import { BaseServices } from '../../../../shared/global-components/BaseServices';
import { SubeventosdetalleManageComponent } from '../subeventosdetalle-manage/subeventosdetalle-manage.component';
import { SubEventoDetalleService } from '../../services/subeventoDetalleService';
import { SubEventoService } from '../../services/subeventoService';

@Component({
  selector: 'app-subeventos-manage',
  templateUrl: './subeventos-manage.component.html',
  styleUrl: './subeventos-manage.component.scss'
})
export class SubeventosManageComponent extends BaseVariables {
  visible: boolean = false;
  activeTab: string = 'info';
  action: string;
  opDisable: boolean = false;
  dtoRegister: DtoSubEvento = new DtoSubEvento();
  dtoSubEventoDetalle: DtoSubEventoDetalle = new DtoSubEventoDetalle();

  list_estados: any[] = this.baseServices.getListStatus();
  constructor(
    private baseServices: BaseServices,
    private subEventoDetalleService: SubEventoDetalleService,
    private subEventoService: SubEventoService,
  ) {
    super();
  }
  coreInitSelector(message: MessageController) {
    console.log("message", message);

    this.action = message.method;
    this.messageController = message;

    if (message.method == this.baseServices.ACTION_CREATE) {
      this.dtoRegister = new DtoSubEvento();
      this.dtoRegister.eventoId = message.selected.id; // Aqui viene la informacion del padre
    }

    if (message.method == this.baseServices.ACTION_UPDATE || message.method == this.baseServices.ACTION_VIEW) {


      this.dtoRegister = Object.assign({}, message.selected);

      // ----------------- FORMATEAR LAS HORAS Y DIAS
      this.dtoRegister.horaInicio = this.dtoRegister.horaInicio.slice(0, 5);
      this.dtoRegister.horaFin = this.dtoRegister.horaFin.slice(0, 5);
    }

    this.visible = true;

  }



  coreSave() {
    // ------- VALIDACIONES DE LOS CAMPOS


    // ------ AJUSTES
    this.dtoRegister.horaInicio = this.dtoRegister.horaInicio + ':00-05';
    this.dtoRegister.horaFin = this.dtoRegister.horaFin + ':00-05';




    if (this.dtoRegister.eventoId) {
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
      this.coreExit();
    }

  }
  coreNew() {

    this.baseServices.showLoading();
    this.subEventoService.create(this.dtoRegister).subscribe(
      (response) => {
        this.baseServices.hideLoading();
        const data = { action: this.baseServices.ACTION_UPDATE, ...response }
        this.messageController.selected = data;
        this.messageController.currentComponent.coreMessage(this.messageController);
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

    this.subEventoService.update(this.dtoRegister).subscribe(
      (response) => {
        this.baseServices.hideLoading();
        const data = { action: this.baseServices.ACTION_UPDATE, ...response }
        this.messageController.selected = data;
        this.messageController.currentComponent.coreMessage(this.messageController);
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

    /* this.dtoRegister.subEventos = this.dtoRegister.subEventos.filter(subevento => subevento.id !== this.subEventoSelected.id);
 */
  }
  coreExit() {
    this.coreCloseSelector();
  }

  coreCloseSelector() {
    this.visible = false;
  }

  @ViewChild(LugarSelectorViewComponent, { static: false }) LugarSelectorViewComponent: LugarSelectorViewComponent;
  @ViewChild(ProveedorSelectorViewComponent, { static: false }) ProveedorSelectorViewComponent: ProveedorSelectorViewComponent;
  @ViewChild(SubeventosdetalleManageComponent, { static: false }) SubeventosdetalleManageComponent: SubeventosdetalleManageComponent;
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
      case ('SubEventoDetalleManage'): {
        if (message.method == this.baseServices.ACTION_CREATE) {
          this.dtoRegister.subEventoDetalles.push(message.selected)
        }
        if (message.method == this.baseServices.ACTION_UPDATE) {

          let index = this.dtoRegister.subEventoDetalles.findIndex((detalle: DtoSubEventoDetalle) => detalle === this.itemSelected);
          if (index !== -1) {
            this.dtoRegister.subEventoDetalles[index] = message.selected;
          }

        }
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
  itemSelected: any;
  coreNewSubEventoDetalle() {
    this.SubeventosdetalleManageComponent.coreInitSelector(new MessageController(this, 'SubEventoDetalleManage', this.baseServices.ACTION_CREATE, this.dtoRegister));
  }
  coreViewSubEventoDetalle() {
    if (!this.itemSelected) {
      this.baseServices.showMessageError('No hay una entidad para editar');
      return;
    }
    this.SubeventosdetalleManageComponent.coreInitSelector(new MessageController(this, 'SubEventoDetalleManage', this.baseServices.ACTION_VIEW, this.itemSelected));
  }
  coreEditSubEventoDetalle() {
    if (!this.itemSelected) {
      this.baseServices.showMessageError('No hay una entidad para editar');
      return;
    }
    this.SubeventosdetalleManageComponent.coreInitSelector(new MessageController(this, 'SubEventoDetalleManage', this.baseServices.ACTION_UPDATE, this.itemSelected));
  }

  coreDeleteSubEventoDetalle() {
    if (!this.itemSelected) {
      this.baseServices.showMessageError('No hay una entidad para eliminar');
      return;
    }
    if (this.itemSelected.id) {
      this.baseServices.showLoading();
      this.subEventoDetalleService.delete(this.itemSelected).subscribe(
        (response) => {
          this.baseServices.hideLoading();

          this.dtoRegister.subEventoDetalles = this.dtoRegister.subEventoDetalles.filter((detalle: DtoSubEventoDetalle) => detalle !== this.itemSelected);
          this.itemSelected = null;

          this.baseServices.showMessageSucces('Acción realizada correctamente.');

        },
        (err) => {
          this.baseServices.hideLoading();
          this.baseServices.showMessageError('Error al realizar la acción.');

        }
      );
    } else {
      this.dtoRegister.subEventoDetalles = this.itemSelected.subEventoDetalles.filter((detalle: DtoSubEventoDetalle) => detalle !== this.itemSelected);
      this.itemSelected = null;
    }
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

