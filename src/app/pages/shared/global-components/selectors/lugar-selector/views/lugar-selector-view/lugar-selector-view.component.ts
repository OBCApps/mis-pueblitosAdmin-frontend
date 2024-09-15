import { Component, ViewChild } from '@angular/core';
import { MessageController } from '../../../../MessageController';
import { LugarSelectorService } from '../../services/lugar-selector.service';
import { FilterLugar } from '../../models/FilterLugar';
import { DtoLugarSelector } from '../../models/DtoLugarSelector';

@Component({
  selector: 'app-lugar-selector-view',
  templateUrl: './lugar-selector-view.component.html',
  styleUrl: './lugar-selector-view.component.scss'
})
export class LugarSelectorViewComponent {
  visible: boolean = false;

  constructor(
    private lugarSelectorService: LugarSelectorService
  ) {

  }

  coreInitSelector(msj: MessageController) {
    console.log("meSAJE", msj);

    this.loadLugar();
    this.visible = true;


  }

  messageController: MessageController;

  coreSelect(dto: any) {
    //this.messageController.resultado = dto;
    this.messageController.currenComponent.coreMensaje(this.messageController);
    //this.coreSalir();
  }

  listFilter: DtoLugarSelector[] = []
  loadLugar() {
    const filter = new FilterLugar()
    this.lugarSelectorService.search(filter).subscribe((data) => (this.listFilter = data));
  }
}
