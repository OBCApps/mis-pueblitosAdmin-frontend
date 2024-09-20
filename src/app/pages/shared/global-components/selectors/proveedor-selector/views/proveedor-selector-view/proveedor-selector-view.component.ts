import { Component } from '@angular/core';
import { BaseVariables } from '../../../../BaseVariables';
import { ProveedorSelectorService } from '../../services/proveedor-selector.service';
import { MessageController } from '../../../../MessageController';
import { FilterProveedor } from '../../models/FilterProvedor';

@Component({
  selector: 'app-proveedor-selector-view',
  templateUrl: './proveedor-selector-view.component.html',
  styleUrl: './proveedor-selector-view.component.scss'
})
export class ProveedorSelectorViewComponent extends BaseVariables {
  visible: boolean = false;

  boolLoadData: boolean = false;
  constructor(
    private proveedorSelectorService: ProveedorSelectorService,
  ) {
    super()
  }

  coreInitSelector(message: MessageController) {
    this.messageController = message;
    this.visible = true;
    this.loadLugar();
  }



  coreSelect(dto: any) {
    console.log("DTO", dto);

    this.messageController.selected = dto;
    this.messageController.currentComponent.coreMessage(this.messageController);
    this.coreCloseSelector();
  }

  coreCloseSelector() {

    this.visible = false;
  }

  listFilter: FilterProveedor[] = []
  loadLugar() {
    this.boolLoadData = true;
    const filter = new FilterProveedor()
    this.listFilter = [];
    this.proveedorSelectorService.search(filter).subscribe(
      (data: FilterProveedor[]) => {
        this.boolLoadData = false;
        this.listFilter = data;
      }
    );
  }



}
